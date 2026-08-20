import Menu from "../components/guess-the-song/Menu";
import CreateLobby from "../components/guess-the-song/CreateLobby";
import JoinLobby from "../components/guess-the-song/JoinLobby";
import Lobby from "../components/guess-the-song/Lobby";
import StartingScreen from "../components/guess-the-song/StartingScreen";
import Playing from "../components/guess-the-song/Playing";
import RoundFinished from "../components/guess-the-song/RoundFinished";
import GameFinished from "../components/guess-the-song/GameFinished";
import { useGuessTheSong } from "../hooks/useGuessTheSong";

function GuessTheSong() {
  const game = useGuessTheSong();

  // ============================================================
  // MENU / CREATE / JOIN
  // ============================================================

  if (!game.lobby) {
    if (game.mode === "menu") {
      return (
        <Menu
          onCreate={() =>
            game.setMode("create")
          }
          onJoin={() =>
            game.setMode("join")
          }
        />
      );
    }

    if (game.mode === "create") {
      return (
        <CreateLobby
          name={game.name}
          setName={game.setName}
          error={game.error}
          onBack={() =>
            game.setMode("menu")
          }
          onCreate={
            game.handleCreateLobby
          }
        />
      );
    }

    return (
      <JoinLobby
        name={game.name}
        setName={game.setName}
        lobbyCode={game.lobbyCode}
        setLobbyCode={
          game.setLobbyCode
        }
        error={game.error}
        onBack={() =>
          game.setMode("menu")
        }
        onJoin={
          game.handleJoinLobby
        }
      />
    );
  }

  // ============================================================
  // GAME
  // ============================================================

  switch (game.gameState) {
    case "lobby":
      return (
        <Lobby
          lobby={game.lobby}
          playerId={game.playerId}
          players={game.players}
          isHost={game.isHost}
          onStartGame={
            game.handleStartGame
          }
          onLeave={
            game.handleLeave
          }
        />
      );

    case "starting":
      return <StartingScreen />;

    case "playing":
      return (
        <Playing
          audioRef={game.audioRef}
          previewUrl={game.previewUrl}
          artwork={game.artwork}
          round={game.round}
          totalRounds={
            game.totalRounds
          }
          timeLeft={game.timeLeft}
          guess={game.guess}
          setGuess={game.setGuess}
          guessResult={
            game.guessResult
          }
          pointsWon={
            game.pointsWon
          }
          players={game.players}
          playerId={game.playerId}
          onGuess={
            game.handleGuess
          }
        />
      );

    case "finished":
      return (
        <RoundFinished
          round={game.round}
          totalRounds={
            game.totalRounds
          }
          roundSong={
            game.roundSong
          }
          winner={game.winner}
          players={game.players}
        />
      );

    case "game_finished":
      return (
        <GameFinished
          players={game.players}
          playerId={game.playerId}
          onReturnToLobby={
            game.handleReturnToLobby
          }
        />
      );

    default:
      return null;
  }
}

export default GuessTheSong;