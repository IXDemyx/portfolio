import type { Player } from "../../types/guessTheSong";

type GameFinishedProps = {
  players: Player[];
  playerId: string | null;
  onReturnToLobby: () => void;
};

function GameFinished({
  players,
  playerId,
  onReturnToLobby,
}: GameFinishedProps) {
  return (
    <main
      className="min-h-screen px-6 py-12"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">

          <h1 className="mt-6 text-4xl font-bold">
            Game Over!
          </h1>

          <p
            className="mt-2"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Final results
          </p>

          {/* FINAL WINNER */}

          {players.length > 0 && (
            <div
              className="mx-auto mt-8 max-w-md rounded-2xl border p-6"
              style={{
                backgroundColor: "var(--accent-soft)",
                borderColor: "var(--accent-border)",
              }}
            >
              <div className="text-5xl">
                🥇
              </div>

              <p
                className="mt-3 text-sm"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                Winner
              </p>

              <h2
                className="mt-1 text-2xl font-bold"
                style={{
                  color: "var(--accent)",
                }}
              >
                {players[0].name}
              </h2>

              <p
                className="mt-1"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                {players[0].score} points
              </p>
            </div>
          )}

          {/* LEADERBOARD */}

          <div className="mx-auto mt-8 max-w-md">
            <h2 className="text-lg font-semibold">
              Final Score
            </h2>

            <div className="mt-3 space-y-2">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between rounded-xl border px-4 py-4"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor:
                      index === 0
                        ? "var(--accent)"
                        : "var(--accent-border)",
                  }}
                >
                  <div className="flex items-center gap-3">

                    <span className="text-xl">
                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : `#${index + 1}`}
                    </span>

                    <span className="font-medium">
                      {player.name}
                    </span>

                    {player.id === playerId && (
                      <span
                        className="text-xs"
                        style={{
                          color: "var(--text-secondary)",
                        }}
                      >
                        You
                      </span>
                    )}
                  </div>

                  <span
                    className="font-bold"
                    style={{
                      color: "var(--accent)",
                    }}
                  >
                    {player.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BACK TO LOBBY */}

          <button
            onClick={onReturnToLobby}
            className="mt-10 w-full max-w-md rounded-xl px-6 py-4 font-semibold transition"
            style={{
              backgroundColor: "var(--accent)",
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
            Back to Lobby
          </button>

        </div>
      </div>
    </main>
  );
}

export default GameFinished;