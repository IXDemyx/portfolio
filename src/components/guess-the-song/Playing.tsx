import type {
  Player,
  GuessResult,
} from "../../types/guessTheSong";

type PlayingProps = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  previewUrl: string | null;
  artwork: string | null;

  round: number;
  totalRounds: number;
  timeLeft: number;

  guess: string;
  setGuess: (value: string) => void;

  guessResult: GuessResult;
  pointsWon: number | null;

  players: Player[];
  playerId: string | null;

  onGuess: () => void;
};

function Playing({
  audioRef,
  previewUrl,
  artwork,

  round,
  totalRounds,
  timeLeft,

  guess,
  setGuess,

  guessResult,
  pointsWon,

  players,
  playerId,

  onGuess,
}: PlayingProps) {
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

        {/* =====================================================
            AUDIO
        ====================================================== */}

        {previewUrl && (
          <audio
            ref={audioRef}
            src={previewUrl}
            preload="auto"
          />
        )}

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="text-center">

          <p
            className="text-sm font-medium"
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Round {round} /{" "}
            {totalRounds}
          </p>

          {/* ===================================================
              ARTWORK
          ==================================================== */}

          <div
            className="mx-auto mt-4 flex h-40 w-40 items-center justify-center overflow-hidden rounded-2xl border"
            style={{
              backgroundColor:
                "var(--accent-soft)",
              borderColor:
                "var(--accent-border)",
            }}
          >
            {artwork ? (
              <img
                src={artwork}
                alt="Album artwork"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-5xl">
                🎵
              </span>
            )}
          </div>

          {/* ===================================================
              TIMER
          ==================================================== */}

          <div
            className="mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-full border-4 text-4xl font-bold"
            style={{
              borderColor:
                "var(--accent)",
              color:
                timeLeft <= 5
                  ? "var(--accent)"
                  : "var(--text-primary)",
            }}
          >
            {timeLeft}
          </div>

          <p
            className="mt-3"
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Sekunden
          </p>

        </div>

        {/* =====================================================
            GUESS
        ====================================================== */}

        <div className="mx-auto mt-10 max-w-xl">

          <input
            value={guess}
            onChange={(e) =>
              setGuess(e.target.value)
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter"
              ) {
                onGuess();
              }
            }}
            disabled={
              guessResult === "correct"
            }
            autoFocus
            placeholder={
              guessResult === "correct"
                ? "Du hast den Song bereits erraten!"
                : "Welcher Song ist das?"
            }
            className="w-full rounded-xl border px-5 py-4 text-lg outline-none transition"
            style={{
              backgroundColor:
                "var(--bg-card)",
              borderColor:
                guessResult === "wrong"
                  ? "var(--accent)"
                  : "var(--accent-border)",
              color:
                "var(--text-primary)",
            }}
          />

          <button
            onClick={onGuess}
            disabled={
              !guess.trim() ||
              guessResult === "correct"
            }
            className="mt-3 w-full rounded-xl px-6 py-4 font-semibold transition disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              backgroundColor:
                "var(--accent)",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              if (
                !e.currentTarget.disabled
              ) {
                e.currentTarget.style.backgroundColor =
                  "var(--accent-hover)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--accent)";
            }}
          >
            Guess
          </button>

          {/* ===================================================
              WRONG
          ==================================================== */}

          {guessResult === "wrong" && (
            <p
              className="mt-3 text-center text-sm"
              style={{
                color:
                  "var(--accent)",
              }}
            >
              ❌ Noch nicht! Versuch
              es nochmal.
            </p>
          )}

          {/* ===================================================
              CORRECT
          ==================================================== */}

          {guessResult === "correct" && (
            <div
              className="mt-4 rounded-xl p-4 text-center"
              style={{
                backgroundColor:
                  "var(--accent-soft)",
              }}
            >

              <p
                className="font-semibold"
                style={{
                  color:
                    "var(--accent)",
                }}
              >
                🎉 Richtig!
              </p>

              {pointsWon !== null && (
                <p className="mt-1 text-sm">
                  +{pointsWon} Punkte
                </p>
              )}

              <p
                className="mt-2 text-xs"
                style={{
                  color:
                    "var(--text-secondary)",
                }}
              >
                Du hast diese Runde
                bereits richtig geraten.
                Die anderen können
                weiter spielen.
              </p>

            </div>
          )}

        </div>

        {/* =====================================================
            SCOREBOARD
        ====================================================== */}

        <div className="mt-10">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-semibold">
              Score
            </h2>

            <span
              className="text-sm"
              style={{
                color:
                  "var(--text-secondary)",
              }}
            >
              Round {round}
            </span>

          </div>

          <div className="mt-3 space-y-2">

            {[...players]
              .sort(
                (a, b) =>
                  b.score - a.score
              )
              .map(
                (
                  player,
                  index
                ) => (
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

                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full text-sm"
                        style={{
                          backgroundColor:
                            "var(--accent-soft)",
                          color:
                            "var(--accent)",
                        }}
                      >
                        {index + 1}
                      </span>

                      <span>
                        {player.name}
                      </span>

                      {player.id ===
                        playerId && (
                        <span
                          className="text-xs"
                          style={{
                            color:
                              "var(--text-secondary)",
                          }}
                        >
                          You
                        </span>
                      )}

                    </div>

                    <span
                      className="font-semibold"
                      style={{
                        color:
                          "var(--accent)",
                      }}
                    >
                      {player.score}
                    </span>

                  </div>
                )
              )}

          </div>
        </div>

      </div>
    </main>
  );
}

export default Playing;