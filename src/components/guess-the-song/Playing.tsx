import type { Player, GuessResult } from "../../types/guessTheSong";

type PlayingProps = {
  audioRef: React.RefObject<HTMLAudioElement | null>;

  previewUrl: string | null;
  artwork: string | null;

  round: number;
  totalRounds: number;

  timeLeft: number;

  guess: string;
  setGuess: React.Dispatch<React.SetStateAction<string>>;

  guessResult: GuessResult;

  pointsWon: number | null;

  players: Player[];

  playerId: string | null;

  hint: string;

  revealedCount: number;

  onGuess: () => void;
};

function Playing({
  audioRef,
  previewUrl,
  round,
  totalRounds,
  timeLeft,
  guess,
  setGuess,
  guessResult,
  pointsWon,
  players,
  playerId,
  hint,
  revealedCount,
  onGuess,
}: PlayingProps) {
  const sortedPlayers = [...players].sort(
    (a, b) => b.score - a.score
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">

      {/* AUDIO */}

      {previewUrl && (
        <audio
          ref={audioRef}
          src={previewUrl}
          preload="auto"
        />
      )}

      {/* HEADER */}

      <div className="text-center">
        <p
          className="text-sm font-medium"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Round {round} / {totalRounds}
        </p>

        {/* TIMER */}

        <div
          className="mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-full border-4 text-4xl font-bold"
          style={{
            borderColor: "var(--accent)",
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
            color: "var(--text-secondary)",
          }}
        >
          Sekunden
        </p>
      </div>

      {/* HINT */}

      <div className="mx-auto mt-8 max-w-xl">
        <div
          className="rounded-2xl border p-6 text-center"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--accent-border)",
          }}
        >
          <p
            className="text-xs font-medium uppercase tracking-wider"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Song Hint
          </p>

          <div
            className="mt-4 overflow-x-auto whitespace-pre text-2xl font-bold tracking-[0.2em]"
            style={{
              color: "var(--text-primary)",
            }}
          >
            {hint || "—"}
          </div>

          <p
            className="mt-3 text-xs"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {revealedCount === 0
              ? "Erster Buchstabe nach 5 Sekunden"
              : revealedCount === 1
                ? "1 Buchstabe aufgedeckt"
                : `${revealedCount} Buchstaben aufgedeckt`}
          </p>
        </div>
      </div>

      {/* GUESS */}

      <div className="mx-auto mt-8 max-w-xl">
        <input
          value={guess}
          onChange={(event) => setGuess(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onGuess();
            }
          }}
          disabled={guessResult === "correct"}
          autoFocus
          placeholder={
            guessResult === "correct"
              ? "Du hast richtig geraten!"
              : "Welcher Song ist das?"
          }
          className="w-full rounded-xl border px-5 py-4 text-lg outline-none transition"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor:
              guessResult === "wrong"
                ? "var(--accent)"
                : "var(--accent-border)",
            color: "var(--text-primary)",
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
            backgroundColor: "var(--accent)",
            color: "#ffffff",
          }}
          onMouseEnter={(event) => {
            if (!event.currentTarget.disabled) {
              event.currentTarget.style.backgroundColor =
                "var(--accent-hover)";
            }
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor =
              "var(--accent)";
          }}
        >
          Guess
        </button>

        {/* WRONG */}

        {guessResult === "wrong" && (
          <p
            className="mt-3 text-center text-sm"
            style={{
              color: "var(--accent)",
            }}
          >
            ❌ Noch nicht! Versuch es nochmal.
          </p>
        )}

        {/* CORRECT */}

        {guessResult === "correct" && (
          <div
            className="mt-4 rounded-xl p-4 text-center"
            style={{
              backgroundColor: "var(--accent-soft)",
              color: "var(--accent)",
            }}
          >
            <p className="font-semibold">
              🎉 Richtig!
            </p>

            <p className="mt-1 text-sm">
              +{pointsWon} Punkte
            </p>

            <p
              className="mt-2 text-xs"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Die anderen Spieler können weiter
              raten!
            </p>
          </div>
        )}
      </div>

      {/* SCOREBOARD */}

      <div className="mx-auto mt-10 w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Score
          </h2>

          <span
            className="text-sm"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Round {round}
          </span>
        </div>

        {/* SCORE LIST */}

        <div className="mt-3 overflow-hidden rounded-2xl border border-(--accent)">
          {sortedPlayers.map((player, index) => (
            <div
              key={player.id}
              className="flex min-w-0 items-center justify-between px-4 py-2.5"
              style={{
                backgroundColor: "var(--bg-card)",
                borderBottom:
                  index < sortedPlayers.length - 1
                    ? "1px solid var(--accent-border)"
                    : undefined,
              }}
            >
              {/* PLAYER */}

              <div className="flex min-w-0 items-center gap-3">

                {/* RANK */}

                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor:
                      index === 0
                        ? "var(--accent)"
                        : "var(--accent-soft)",
                    color:
                      index === 0
                        ? "#ffffff"
                        : "var(--accent)",
                  }}
                >
                  {index + 1}
                </span>

                {/* NAME */}

                <span
                  className="min-w-0 truncate text-sm font-medium"
                  title={player.name}
                >
                  {player.name}
                </span>

                {/* YOU */}

                {player.id === playerId && (
                  <span
                    className="shrink-0 text-[11px]"
                    style={{
                      color: "var(--text-secondary)",
                    }}
                  >
                    You
                  </span>
                )}
              </div>

              {/* SCORE */}

              <span
                className="ml-4 shrink-0 text-sm font-bold tabular-nums"
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
    </div>
  );
}

export default Playing;