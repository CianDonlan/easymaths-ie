import assert from "node:assert/strict";
import test from "node:test";
import { rolldown } from "rolldown";
async function load(input) {
  const bundle = await rolldown({ input, platform: "node" });
  try { const result = await bundle.generate({ format: "esm" }); return import(`data:text/javascript,${encodeURIComponent(result.output[0].code)}`); }
  finally { await bundle.close(); }
}
const { pilotTasks, pilotExamples } = await load("src/features/quadraticsPilot/content.ts");
const { emptyPilot, emptyDraft, parsePilot, restartTask, recordAttempt, PILOT_STORAGE_KEY } = await load("src/features/quadraticsPilot/state.ts");
const { parseRoutePath } = await load("src/utils/parseRoute.ts");
const { findRealPaper } = await load("src/data/realCatalogue.ts");
const { checkAnswer } = await load("src/utils/checkAnswer.ts");

test("standalone pilot route and three real source links resolve without replacing paper routes", () => {
  for (const path of ["/pilot/quadratics", "/pilot/quadratics/"]) assert.deepEqual(parseRoutePath(path), { screen: "quadratics-pilot" });
  assert.equal(parseRoutePath("/pilot/quadratics/unknown").screen, "not-found");
  assert.equal(pilotTasks.length, 6);
  assert.equal(new Set(pilotTasks.map((t) => t.id)).size, 6);
  assert.equal(pilotTasks.filter((t) => t.source).length, 3);
  for (const task of pilotTasks) {
    assert.ok(task.hint && task.answer && task.solution.length >= 3 && task.comparison.length >= 3);
    if (task.source) {
      const source = findRealPaper(task.source.paperId).questions.find((q) => q.id === task.source.partId);
      assert.ok(source);
      assert.deepEqual(parseRoutePath(`/book/${task.source.paperId}/parts/${task.source.partId}`), { screen: "question", paperId: task.source.paperId, questionId: task.source.partId });
    }
  }
});

test("quadratics, turning points and final-answer formats agree independently", () => {
  const forms = [
    {a:1,b:6,c:2,r:-3,s:-7}, {a:2,b:-8,c:1,r:2,s:-7},
    {a:2,b:-7,c:-10,r:7/4,s:-129/8}, {a:1,b:-6,c:8,r:3,s:-1},
    {a:2,b:8,c:3,r:-2,s:-5}, {a:3,b:12,c:5,r:-2,s:-7}, {a:2,b:-6,c:7,r:1.5,s:2.5},
  ];
  for (const f of forms) for (const x of [-5,-2,0,.5,3,10]) {
    assert.ok(Math.abs(f.a*x*x+f.b*x+f.c-(f.a*(x-f.r)**2+f.s)) < 1e-10);
    assert.ok(f.a*x*x+f.b*x+f.c >= f.s-1e-10);
  }
  assert.equal(pilotExamples.length, 2);
  assert.ok(pilotExamples.every((e) => e.steps.length === 4));
  for (const [id, correct, wrong] of [["warmup-minimum","2, -7","-2, -7"],["exam-minimum","7/4, -129/8","-7/4, -129/8"],["exam-reverse","-6, 8","6, 8"],["fresh-try","-2, -5","2, -5"]]) {
    const config=pilotTasks.find((t)=>t.id===id).answerCheck;
    assert.equal(checkAnswer(correct,config),"correct");
    assert.equal(checkAnswer(wrong,config),"incorrect");
    assert.equal(checkAnswer("words",config),"unreadable");
    assert.equal(checkAnswer(config.placeholder.replace(/^e.g. /,""),config),"incorrect", "example format must not reveal the correct answer");
  }
});

test("pilot storage preserves drafts, help state, staged examples and self-selected levels", () => {
  let s=emptyPilot();
  const d={...emptyDraft(),workings:"2(x² − 4x) + 1",answer:"2, -7",helpOpen:true,section:"negative-example",helpUsed:["square","negative-example"],steps:[2,3],solutionSeen:true};
  s={...s,active:"warmup-minimum",feedback:"Check mobile return behaviour",drafts:{"warmup-minimum":d}};
  for(let i=0;i<14;i++) s=recordAttempt(s,"warmup-minimum", i%5+1,new Date(Date.UTC(2026,10,14,i)).toISOString(),`pilot-${i}`);
  assert.equal(s.attempts.length,14);
  assert.equal(s.attempts[3].level,4,"opening help must not override the student's level");
  assert.deepEqual(parsePilot(JSON.stringify(s)),s);
  const restarted=restartTask(s,"warmup-minimum");
  assert.deepEqual(restarted.drafts["warmup-minimum"],emptyDraft());
  assert.deepEqual(restarted.attempts,s.attempts);
  assert.equal(restarted.feedback,s.feedback);
  assert.equal(recordAttempt(s,"not-a-task",3,new Date().toISOString(),"bad"),s);
  assert.equal(recordAttempt(s,"fresh-try",0,new Date().toISOString(),"bad"),s);
  assert.equal(recordAttempt(s,"fresh-try",3,"bad-date","bad"),s);
  assert.deepEqual(emptyPilot().attempts,[]);
  assert.notEqual(PILOT_STORAGE_KEY,"lc-maths-local-method-attempts-v1");
  assert.notEqual(PILOT_STORAGE_KEY,"lc-maths-study-progress-v1");
});

test("damaged pilot storage safely defaults or sanitises without importing unrelated attempts", () => {
  for(const raw of [null,"oops","null",JSON.stringify({version:99})]) assert.deepEqual(parsePilot(raw),emptyPilot());
  const parsed=parsePilot(JSON.stringify({version:1,active:"wrong",drafts:{"fresh-try":{steps:[-1,100],section:"bogus",workings:27,helpUsed:["hint","bogus"],solutionOpen:true}},attempts:[{id:"wrong",taskId:"lc-hl-2017-normal-p1-1a",level:3,at:new Date().toISOString()}]}));
  assert.equal(parsed.active,pilotTasks[0].id);
  assert.deepEqual(parsed.drafts["fresh-try"].steps,[0,4]);
  assert.deepEqual(parsed.drafts["fresh-try"].helpUsed,["hint"]);
  assert.equal(parsed.drafts["fresh-try"].solutionSeen,true);
  assert.equal(parsed.attempts.length,0);
});

test("pilot renders saved help states without revealing the task solution early", async () => {
  const { mkdtemp, writeFile, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const { pathToFileURL } = await import("node:url");
  const directory = await mkdtemp(join(tmpdir(), "quadratics-render-"));
  const root = process.cwd();
  const bundle = await rolldown({ input: "virtual:pilot-render", platform: "node", plugins: [{
    name: "pilot-render-test",
    resolveId(id) { if (id === "virtual:pilot-render") return "\0pilot-entry"; if (id.endsWith(".css")) return "\0pilot-css"; },
    load(id) {
      if (id === "\0pilot-css") return "";
      if (id === "\0pilot-entry") return `import React from '${root}/node_modules/react/index.js'; import {renderToStaticMarkup} from '${root}/node_modules/react-dom/server.node.js'; import Pilot from '${root}/src/features/quadraticsPilot/QuadraticsPilot.tsx'; export function render(state){const oldStorage=Object.getOwnPropertyDescriptor(globalThis,"localStorage"), oldReact=globalThis.React; globalThis.React=React;Object.defineProperty(globalThis,"localStorage",{configurable:true,value:{getItem:()=>state?JSON.stringify(state):null}}); try{return renderToStaticMarkup(React.createElement(Pilot));}finally{if(oldStorage)Object.defineProperty(globalThis,"localStorage",oldStorage);else delete globalThis.localStorage;globalThis.React=oldReact;}}`;
    },
  }] });
  try {
    const output = await bundle.generate({ format: "esm" });
    const path = join(directory, "render.mjs");
    await writeFile(path, output.output[0].code);
    const { render } = await import(pathToFileURL(path).href);
    const initial = render();
    assert.ok(initial.includes("Make a square"));
    assert.ok(!initial.includes('id="pilot-help"'));
    assert.ok(!initial.includes('id="pilot-solution"'));
    const state = { ...emptyPilot(), active: "exam-square", drafts: { "exam-square": { ...emptyDraft(), workings: "My saved working", helpOpen: true } } };
    for (const section of ["square","turning","positive-example","negative-example","hint"]) {
      state.drafts["exam-square"].section = section;
      const html = render(state);
      assert.ok(html.includes("My saved working"));
      assert.ok(html.includes('id="pilot-help"'));
      assert.ok(!html.includes("129/8"), `${section} must not show the actual task solution`);
    }
    state.drafts["exam-square"].section = "negative-example";
    state.drafts["exam-square"].steps = [0,2];
    assert.ok(render(state).includes("Step 2"));
    assert.ok(!render(state).includes("Step 4"));
    state.drafts["exam-square"].steps = [0,4];
    assert.ok(render(state).includes("Step 4"));
    state.drafts["exam-square"].solutionOpen = true;
    assert.ok(render(state).includes("129/8"));
  } finally { await bundle.close(); await rm(directory, { recursive: true, force: true }); }
});
