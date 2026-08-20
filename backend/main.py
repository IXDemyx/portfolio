from fastapi import (
    FastAPI,
    WebSocket,
    WebSocketDisconnect,
)

from fastapi.middleware.cors import CORSMiddleware

import asyncio
import random
import string
import time
from difflib import SequenceMatcher

from songs import (
    get_random_song,
    normalize_song_title,
)


app = FastAPI()


# ============================================================
# CONFIG
# ============================================================

ROUND_DURATION = 25
HINT_INTERVAL = 5

TOTAL_ROUNDS = 5


# ============================================================
# CORS
# ============================================================

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

        self.players: dict[
            str,
            Player,
        ] = {}

        self.connections: dict[
            str,
            WebSocket,
        ] = {}

        # Game state
        self.game_started = False

        self.current_round = 0
        self.total_rounds = TOTAL_ROUNDS

        self.current_song = None

        self.round_started_at = None

        self.round_task = None
        self.hint_task = None

        self.round_finished = False

        # Players who already guessed correctly
        self.correct_players: set[
            str
        ] = set()

        # Revealed character indexes
        self.revealed_indices: set[
            int
        ] = set()


lobbies: dict[
    str,
    Lobby,
] = {}


# ============================================================
# HELPERS
# ============================================================

def generate_id(
    length: int = 16,
) -> str:

    return "".join(
        random.choices(
            string.ascii_letters
            + string.digits,
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


# ============================================================
# GUESS NORMALIZATION
# ============================================================

def normalize_guess(
    text: str,
) -> str:

    return normalize_song_title(
        text
    )


def similarity(
    a: str,
    b: str,
) -> float:

    return SequenceMatcher(
        None,
        normalize_guess(a),
        normalize_guess(b),
    ).ratio()


def is_correct_guess(
    guess: str,
    title: str,
    artist: str,
) -> bool:

    guess_normalized = normalize_guess(
        guess
    )

    if not guess_normalized:
        return False

    title_normalized = normalize_guess(
        title
    )

    artist_normalized = normalize_guess(
        artist
    )

    # --------------------------------------------------------
    # Exact title
    # --------------------------------------------------------

    if (
        guess_normalized
        == title_normalized
    ):
        return True

    # --------------------------------------------------------
    # Artist + title
    # --------------------------------------------------------

    combined = (
        f"{artist_normalized} "
        f"{title_normalized}"
    )

    if (
        guess_normalized
        == combined
    ):
        return True

    # --------------------------------------------------------
    # Similarity
    # --------------------------------------------------------

    title_score = similarity(
        guess,
        title,
    )

    combined_score = similarity(
        guess,
        combined,
    )

    if title_score >= 0.78:
        return True

    if combined_score >= 0.75:
        return True

    # --------------------------------------------------------
    # Token overlap
    # --------------------------------------------------------

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


# ============================================================
# PLAYERS
# ============================================================

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


def get_leaderboard(
    lobby: Lobby,
):

    return sorted(
        serialize_players(lobby),
        key=lambda player: player["score"],
        reverse=True,
    )


# ============================================================
# WEBSOCKET
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
# HINT SYSTEM
# ============================================================

def get_hint_indices(
    title: str,
    count: int,
):

    normalized_title = normalize_guess(
        title
    )

    available_indices = [
        index
        for index, char
        in enumerate(normalized_title)
        if char.isalnum()
        and index
        not in set()
    ]

    random.shuffle(
        available_indices
    )

    return available_indices[:count]


def build_hint(
    title: str,
    revealed_indices: set[int],
):

    normalized_title = normalize_guess(
        title
    )

    result = []

    for index, char in enumerate(
        normalized_title
    ):

        if char == " ":

            result.append(
                " "
            )

        elif index in revealed_indices:

            result.append(
                char
            )

        else:

            result.append(
                "_"
            )

    return "".join(result)


async def send_hint(
    lobby: Lobby,
):

    if (
        lobby.round_finished
        or not lobby.current_song
    ):
        return

    title = lobby.current_song[
        "title"
    ]

    normalized_title = normalize_guess(
        title
    )

    available_indices = [
        index
        for index, char
        in enumerate(normalized_title)
        if char.isalnum()
        and index
        not in lobby.revealed_indices
    ]

    if not available_indices:
        return

    new_index = random.choice(
        available_indices
    )

    lobby.revealed_indices.add(
        new_index
    )

    await broadcast(
        lobby,
        {
            "type": "hint_update",

            "hint": build_hint(
                title,
                lobby.revealed_indices,
            ),

            "revealed_count": len(
                lobby.revealed_indices
            ),
        },
    )


async def hint_loop(
    lobby: Lobby,
):

    try:

        # First hint after 5 seconds
        await asyncio.sleep(
            HINT_INTERVAL
        )

        while (
            lobby.game_started
            and not lobby.round_finished
        ):

            await send_hint(
                lobby
            )

            await asyncio.sleep(
                HINT_INTERVAL
            )

    except asyncio.CancelledError:

        pass


# ============================================================
# ROOT
# ============================================================

@app.get("/")
async def root():

    return {
        "message":
        "Guess The Song backend is running"
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

    lobby.players[
        player_id
    ] = player

    lobbies[
        code
    ] = lobby

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

    lobby = lobbies.get(
        code
    )

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

        "game_started":
            lobby.game_started,
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

    lobby = lobbies.get(
        code
    )

    if not lobby:

        return {
            "success": False,
            "error":
                "Lobby not found",
        }

    if lobby.game_started:

        return {
            "success": False,
            "error":
                "Game already started",
        }

    player_id = generate_id()

    player = Player(
        player_id=player_id,
        name=name.strip(),
    )

    lobby.players[
        player_id
    ] = player

    await broadcast_lobby(
        lobby
    )

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

    # Reset scores
    for player in lobby.players.values():
        player.score = 0

    await broadcast(
        lobby,
        {
            "type": "game_started",

            "total_rounds":
                lobby.total_rounds,
        },
    )

    await asyncio.sleep(
        2
    )

    await start_next_round(
        lobby
    )


# ============================================================
# START ROUND
# ============================================================

async def start_next_round(
    lobby: Lobby,
):

    if (
        lobby.current_round
        >= lobby.total_rounds
    ):

        await finish_game(
            lobby
        )

        return

    lobby.current_round += 1

    song = get_random_song()

    if not song:

        await broadcast(
            lobby,
            {
                "type": "error",

                "message":
                    "Could not find a song.",
            },
        )

        lobby.game_started = False

        return

    lobby.current_song = song

    lobby.round_finished = False

    lobby.round_started_at = (
        time.time()
    )

    # Players who have guessed correctly
    lobby.correct_players.clear()

    # Reset hints
    lobby.revealed_indices.clear()

    # Cancel old hint task
    if lobby.hint_task:

        lobby.hint_task.cancel()

        lobby.hint_task = None

    # Cancel old round task
    if lobby.round_task:

        lobby.round_task.cancel()

        lobby.round_task = None

    await broadcast(
        lobby,
        {
            "type": "round_started",

            "round":
                lobby.current_round,

            "total_rounds":
                lobby.total_rounds,

            "preview_url":
                song["preview_url"],

            "artwork":
                song["artwork"],

            "duration":
                ROUND_DURATION,

            "hint":
                build_hint(
                    song["title"],
                    set(),
                ),

            "revealed_count": 0,
        },
    )

    # Start timer
    lobby.round_task = asyncio.create_task(
        finish_round_after_timeout(
            lobby
        )
    )

    # Start hints
    lobby.hint_task = asyncio.create_task(
        hint_loop(
            lobby
        )
    )


# ============================================================
# ROUND TIMEOUT
# ============================================================

async def finish_round_after_timeout(
    lobby: Lobby,
):

    try:

        await asyncio.sleep(
            ROUND_DURATION
        )

        if lobby.round_finished:
            return

        await finish_round(
            lobby
        )

    except asyncio.CancelledError:

        pass


# ============================================================
# FINISH ROUND
# ============================================================

async def finish_round(
    lobby: Lobby,
):

    if lobby.round_finished:
        return

    lobby.round_finished = True

    # Cancel round timer
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

    # Cancel hints
    if lobby.hint_task:

        current_task = (
            asyncio.current_task()
        )

        if (
            lobby.hint_task
            != current_task
        ):

            lobby.hint_task.cancel()

        lobby.hint_task = None

    song = lobby.current_song

    if not song:
        return

    # --------------------------------------------------------
    # ROUND WINNERS
    # --------------------------------------------------------

    winners = []

    for player_id in lobby.correct_players:

        player = lobby.players.get(
            player_id
        )

        if player:

            winners.append(
                {
                    "id": player.id,
                    "name": player.name,
                    "score": player.score,
                }
            )

    # --------------------------------------------------------
    # BROADCAST ROUND RESULT
    # --------------------------------------------------------

    await broadcast(
        lobby,
        {
            "type": "round_finished",

            # First correct player for
            # backwards compatibility
            "winner":
                winners[0]
                if winners
                else None,

            # All correct players
            "winners":
                winners,

            "song": {
                "title":
                    song["title"],

                "artist":
                    song["artist"],

                "album":
                    song["album"],

                "artwork":
                    song["artwork"],
            },

            "players":
                serialize_players(
                    lobby
                ),

            "round":
                lobby.current_round,

            "total_rounds":
                lobby.total_rounds,

            "is_last_round":
                lobby.current_round
                >= lobby.total_rounds,
        },
    )

    # Let everyone see the result
    await asyncio.sleep(
        4
    )

    # --------------------------------------------------------
    # GAME OVER
    # --------------------------------------------------------

    if (
        lobby.current_round
        >= lobby.total_rounds
    ):

        await finish_game(
            lobby
        )

        return

    # --------------------------------------------------------
    # NEXT ROUND
    # --------------------------------------------------------

    if lobby.game_started:

        await start_next_round(
            lobby
        )


# ============================================================
# FINISH GAME
# ============================================================

async def finish_game(
    lobby: Lobby,
):

    lobby.game_started = False

    leaderboard = get_leaderboard(
        lobby
    )

    overall_winner = (
        leaderboard[0]
        if leaderboard
        else None
    )

    await broadcast(
        lobby,
        {
            "type":
                "game_finished",

            "players":
                leaderboard,

            "winner":
                overall_winner,
        },
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

    # Empty guess
    if not guess.strip():
        return

    # Player already guessed correctly
    if (
        player_id
        in lobby.correct_players
    ):

        return

    song = lobby.current_song

    correct = is_correct_guess(
        guess,
        song["title"],
        song["artist"],
    )

    # --------------------------------------------------------
    # WRONG
    # --------------------------------------------------------

    if not correct:

        websocket = lobby.connections.get(
            player_id
        )

        if websocket:

            await websocket.send_json(
                {
                    "type":
                        "guess_result",

                    "correct":
                        False,
                }
            )

        return

    # --------------------------------------------------------
    # CORRECT
    # --------------------------------------------------------

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
            + (
                remaining
                / ROUND_DURATION
            )
            * 900
        ),
    )

    player.score += points

    lobby.correct_players.add(
        player_id
    )

    websocket = lobby.connections.get(
        player_id
    )

    if websocket:

        await websocket.send_json(
            {
                "type":
                    "guess_result",

                "correct":
                    True,

                "points":
                    points,

                "total_score":
                    player.score,
            }
        )

    # IMPORTANT:
    #
    # We DO NOT finish the round here.
    #
    # Other players can continue guessing
    # until the 25 seconds are over.


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

    lobby = lobbies.get(
        code
    )

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

    lobby.connections[
        player_id
    ] = websocket

    await broadcast_lobby(
        lobby
    )

    try:

        while True:

            data = (
                await websocket.receive_json()
            )

            message_type = data.get(
                "type"
            )

            # ------------------------------------------------
            # START GAME
            # ------------------------------------------------

            if (
                message_type
                == "start_game"
            ):

                if (
                    player_id
                    != lobby.host_id
                ):

                    continue

                if lobby.game_started:

                    continue

                await start_game(
                    lobby
                )

            # ------------------------------------------------
            # GUESS
            # ------------------------------------------------

            elif (
                message_type
                == "guess"
            ):

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

        await broadcast_lobby(
            lobby
        )

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

        await broadcast_lobby(
            lobby
        )