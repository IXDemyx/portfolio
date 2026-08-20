import type { Player } from "../../types/guessTheSong"; 

type LobbyProps = {
  lobby: string | null;
  playerId: string | null;
  players: Player[];
  isHost: boolean;
  onStartGame: () => void;
  onLeave: () => void;
};

function Lobby({
  lobby,
  playerId,
  players,
  isHost,
  onStartGame,
  onLeave,
}: LobbyProps) {
  return (
    <main
      className="min-h-screen px-6 py-24"
      style={{
        backgroundColor:
          "var(--bg-primary)",
        color:
          "var(--text-primary)",
      }}
    >
      <div className="mx-auto max-w-3xl">

        <div className="text-center">

          <h1 className="text-4xl font-bold">
            Guess The Song
          </h1>

          <p
            className="mt-2"
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Waiting for players...
          </p>

        </div>

        {/* CODE */}

        <div
          className="mt-8 rounded-2xl border p-8 text-center"
          style={{
            backgroundColor:
              "var(--accent-soft)",
            borderColor:
              "var(--accent-border)",
          }}
        >

          <p
            className="text-sm"
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Lobby Code
          </p>

          <div
            className="mt-2 font-mono text-6xl font-bold tracking-[0.2em]"
            style={{
              color:
                "var(--accent)",
            }}
          >
            {lobby}
          </div>

          <p
            className="mt-3 text-sm"
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Share this code with
            your friends.
          </p>

        </div>

        {/* PLAYERS */}

        <div className="mt-8">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              Players
            </h2>

            <span
              style={{
                color:
                  "var(--text-secondary)",
              }}
            >
              {players.length}{" "}
              {players.length === 1
                ? "player"
                : "players"}
            </span>

          </div>

          <div className="mt-4 space-y-3">

            {players.map(
              (player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between rounded-xl border px-4 py-3"
                  style={{
                    backgroundColor:
                      "var(--bg-card)",
                    borderColor:
                      "var(--accent-border)",
                  }}
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                      style={{
                        backgroundColor:
                          "var(--accent-soft)",
                      }}
                    >
                      👤
                    </div>

                    <div>

                      <p className="font-medium">
                        {player.name}
                      </p>

                      {player.id ===
                        playerId && (
                        <p
                          className="text-xs"
                          style={{
                            color:
                              "var(--text-secondary)",
                          }}
                        >
                          You
                        </p>
                      )}

                    </div>

                  </div>

                  {player.id ===
                    players[0]?.id && (
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor:
                          "var(--accent-soft)",
                        color:
                          "var(--accent)",
                      }}
                    >
                      HOST
                    </span>
                  )}

                </div>
              )
            )}

          </div>
        </div>

        {/* START */}

        {isHost ? (
          <button
            onClick={onStartGame}
            className="mt-8 w-full rounded-xl px-6 py-4 font-semibold transition"
            style={{
              backgroundColor:
                "var(--accent)",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--accent-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--accent)";
            }}
          >
            Start Game
          </button>
        ) : (
          <div
            className="mt-8 rounded-xl p-4 text-center"
            style={{
              backgroundColor:
                "var(--accent-soft)",
              color:
                "var(--text-secondary)",
            }}
          >
            Waiting for the host
            to start the game...
          </div>
        )}

        <button
          onClick={onLeave}
          className="mt-4 w-full py-2 text-sm transition"
          style={{
            color:
              "var(--text-secondary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color =
              "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color =
              "var(--text-secondary)";
          }}
        >
          Leave Lobby
        </button>

      </div>
    </main>
  );
}

export default Lobby;