// Startet Portfolio und Games gemeinsam: `npm run dev`
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const games = path.join(root, "games");

if (!existsSync(path.join(games, "node_modules"))) {
  console.log("[games] Installiere Abhängigkeiten …");
  const install = spawnSync("npm install", { cwd: games, shell: true, stdio: "inherit" });
  if (install.status !== 0) process.exit(install.status ?? 1);
}

const children = [];
let stopping = false;

function stop(code) {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (child.exitCode !== null) continue;
    if (process.platform === "win32") {
      spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
    } else {
      child.kill("SIGTERM");
    }
  }
  process.exit(code);
}

function run(name, color, command, cwd) {
  const child = spawn(command, {
    cwd,
    shell: true,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, FORCE_COLOR: "1" },
  });
  const tag = `\x1b[${color}m[${name}]\x1b[0m `;
  for (const stream of [child.stdout, child.stderr]) {
    let rest = "";
    stream.on("data", (chunk) => {
      const lines = (rest + chunk).split(/\r?\n/);
      rest = lines.pop() ?? "";
      for (const line of lines) console.log(tag + line);
    });
  }
  child.on("exit", (code) => {
    if (!stopping) console.log(`${tag}beendet (Code ${code ?? 0})`);
    stop(code ?? 0);
  });
  children.push(child);
}

run("portfolio", "37", "npm run dev:portfolio", root);
run("games", "33", "npm run dev", games);

process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
