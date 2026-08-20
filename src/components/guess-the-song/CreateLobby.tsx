type CreateLobbyProps = {
  name: string;
  setName: (value: string) => void;
  error: string;
  onBack: () => void;
  onCreate: () => void;
};

function CreateLobby({
  name,
  setName,
  error,
  onBack,
  onCreate,
}: CreateLobbyProps) {
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

        <div className="w-full max-w-md">

          <button
            onClick={onBack}
            className="mb-8 text-sm transition"
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
            ← Back
          </button>

          <div
            className="rounded-2xl border p-8 shadow-xl"
            style={{
              backgroundColor:
                "var(--bg-card)",
              borderColor:
                "var(--accent-border)",
            }}
          >

            <h2 className="text-3xl font-bold">
              Create Lobby
            </h2>

            <p
              className="mt-2"
              style={{
                color:
                  "var(--text-secondary)",
              }}
            >
              Gib deinen Namen ein,
              um eine Lobby zu
              erstellen.
            </p>

            <label
              className="mt-8 block text-sm"
              style={{
                color:
                  "var(--text-secondary)",
              }}
            >
              Your name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onCreate();
                }
              }}
              placeholder="Daniel"
              maxLength={20}
              autoFocus
              className="mt-2 w-full rounded-xl border px-4 py-3 outline-none transition"
              style={{
                backgroundColor:
                  "var(--bg-secondary)",
                borderColor:
                  "var(--accent-border)",
                color:
                  "var(--text-primary)",
              }}
            />

            {error && (
              <p
                className="mt-4 text-sm"
                style={{
                  color:
                    "var(--accent)",
                }}
              >
                {error}
              </p>
            )}

            <button
              onClick={onCreate}
              disabled={!name.trim()}
              className="mt-6 w-full rounded-xl px-6 py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                backgroundColor:
                  "var(--accent)",
                color: "#ffffff",
              }}
            >
              Create Lobby
            </button>

          </div>
        </div>

      </div>
    </main>
  );
}

export default CreateLobby;