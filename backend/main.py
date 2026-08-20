from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

import asyncio
import random
import string
import time
from difflib import SequenceMatcher


ROUND_DURATION = 25
from songs import (
    get_random_song,
    normalize_song_title,
)


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# PLAYER
# ============================================================

class Player:
    def __init__(
        self,
        player_id: str,
        name: str,
    ):
        self.id = player_id
        self.name = name
        self.score = 0


# ============================================================
# LOBBY
# ============================================================

class Lobby:
    def __init__(
        self,
        code: str,
        host_id: str,
    ):
        self.code = code
        self.host_id = host_id

        self.players: dict[str, Player] = {}
        self.connections: dict[str, WebSocket] = {}

        # Game state
        self.game_started = False
        self.current_round = 0
        self.total_rounds = 5

        self.current_song = None
        self.round_started_at = None

        self.round_task = None
        self.round_finished = False

        # Spieler, die in der aktuellen Runde
        # bereits richtig geraten haben.
        self.correct_guesses: set[str] = set()


lobbies: dict[str, Lobby] = {}


# ============================================================
# HELPERS
# ============================================================

def generate_id(length: int = 16) -> str:
    return "".join(
        random.choices(
            string.ascii_letters + string.digits,
            k=length,
        )
    )


def generate_lobby_code() -> str:
    characters = (
        string.ascii_uppercase
        + string.digits
    )

    while True:
        code = "".join(
            random.choices(
                characters,
                k=4,
            )
        )

        if code not in lobbies:
            return code


def similarity(
    a: str,
    b: str,
) -> float:
    return SequenceMatcher(
        None,
        normalize_song_title(a),
        normalize_song_title(b),
    ).ratio()


def is_correct_guess(
    guess: str,
    title: str,
    artist: str,
) -> bool:

    guess_normalized = normalize_song_title(
        guess
    )

    title_normalized = normalize_song_title(
        title
    )

    artist_normalized = normalize_song_title(
        artist
    )

    if not guess_normalized:
        return False

    if not title_normalized:
        return False

    # ========================================================
    # EXACT TITLE
    # ========================================================

    if guess_normalized == title_normalized:
        return True

    # ========================================================
    # ARTIST + TITLE
    # ========================================================

    combined = (
        f"{artist_normalized} "
        f"{title_normalized}"
    )

    if guess_normalized == combined:
        return True

    # ========================================================
    # TITLE + ARTIST
    # ========================================================

    combined_reverse = (
        f"{title_normalized} "
        f"{artist_normalized}"
    )

    if guess_normalized == combined_reverse:
        return True

    # ========================================================
    # FUZZY TITLE
    # ========================================================

    title_score = similarity(
        guess,
        title,
    )

    if title_score >= 0.78:
        return True

    # ========================================================
    # FUZZY ARTIST + TITLE
    # ========================================================

    combined_score = SequenceMatcher(
        None,
        guess_normalized,
        combined,
    ).ratio()

    if combined_score >= 0.75:
        return True

    combined_reverse_score = SequenceMatcher(
        None,
        guess_normalized,
        combined_reverse,
    ).ratio()

    if combined_reverse_score >= 0.75:
        return True

    # ========================================================
    # TOKEN MATCHING
    # ========================================================

    guess_words = set(
        guess_normalized.split()
    )

    title_words = set(
        title_normalized.split()
    )

    if title_words:

        overlap = len(
            guess_words.intersection(
                title_words
            )
        ) / len(title_words)

        if overlap >= 0.75:
            return True

    return False


def serialize_players(
    lobby: Lobby,
):
    return [
        {
            "id": player.id,
            "name": player.name,
            "score": player.score,
        }
        for player in lobby.players.values()
    ]


# ============================================================
# WEBSOCKET BROADCAST
# ============================================================

async def broadcast(
    lobby: Lobby,
    message: dict,
):
    disconnected = []

    for (
        player_id,
        websocket,
    ) in list(
        lobby.connections.items()
    ):
        try:
            await websocket.send_json(
                message
            )

        except Exception:
            disconnected.append(
                player_id
            )

    for player_id in disconnected:
        lobby.connections.pop(
            player_id,
            None,
        )


async def broadcast_lobby(
    lobby: Lobby,
):
    await broadcast(
        lobby,
        {
            "type": "lobby_update",
            "lobby_code": lobby.code,
            "host_id": lobby.host_id,
            "players": serialize_players(
                lobby
            ),
        },
    )


# ============================================================
# ROOT
# ============================================================

@app.get("/")
async def root():
    return {
        "message": (
            "Guess The Song "
            "backend is running"
        )
    }


# ============================================================
# CREATE LOBBY
# ============================================================

@app.post("/lobby/create")
async def create_lobby(
    name: str,
):

    player_id = generate_id()

    code = generate_lobby_code()

    lobby = Lobby(
        code=code,
        host_id=player_id,
    )

    player = Player(
        player_id=player_id,
        name=name.strip(),
    )

    lobby.players[player_id] = player

    lobbies[code] = lobby

    return {
        "lobby_code": code,
        "player_id": player_id,
        "host": True,
        "player": {
            "id": player.id,
            "name": player.name,
            "score": player.score,
        },
    }


# ============================================================
# GET LOBBY
# ============================================================

@app.get("/lobby/{code}")
async def get_lobby(
    code: str,
):

    code = code.upper()

    lobby = lobbies.get(code)

    if not lobby:
        return {
            "exists": False
        }

    return {
        "exists": True,
        "lobby_code": lobby.code,
        "host_id": lobby.host_id,
        "players": serialize_players(
            lobby
        ),
        "game_started": lobby.game_started,
    }


# ============================================================
# JOIN LOBBY
# ============================================================

@app.post("/lobby/join")
async def join_lobby(
    code: str,
    name: str,
):

    code = code.upper()

    lobby = lobbies.get(code)

    if not lobby:
        return {
            "success": False,
            "error": "Lobby not found",
        }

    if lobby.game_started:
        return {
            "success": False,
            "error": "Game already started",
        }

    player_id = generate_id()

    player = Player(
        player_id=player_id,
        name=name.strip(),
    )

    lobby.players[player_id] = player

    await broadcast_lobby(lobby)

    return {
        "success": True,
        "lobby_code": lobby.code,
        "player_id": player_id,
        "host": False,
        "player": {
            "id": player.id,
            "name": player.name,
            "score": player.score,
        },
    }


# ============================================================
# START GAME
# ============================================================

async def start_game(
    lobby: Lobby,
):

    if lobby.game_started:
        return

    lobby.game_started = True
    lobby.current_round = 0

    # Reset scores when a new game starts
    for player in lobby.players.values():
        player.score = 0

    await broadcast(
        lobby,
        {
            "type": "game_started",
            "total_rounds": (
                lobby.total_rounds
            ),
        },
    )

    await asyncio.sleep(2)

    await start_next_round(lobby)


# ============================================================
# START ROUND
# ============================================================

async def start_next_round(
    lobby: Lobby,
):

    # ========================================================
    # GAME FINISHED
    # ========================================================

    if (
        lobby.current_round
        >= lobby.total_rounds
    ):

        lobby.game_started = False

        leaderboard = sorted(
            serialize_players(lobby),
            key=lambda player: player[
                "score"
            ],
            reverse=True,
        )

        await broadcast(
            lobby,
            {
                "type": "game_finished",
                "players": leaderboard,
                "winner": (
                    leaderboard[0]
                    if leaderboard
                    else None
                ),
            },
        )

        return

    # ========================================================
    # NEW ROUND
    # ========================================================

    lobby.current_round += 1

    # Reset correct guesses
    lobby.correct_guesses.clear()

    song = get_random_song()

    if not song:

        await broadcast(
            lobby,
            {
                "type": "error",
                "message": (
                    "Could not find "
                    "a song."
                ),
            },
        )

        lobby.game_started = False

        return

    lobby.current_song = song
    lobby.round_finished = False
    lobby.round_started_at = time.time()

    await broadcast(
        lobby,
        {
            "type": "round_started",
            "round": lobby.current_round,
            "total_rounds": (
                lobby.total_rounds
            ),
            "preview_url": (
                song["preview_url"]
            ),
            "artwork": song["artwork"],
            "duration": ROUND_DURATION,
        },
    )

    lobby.round_task = (
        asyncio.create_task(
            finish_round_after_timeout(
                lobby
            )
        )
    )


# ============================================================
# ROUND TIMEOUT
# ============================================================

async def finish_round_after_timeout(
    lobby: Lobby,
):

    try:

        await asyncio.sleep(ROUND_DURATION)

        if lobby.round_finished:
            return

        await finish_round(
            lobby,
            winner_id=None,
        )

    except asyncio.CancelledError:
        pass


# ============================================================
# FINISH ROUND
# ============================================================

async def finish_round(
    lobby: Lobby,
    winner_id: str | None,
):

    if lobby.round_finished:
        return

    lobby.round_finished = True

    # Cancel timeout task
    if lobby.round_task:

        current_task = (
            asyncio.current_task()
        )

        if (
            lobby.round_task
            != current_task
        ):
            lobby.round_task.cancel()

        lobby.round_task = None

    song = lobby.current_song

    if not song:
        return

    winner = None

    if winner_id:
        winner = lobby.players.get(
            winner_id
        )

    await broadcast(
        lobby,
        {
            "type": "round_finished",

            "winner": (
                {
                    "id": winner.id,
                    "name": winner.name,
                    "score": winner.score,
                }
                if winner
                else None
            ),

            "song": {
                "title": song["title"],
                "artist": song["artist"],
                "album": song["album"],
                "artwork": song["artwork"],
            },

            "players": serialize_players(
                lobby
            ),

            "round": lobby.current_round,

            "total_rounds": (
                lobby.total_rounds
            ),

            "is_last_round": (
                lobby.current_round
                >= lobby.total_rounds
            ),
        },
    )

    # Let players see the answer
    await asyncio.sleep(4)

    # ========================================================
    # GAME OVER
    # ========================================================

    if (
        lobby.current_round
        >= lobby.total_rounds
    ):

        lobby.game_started = False

        leaderboard = sorted(
            serialize_players(lobby),
            key=lambda player: player[
                "score"
            ],
            reverse=True,
        )

        overall_winner = (
            leaderboard[0]
            if leaderboard
            else None
        )

        await broadcast(
            lobby,
            {
                "type": "game_finished",
                "players": leaderboard,
                "winner": overall_winner,
            },
        )

        return

    # ========================================================
    # NEXT ROUND
    # ========================================================

    if lobby.game_started:
        await start_next_round(
            lobby
        )


# ============================================================
# GUESS
# ============================================================

async def handle_guess(
    lobby: Lobby,
    player_id: str,
    guess: str,
):

    if not lobby.game_started:
        return

    if lobby.round_finished:
        return

    player = lobby.players.get(
        player_id
    )

    if not player:
        return

    if not lobby.current_song:
        return

    if not guess.strip():
        return

    # ========================================================
    # ALREADY GUESSED CORRECTLY
    # ========================================================

    if player_id in lobby.correct_guesses:

        websocket = lobby.connections.get(
            player_id
        )

        if websocket:
            await websocket.send_json(
                {
                    "type": "guess_result",
                    "correct": True,
                    "already_guessed": True,
                }
            )

        return

    song = lobby.current_song

    correct = is_correct_guess(
        guess,
        song["title"],
        song["artist"],
    )

    # ========================================================
    # WRONG GUESS
    # ========================================================

    if not correct:

        websocket = lobby.connections.get(
            player_id
        )

        if websocket:
            await websocket.send_json(
                {
                    "type": "guess_result",
                    "correct": False,
                }
            )

        return

    # ========================================================
    # CORRECT GUESS
    # ========================================================

    elapsed = (
        time.time()
        - lobby.round_started_at
    )

    remaining = max(
        0,
        ROUND_DURATION - elapsed,
    )

    # Faster = more points
    points = max(
        100,
        int(
            100
            + (remaining / ROUND_DURATION) * 900
        ),
    )

    player.score += points

    # Mark player as having guessed
    lobby.correct_guesses.add(
        player_id
    )

    websocket = lobby.connections.get(
        player_id
    )

    # Tell the player they were correct
    if websocket:
        await websocket.send_json(
            {
                "type": "guess_result",
                "correct": True,
                "points": points,
            }
        )

    # Update everyone else's scoreboard
    await broadcast(
        lobby,
        {
            "type": "player_guessed",
            "player": {
                "id": player.id,
                "name": player.name,
                "score": player.score,
            },
            "players": serialize_players(
                lobby
            ),
        },
    )

    # ========================================================
    # IMPORTANT:
    #
    # DO NOT finish the round here.
    #
    # The round continues until the
    # 15 second timer expires.
    # ========================================================


# ============================================================
# WEBSOCKET
# ============================================================

@app.websocket(
    "/ws/{code}/{player_id}"
)
async def websocket_endpoint(
    websocket: WebSocket,
    code: str,
    player_id: str,
):

    code = code.upper()

    lobby = lobbies.get(code)

    if not lobby:
        await websocket.close(
            code=4004
        )
        return

    if player_id not in lobby.players:
        await websocket.close(
            code=4003
        )
        return

    await websocket.accept()

    lobby.connections[player_id] = (
        websocket
    )

    await broadcast_lobby(lobby)

    try:

        while True:

            data = (
                await websocket.receive_json()
            )

            message_type = data.get(
                "type"
            )

            # =================================================
            # HOST START GAME
            # =================================================

            if message_type == "start_game":

                if (
                    player_id
                    != lobby.host_id
                ):
                    continue

                if lobby.game_started:
                    continue

                await start_game(lobby)

            # =================================================
            # GUESS
            # =================================================

            elif message_type == "guess":

                guess = str(
                    data.get(
                        "guess",
                        "",
                    )
                )

                await handle_guess(
                    lobby,
                    player_id,
                    guess,
                )

    except WebSocketDisconnect:

        lobby.connections.pop(
            player_id,
            None,
        )

        await broadcast_lobby(lobby)

    except Exception as error:

        print(
            f"WebSocket error for "
            f"{player_id}:",
            error,
        )

        lobby.connections.pop(
            player_id,
            None,
        )

        await broadcast_lobby(lobby)