import test from "node:test";
import assert from "node:assert/strict";
import { build } from "esbuild";

const bundled = await build({ entryPoints:["app/tracker/demo-store.ts"], bundle:true, platform:"node", format:"esm", write:false });
const source = bundled.outputFiles[0].text;
const { readDemoAttempts, saveDemoAttempt, deleteDemoAttempt, demoStorageKey } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);

function memoryStorage() {
  const data = new Map();
  return { getItem:key => data.get(key) ?? null, setItem:(key,value) => data.set(key,value) };
}

test("local demo survives reload, edits, retries and deletion", () => {
  const storage = memoryStorage();
  const input = { partId:"lc-hl-2026-normal-p1-1a", submissionId:crypto.randomUUID(), methodScore:2, attemptedAt:"2026-10-01T10:00:00.000Z", earnedMarks:"0", maximumMarks:"10", note:"Try again" };
  const first = saveDemoAttempt(storage, input);
  assert.equal(readDemoAttempts(storage).length,1);
  assert.equal(readDemoAttempts(storage)[0].earnedMarks,0);
  assert.equal(saveDemoAttempt(storage,input).id,first.id);
  assert.equal(readDemoAttempts(storage).length,1);
  const edited = saveDemoAttempt(storage,{ ...input, id:first.id, methodScore:4, note:"Improved" });
  assert.equal(edited.methodScore,4);
  assert.equal(edited.createdAt,first.createdAt);
  assert.equal(readDemoAttempts(storage)[0].note,"Improved");
  deleteDemoAttempt(storage,first.id);
  assert.deepEqual(readDemoAttempts(storage),[]);
  assert.throws(()=>saveDemoAttempt(storage,{...input, earnedMarks:"11"}),/exceed/);
  storage.setItem(demoStorageKey,"not-json");
  assert.deepEqual(readDemoAttempts(storage),[]);
});
