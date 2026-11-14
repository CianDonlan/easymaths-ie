import { spawnSync } from "node:child_process";
import { cp, mkdir, readFile, rename, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const study = join(root, "study-app");
const destination = join(root, "public", "study-preview");
const staging = join(root, ".study-preview-build");
function npm(args) {
  const result = spawnSync("npm", args, { cwd: study, stdio: "inherit", env: process.env });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Study app command failed: npm ${args.join(" ")}`);
}
// Netlify installs the website dependencies; this nested app has its own lockfile.
// --skip-install is for local verification after its dependencies are installed.
if (!process.argv.includes("--skip-install")) npm(["ci", "--no-audit", "--no-fund"]);
npm(["run", "build:preview"]);
const html = await readFile(join(study, "dist", "index.html"), "utf8");
if (!html.includes("/study-preview/assets/")) throw new Error("Study build did not use its nested public base");
await mkdir(dirname(destination), { recursive: true });
await rm(staging, { recursive: true, force: true });
await cp(join(study, "dist"), staging, { recursive: true });
await rm(destination, { recursive: true, force: true });
await rename(staging, destination);
console.log("Study preview prepared at public/study-preview/ (source PDFs are not published).");
