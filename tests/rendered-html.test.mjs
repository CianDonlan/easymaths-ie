import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the poster challenge", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>60 Second Maths Challenge/);
  assert.match(html, /Get the first hint/);
  assert.match(html, /Check answer/);
  assert.match(html.replace(/<!-- -->/g, ""), /01:00/);
  assert.match(html, /60 seconds\. No calculator\./);
  assert.match(html, /<mfrac><mn>1<\/mn><mi>𝑥<\/mi><\/mfrac>/);
  assert.doesNotMatch(html, /1\/x/);
  assert.doesNotMatch(html, /Come and see|A little light for the next step/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("ships final metadata and removes the disposable starter", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /guideSteps/);
  assert.match(page, /Request a grind/);
  assert.match(layout, /60 Second Maths Challenge/);
  assert.match(layout, /\/og\.png/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await access(new URL("../public/fonts/STIXTwoMath-Regular.woff2", import.meta.url));
  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
});
