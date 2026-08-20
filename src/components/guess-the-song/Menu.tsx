type MenuProps = {
  onCreate: () => void;
  onJoin: () => void;
};

function Menu({
  onCreate,
  onJoin,
}: MenuProps) {
  return (
    <main
      className="min-h-screen px-6"
      style={{
        backgroundColor:
          "var(--bg-primary)",
        color:
          "var(--text-primary)",
      }}
    >
      <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Guess The

            <span
              className="block"
              style={{
                color:
                  "var(--accent)",
              }}
            >
              Song
            </span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-lg text-lg leading-8"
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            Hör dir einen Song an,
            erkenne ihn so schnell wie
            möglich und schlag deine
            Freunde.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row">

            <button
              onClick={onCreate}
              className="flex-1 rounded-xl px-6 py-4 font-semibold transition"
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
              Create Lobby
            </button>

            <button
              onClick={onJoin}
              className="flex-1 rounded-xl border px-6 py-4 font-semibold transition"
              style={{
                backgroundColor:
                  "var(--bg-card)",
                borderColor:
                  "var(--accent-border)",
                color:
                  "var(--text-primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--accent-soft)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--bg-card)";
              }}
            >
              Join Lobby
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}

export default Menu;