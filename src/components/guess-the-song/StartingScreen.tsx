function StartingScreen() {
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
      <div className="mx-auto max-w-3xl">

        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">

          <div
            className="text-6xl"
            style={{
              color:
                "var(--accent)",
            }}
          >
            🎵
          </div>

          <h1 className="mt-6 text-4xl font-bold">
            Get ready!
          </h1>

          <p
            className="mt-3"
            style={{
              color:
                "var(--text-secondary)",
            }}
          >
            The game is about
            to start...
          </p>

        </div>

      </div>
    </main>
  );
}

export default StartingScreen;