import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((e) => e.isDirectory() ? files(join(directory, e.name)) : [join(directory, e.name)]))).flat();
}
test("Netlify publish output includes isolated study HTML, assets and fonts", async () => {
  const html = await readFile("dist/study-preview/index.html", "utf8");
  const refs = [...html.matchAll(/(?:src|href)="(\/study-preview\/[^"?#]+)"/g)].map((m) => m[1]);
  assert.ok(refs.some((p) => p.endsWith(".js")) && refs.some((p) => p.endsWith(".css")));
  for (const ref of refs) await readFile(join("dist", ref.slice(1)));
  const css = (await Promise.all(refs.filter((p) => p.endsWith(".css")).map((p) => readFile(join("dist", p.slice(1)), "utf8")))).join("\n");
  assert.match(css, /\/study-preview\/fonts\/STIXTwoMath-Regular\.woff2/);
  await readFile("dist/study-preview/fonts/STIXTwoMath-Regular.woff2");
  const published = await files("dist/study-preview");
  assert.ok(!published.some((p) => /\.pdf$|node_modules|package-lock|\.tsx$|\.git\//.test(p)));
});
test("study preview rules are scoped and preserve website routing", async () => {
  const config = await readFile("netlify.toml", "utf8");
  assert.match(config, /from = "\/study-preview"/);
  assert.match(config, /X-Robots-Tag = "noindex, nofollow"/);
  assert.ok(!config.includes('from = "/*"'));
  await readFile("dist/netlify-form.html");
  const handlerConfig = await readFile(".netlify/functions-internal/server/server.mjs", "utf8");
  assert.match(handlerConfig, /preferStatic:\s*true/);
  const redirects = await readFile("dist/_redirects", "utf8");
  assert.ok(!redirects.includes("/study-preview/* /index.html"));
});
