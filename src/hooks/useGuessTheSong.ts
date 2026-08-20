import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  Mode,
  GameState,
  Player,
  Song,
  GuessResult,
} from "../types/guessTheSong";


export function useGuessTheSong() {

  const [mode, setMode] =
    useState<Mode>("menu");

  const [name, setName] =
    useState("");

  const [lobbyCode, setLobbyCode] =
    useState("");

  const [lobby, setLobby] =
    useState<string | null>(null);

  const [playerId, setPlayerId] =
    useState<string | null>(null);

  const [players, setPlayers] =
    useState<Player[]>([]);

  const [isHost, setIsHost] =
    useState(false);

  const [error, setError] =
    useState("");

  const [gameState, setGameState] =
    useState<GameState>("lobby");

  const [round, setRound] =
    useState(0);

  const [totalRounds, setTotalRounds] =
    useState(5);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const [artwork, setArtwork] =
    useState<string | null>(null);

  const [timeLeft, setTimeLeft] =
    useState(25);

  const [guess, setGuess] =
    useState("");

  const [roundSong, setRoundSong] =
    useState<Song | null>(null);

  const [winner, setWinner] =
    useState<Player | null>(null);

  const [pointsWon, setPointsWon] =
    useState<number | null>(null);

  const [guessResult, setGuessResult] =
    useState<GuessResult>(null);

  const [hint, setHint] =
    useState("");

  const [revealedCount, setRevealedCount] =
    useState(0);


  const websocketRef =
    useRef<WebSocket | null>(null);

  const audioRef =
    useRef<HTMLAudioElement | null>(
      null
    );

  const timerRef =
    useRef<number | null>(null);


  // ============================================================
  // CREATE LOBBY
  // ============================================================

  const handleCreateLobby =
    async () => {

      if (!name.trim()) {
        return;
      }

      setError("");

      try {

        const response =
          await fetch(
            `http://localhost:8000/lobby/create?name=${encodeURIComponent(
              name.trim()
            )}`,
            {
              method: "POST",
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error();
        }

        setLobby(
          data.lobby_code
        );

        setPlayerId(
          data.player_id
        );

        setIsHost(true);

        setPlayers([
          data.player,
        ]);

        setGameState("lobby");

      } catch (error) {

        console.error(error);

        setError(
          "Could not create lobby."
        );

      }

    };


  // ============================================================
  // JOIN LOBBY
  // ============================================================

  const handleJoinLobby =
    async () => {

      if (
        !name.trim()
        || !lobbyCode.trim()
      ) {
        return;
      }

      setError("");

      try {

        const response =
          await fetch(
            `http://localhost:8000/lobby/join?code=${encodeURIComponent(
              lobbyCode.trim()
            )}&name=${encodeURIComponent(
              name.trim()
            )}`,
            {
              method: "POST",
            }
          );

        const data =
          await response.json();

        if (
          !response.ok
          || !data.success
        ) {

          setError(
            data.error
            || "Could not join lobby."
          );

          return;
        }

        setLobby(
          data.lobby_code
        );

        setPlayerId(
          data.player_id
        );

        setIsHost(false);

        setPlayers([
          data.player,
        ]);

        setGameState("lobby");

      } catch (error) {

        console.error(error);

        setError(
          "Could not join lobby."
        );

      }

    };


  // ============================================================
  // WEBSOCKET
  // ============================================================

  useEffect(() => {

    if (
      !lobby
      || !playerId
    ) {
      return;
    }

    const websocket =
      new WebSocket(
        `ws://localhost:8000/ws/${lobby}/${playerId}`
      );

    websocketRef.current =
      websocket;


    websocket.onopen = () => {

      console.log(
        "Guess The Song WebSocket connected"
      );

    };


    websocket.onmessage =
      (event) => {

        try {

          const data =
            JSON.parse(
              event.data
            );


          // ====================================================
          // LOBBY UPDATE
          // ====================================================

          if (
            data.type
            === "lobby_update"
          ) {

            setPlayers(
              data.players
            );

            setIsHost(
              data.host_id
              === playerId
            );

            return;
          }


          // ====================================================
          // GAME STARTED
          // ====================================================

          if (
            data.type
            === "game_started"
          ) {

            setGameState(
              "starting"
            );

            setTotalRounds(
              data.total_rounds
            );

            setRound(0);

            return;
          }


          // ====================================================
          // ROUND STARTED
          // ====================================================

          if (
            data.type
            === "round_started"
          ) {

            setGameState(
              "playing"
            );

            setRound(
              data.round
            );

            setTotalRounds(
              data.total_rounds
            );

            setPreviewUrl(
              data.preview_url
            );

            setArtwork(
              data.artwork
            );

            setTimeLeft(
              data.duration
            );

            setGuess("");

            setGuessResult(
              null
            );

            setRoundSong(
              null
            );

            setWinner(
              null
            );

            setPointsWon(
              null
            );

            setHint(
              data.hint || ""
            );

            setRevealedCount(
              data.revealed_count || 0
            );


            // Start audio
            setTimeout(() => {

              if (
                audioRef.current
              ) {

                audioRef.current.currentTime =
                  0;

                audioRef.current
                  .play()
                  .catch(
                    (error) => {

                      console.log(
                        "Autoplay blocked:",
                        error
                      );

                    }
                  );

              }

            }, 150);

            return;
          }


          // ====================================================
          // HINT UPDATE
          // ====================================================

          if (
            data.type
            === "hint_update"
          ) {

            setHint(
              data.hint || ""
            );

            setRevealedCount(
              data.revealed_count || 0
            );

            return;
          }


          // ====================================================
          // GUESS RESULT
          // ====================================================

          if (
            data.type
            === "guess_result"
          ) {

            if (data.correct) {

              setGuessResult(
                "correct"
              );

              setPointsWon(
                data.points
              );

              // Update own score immediately
              if (
                typeof data.total_score
                === "number"
              ) {

                setPlayers(
                  previous =>
                    previous.map(
                      player =>
                        player.id
                        === playerId
                          ? {
                              ...player,
                              score:
                                data.total_score,
                            }
                          : player
                    )
                );

              }

            } else {

              setGuessResult(
                "wrong"
              );

              setTimeout(() => {

                setGuessResult(
                  current =>
                    current === "wrong"
                      ? null
                      : current
                );

              }, 1000);

            }

            return;
          }


          // ====================================================
          // ROUND FINISHED
          // ====================================================

          if (
            data.type
            === "round_finished"
          ) {

            setGameState(
              "finished"
            );

            setRoundSong(
              data.song
            );

            setPlayers(
              data.players
            );

            if (data.winner) {

              setWinner(
                data.winner
              );

            } else {

              setWinner(null);

            }

            setGuessResult(
              null
            );

            setHint("");

            setRevealedCount(
              0
            );

            if (
              audioRef.current
            ) {

              audioRef.current.pause();

            }

            return;
          }


          // ====================================================
          // GAME FINISHED
          // ====================================================

          if (
            data.type
            === "game_finished"
          ) {

            setGameState(
              "game_finished"
            );

            setPlayers(
              data.players
            );

            setWinner(
              data.winner || null
            );

            setGuessResult(
              null
            );

            if (
              audioRef.current
            ) {

              audioRef.current.pause();

            }

            return;
          }


          // ====================================================
          // ERROR
          // ====================================================

          if (
            data.type
            === "error"
          ) {

            setError(
              data.message
            );

            return;
          }

        } catch (error) {

          console.error(
            "Failed to parse WebSocket message:",
            error
          );

        }

      };


    websocket.onerror = (
      error
    ) => {

      console.error(
        "WebSocket error:",
        error
      );

    };


    websocket.onclose = () => {

      console.log(
        "Guess The Song WebSocket disconnected"
      );

    };


    return () => {

      websocket.close();

      websocketRef.current =
        null;

    };

  }, [
    lobby,
    playerId,
  ]);


  // ============================================================
  // TIMER
  // ============================================================

  useEffect(() => {

    if (
      gameState !== "playing"
    ) {
      return;
    }

    timerRef.current =
      window.setInterval(() => {

        setTimeLeft(
          previous =>
            Math.max(
              0,
              previous - 1
            )
        );

      }, 1000);


    return () => {

      if (
        timerRef.current
        !== null
      ) {

        clearInterval(
          timerRef.current
        );

        timerRef.current =
          null;

      }

    };

  }, [
    gameState,
    round,
  ]);


  // ============================================================
  // START GAME
  // ============================================================

  const handleStartGame =
    () => {

      if (
        !websocketRef.current
        || websocketRef.current.readyState
          !== WebSocket.OPEN
      ) {
        return;
      }

      websocketRef.current.send(
        JSON.stringify({
          type:
            "start_game",
        })
      );

    };


  // ============================================================
  // GUESS
  // ============================================================

  const handleGuess =
    () => {

      if (
        !guess.trim()
        || gameState
          !== "playing"
        || guessResult
          === "correct"
      ) {
        return;
      }

      if (
        !websocketRef.current
        || websocketRef.current.readyState
          !== WebSocket.OPEN
      ) {
        return;
      }

      websocketRef.current.send(
        JSON.stringify({
          type: "guess",

          guess:
            guess.trim(),
        })
      );

    };


  // ============================================================
  // LEAVE
  // ============================================================

  const handleLeave =
    () => {

      if (
        websocketRef.current
      ) {

        websocketRef.current.close();

      }

      if (
        audioRef.current
      ) {

        audioRef.current.pause();

        audioRef.current.currentTime =
          0;

      }

      if (
        timerRef.current
        !== null
      ) {

        clearInterval(
          timerRef.current
        );

        timerRef.current =
          null;

      }

      setLobby(null);

      setPlayerId(null);

      setPlayers([]);

      setIsHost(false);

      setGameState(
        "lobby"
      );

      setMode(
        "menu"
      );

      setGuess("");

      setRound(0);

      setPreviewUrl(null);

      setArtwork(null);

      setRoundSong(null);

      setWinner(null);

      setPointsWon(null);

      setGuessResult(null);

      setHint("");

      setRevealedCount(0);

      setError("");

    };


  // ============================================================
  // RETURN TO LOBBY
  // ============================================================

  const handleReturnToLobby =
    () => {

      if (
        websocketRef.current
      ) {

        websocketRef.current.close();

      }

      if (
        audioRef.current
      ) {

        audioRef.current.pause();

        audioRef.current.currentTime =
          0;

      }

      if (
        timerRef.current
        !== null
      ) {

        clearInterval(
          timerRef.current
        );

        timerRef.current =
          null;

      }

      setGameState(
        "lobby"
      );

      setGuess("");

      setRound(0);

      setPreviewUrl(null);

      setArtwork(null);

      setRoundSong(null);

      setWinner(null);

      setPointsWon(null);

      setGuessResult(null);

      setHint("");

      setRevealedCount(0);

      setError("");

      // IMPORTANT:
      // We do NOT remove lobby/playerId.
      // Therefore the player stays in
      // the same lobby.

    };


  return {

    mode,
    setMode,

    name,
    setName,

    lobbyCode,
    setLobbyCode,

    lobby,
    playerId,

    players,

    isHost,

    error,

    gameState,

    round,
    totalRounds,

    previewUrl,
    artwork,

    timeLeft,

    guess,
    setGuess,

    roundSong,

    winner,

    pointsWon,

    guessResult,

    hint,
    revealedCount,

    audioRef,

    handleCreateLobby,
    handleJoinLobby,

    handleStartGame,

    handleGuess,

    handleLeave,

    handleReturnToLobby,
  };
}