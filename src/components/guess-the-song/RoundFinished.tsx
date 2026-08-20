import type {
  Player,
  Song,
} from "../../types/guessTheSong";

type RoundFinishedProps = {
  round: number;
  totalRounds: number;

  roundSong: Song | null;
  winner: Player | null;

  players: Player[];
};

function RoundFinished({
  round,
  totalRounds,
  roundSong,
  winner,
  players,
}: RoundFinishedProps) {
  return (
    <main
      className="min-h-screen px-6 py-12"
      style={{
        backgroundColor:
          "var(--bg-primary)",
        color:
          "var(--text-primary)",
      }}
    >
      <div className="mx-auto max-w-3xl">

        <div className="text-center">

          <h1 className="mt-5 text-3xl font-bold">
            {winner
              ? `${winner.name} got it!`
              : "Time's up!"}
          </h1>

          {winner ? (
            <p
              className="mt-2"
              style={{
                color:
                  "var(--text-secondary)",
              }}
            >
              The answer was guessed
              correctly.
            </p>
          ) : (
            <p
              className="mt-2"
              style={{
                color:
                  "var(--text-secondary)",
              }}
            >
              Nobody guessed the
              song.
            </p>
          )}

          {/* SONG */}

          {roundSong && (
            <div
              className="mx-auto mt-8 max-w-md rounded-2xl border p-6"
              style={{
                backgroundColor:
                  "var(--bg-card)",
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
                The answer was
              </p>

              <div
                className="mx-auto mt-4 flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl"
                style={{
                  backgroundColor:
                    "var(--accent-soft)",
                }}
              >
                {roundSong.artwork ? (
                  <img
                    src={
                      roundSong.artwork
                    }
                    alt="Album artwork"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-5xl">
                    🎵
                  </span>
                )}
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                {roundSong.title}
              </h2>

              <p
                className="mt-2 text-lg"
                style={{
                  color:
                    "var(--text-secondary)",
                }}
              >
                {roundSong.artist}
              </p>

            </div>
          )}

          {/* SCORE */}

          <div className="mx-auto mt-8 max-w-md">

            <h2 className="text-lg font-semibold">
              Score
            </h2>

            <div className="mt-3 space-y-2">

              {[...players]
                .sort(
                  (a, b) =>
                    b.score -
                    a.score
                )
                .map(
                  (player, index) => (
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

                      <div>
                        <span className="mr-2">
                          {index === 0
                            ? "🥇"
                            : index === 1
                            ? "🥈"
                            : index === 2
                            ? "🥉"
                            : ""}
                        </span>

                        {player.name}
                      </div>

                      <span
                        className="font-bold"
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

          <div
            className="mx-auto mt-8 rounded-xl p-4 text-sm"
            style={{
              backgroundColor:
                "var(--accent-soft)",
              color:
                "var(--text-secondary)",
            }}
          >
            {round < totalRounds
              ? "Next round starting..."
              : "Final round finished!"}
          </div>

        </div>
      </div>
    </main>
  );
}

export default RoundFinished;