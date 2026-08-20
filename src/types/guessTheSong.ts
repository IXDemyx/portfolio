export type Mode = "menu" | "create" | "join";

export type GameState =
  | "lobby"
  | "starting"
  | "playing"
  | "finished"
  | "game_finished";

export type GuessResult =
  | "correct"
  | "wrong"
  | null;

export type Player = {
  id: string;
  name: string;
  score: number;
};

export type Song = {
  title: string;
  artist: string;
  album: string;
  artwork: string;
};

export type GuessTheSongGame = {
  mode: Mode;

  name: string;
  lobbyCode: string;

  lobby: string | null;
  playerId: string | null;

  players: Player[];
  isHost: boolean;

  error: string;

  gameState: GameState;

  round: number;
  totalRounds: number;

  previewUrl: string | null;
  artwork: string | null;

  timeLeft: number;

  guess: string;

  roundSong: Song | null;

  winner: Player | null;

  pointsWon: number | null;

  guessResult: GuessResult;
};