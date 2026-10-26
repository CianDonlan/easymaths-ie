import assert from "node:assert/strict";
import { test } from "node:test";
import handler from "../.netlify/functions-internal/server/main.mjs";

const origin = "https://preview.example.test";
const setupKey = "local-firestore-smoke-key-abcdefghijklmnopqrstuvwxyz";
process.env.TRACKER_SETUP_KEY = setupKey;

async function request(path, options = {}) {
  return handler(new Request(origin + path, options));
}

test("built Netlify function serves public pages and persists a tracker attempt", async () => {
  assert.equal((await request("/")).status, 200);
  assert.equal((await request("/grinds")).status, 200);
  assert.equal((await request("/tracker/login")).status, 200);
  const status = await (await request("/api/tracker/bootstrap")).json();
  assert.equal(status.needsSetup, true);
  const headers = { Origin: origin, "Content-Type": "application/json" };
  const account = { username: "admin", displayName: "Tutor", password: "local-password-123" };
  assert.equal((await request("/api/tracker/bootstrap", { method: "POST", headers, body: JSON.stringify({ ...account, setupKey: "wrong" }) })).status, 403);
  const created = await request("/api/tracker/bootstrap", { method: "POST", headers, body: JSON.stringify({ ...account, setupKey }) });
  assert.equal(created.status, 200);
  const cookie = created.headers.get("set-cookie")?.split(";")[0];
  assert.ok(cookie);
  const attempt = await request("/api/tracker/attempts", { method: "POST", headers: { ...headers, Cookie: cookie }, body: JSON.stringify({ partId: "lc-hl-2025-normal-p1-1a", methodScore: 3, attemptedAt: "2026-10-26T12:00:00.000Z" }) });
  assert.equal(attempt.status, 200);
  const dashboard = await request("/api/tracker", { headers: { Cookie: cookie } });
  assert.equal(dashboard.status, 200);
  const data = await dashboard.json();
  assert.equal(data.attempts.length, 1);
  assert.equal((await request("/tracker", { headers: { Cookie: cookie } })).status, 200);
});
