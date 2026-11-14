import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { rolldown } from "rolldown";

async function load(entry) {
  const bundle = await rolldown({ input: entry, platform: "node" });
  try {
    const output = await bundle.generate({ format: "esm" });
    return import(`data:text/javascript,${encodeURIComponent(output.output[0].code)}`);
  } finally { await bundle.close(); }
}
const { findBookPaper, findRealPaper } = await load("src/data/realCatalogue.ts");
const { parseRoutePath } = await load("src/utils/parseRoute.ts");
const { checkAnswer } = await load("src/utils/checkAnswer.ts");
const part = (n, code) => findRealPaper(`lc-hl-2017-normal-p${n}`).questions.find((q) => q.id.endsWith(`-${code}`));
const check = (n, code, answer, expected = "correct") => assert.equal(checkAnswer(String(answer), part(n, code).answerCheck), expected, `P${n} ${code}: ${answer}`);

test("2017 uses nine-question catalogues, complete leaf coverage and verified source PDFs", async () => {
  for (const [n, count, checked] of [[1, 33, 19], [2, 37, 23]]) {
    const id = `lc-hl-2017-normal-p${n}`;
    const book = findBookPaper(id);
    const paper = findRealPaper(id);
    assert.equal(book.questions.length, 9);
    assert.equal(book.catalogueOrigin, "app-local-source-review");
    assert.equal(book.sourceReview.printedPages, n === 1 ? "3–19" : "3–17");
    assert.equal(book.questions.reduce((sum, q) => sum + q.totalMarks, 0), 300);
    assert.equal(book.parts.length, count);
    assert.equal(paper.questions.length, count);
    assert.equal(paper.questions.filter((q) => q.answerCheck).length, checked);
    assert.deepEqual(paper.questions.map((q) => q.id), book.parts.map((p) => p.id));
    assert.equal(new Set(paper.questions.map((q) => q.id)).size, count);
    assert.equal(parseRoutePath(`/book/${id}`).screen, "book");
    for (const q of paper.questions) {
      assert.deepEqual(parseRoutePath(`/book/${id}/parts/${q.id}`), { screen: "question", paperId: id, questionId: q.id });
      assert.ok(q.prompt && q.answer && q.solution, q.id);
      assert.ok(Boolean(q.answerCheck) !== Boolean(q.selfCheck), q.id);
      assert.equal(q.marks, null);
      if (q.selfCheck) assert.ok(q.selfCheck.checks.length >= 2, q.id);
    }
    assert.ok(paper.questions.at(-1).id.includes("-9"));
    const pdf = await readFile(`data/papers/2017_normal_lc_maths_hl_english_paper_${n}.pdf`);
    assert.equal(createHash("sha256").update(pdf).digest("hex"), book.sourceSha256);
  }
});

test("2017 covers every automatic check, placeholder and neutral unsupported form", () => {
  const examples = [
    [1,"1b","7/4, -129/8","-7/4, -129/8"], [1,"2b","-6","6"], [1,"3b","0.372","0.371"],
    [1,"4a","13","12"], [1,"4b","16+8sqrt(2)","8+8sqrt(2)"], [1,"5b","-2, 9, 1/3, -100/27","-2, 9, -1/3, -100/27"],
    [1,"6b","0.5894","0.5893"], [1,"7a","1.1","1100000"], [1,"7b","1813593","1813594"],
    [1,"7c","190737","1813593"], [1,"7e","2018","2019"], [1,"7f","2743694","2743693"], [1,"7g","-130712","130712"],
    [1,"8bi","125","250"], [1,"8bii","1.65%","1.81%"], [1,"8biv","66","65"], [1,"8bv","36.16","36.17"],
    [1,"9bi","3.6, 1.9","1.9, 3.6"], [1,"9c","13, 26, 15, 42","11, 26, 13, 42"],
    [2,"1a","256/78125","1792/78125"], [2,"1b","256/15625","256/78125"], [2,"1d","21","20"],
    [2,"2a","-0.957","0.957"], [2,"2di","23","24"], [2,"2dii","6.98","698"],
    [2,"3a","1, -1","-1, 1"], [2,"3b","-2, -4","2, 4"], [2,"4a","(x-13/4)^2+(y-6)^2=745/16","(x+13/4)^2+(y-6)^2=745/16"],
    [2,"4b","28.44","151.56"], [2,"5b","31.2","13"], [2,"5d","680.4","1123.2"],
    [2,"6a","52","52219"], [2,"6b","24091","40030"], [2,"7bii","6","12"], [2,"7c","360pi","864pi"],
    [2,"8ai","91.15%","8.85%"], [2,"8aii","85.2","41.8"], [2,"8bii","17/80","7/60"], [2,"8biii","28/51","7/60"],
    [2,"9c","5.3","9.2"], [2,"9d","9.2","5.3"], [2,"9f","30.4%","15.2%"],
  ];
  const covered = new Set();
  for (const [n, code, correct, wrong] of examples) {
    covered.add(part(n, code).id);
    check(n, code, correct); check(n, code, wrong, "incorrect"); check(n, code, "unsupported response", "unreadable");
    check(n, code, part(n, code).answerCheck.placeholder.replace(/^e.g. /, ""));
  }
  assert.equal(covered.size, 42);
  for (const n of [1, 2]) for (const q of findRealPaper(`lc-hl-2017-normal-p${n}`).questions) assert.equal(covered.has(q.id), Boolean(q.answerCheck), q.id);
  for (const [n, code] of [[1,"2a"],[1,"3a"],[1,"5a"],[1,"5c"],[1,"8a"],[1,"8biii"],[1,"8bvi"],[2,"5a"],[2,"5c"],[2,"7a"],[2,"8aiii"],[2,"8bi"],[2,"9e"]]) assert.ok(part(n,code).selfCheck);
});

test("2017 metadata is source-reviewed locally and follows the stable ID convention", () => {
  for (const n of [1, 2]) {
    const book = findBookPaper(`lc-hl-2017-normal-p${n}`);
    assert.equal(book.parts[0].order, 1);
    const validTopics = new Set(n === 1 ? ["p1-algebra","p1-calculus","p1-complex","p1-sequences","p1-graphs","p1-number"] : ["p2-probability","p2-statistics","p2-line","p2-circle","p2-geometry","p2-trigonometry"]);
    book.parts.forEach((p,i) => {
      assert.equal(p.order, i + 1); assert.equal(p.maximumMarks, null);
      assert.match(p.id, new RegExp(`^lc-hl-2017-normal-p${n}-[1-9][a-g]([iv]+)?$`));
      assert.ok(p.topicIds.length && p.topicIds.every((t) => validTopics.has(t)));
      assert.ok(p.sourcePage >= 3 && p.sourcePage <= (n === 1 ? 19 : 17));
    });
  }
  assert.ok(part(2,"1d"));
  assert.equal(findBookPaper("lc-hl-2017-normal-p1").questions[6].totalMarks, 55);
  assert.equal(findBookPaper("lc-hl-2017-normal-p2").questions[7].totalMarks, 60);
});

test("2017 Paper 1 numerical answers satisfy independent calculations and strict boundaries", () => {
  const round = (x, dp=0) => Number(x.toFixed(dp));
  const f = (x) => 2*x*x-7*x-10;
  check(1,"1b", `7/4, ${f(7/4)}`);
  for (const x of [-3, -1, 0, 1, 4]) assert.ok(Math.abs(f(x)-(2*(x-7/4)**2-129/8))<1e-10);
  check(1,"3b", round(6*5.25/(3*5.25**2+2),3));
  assert.ok(95*.45**11 >= .01 && 95*.45**12 < .01);
  const perimeters = Array.from({length:100},(_,i)=>8*(1/Math.sqrt(2))**i).reduce((a,b)=>a+b);
  assert.ok(Math.abs(perimeters-(16+8*Math.sqrt(2)))<1e-10);
  const cubic=(x)=>2*x**3+5*x**2-4*x-3;
  for(const root of [-3,-.5,1])assert.equal(cubic(root),0);
  assert.equal(cubic(-2),9); assert.ok(Math.abs(cubic(1/3)+100/27)<1e-12);
  check(1,"6b",round(Math.exp(.75)+Math.exp(-.75)-2,4));
  const pop=(t)=>1.1e6*Math.exp(.1*t);
  check(1,"7b",round(pop(5)));check(1,"7c",round(pop(6)-pop(5)));
  const equality=Math.log(3.9/1.1)/.15;check(1,"7e",2010+Math.floor(equality));
  check(1,"7f",round(3.9e6*(1-Math.exp(-.75))/.75));check(1,"7g",round(-195000*Math.exp(-.4)));
  check(1,"8bii",Number((100*(1.2175**(1/12)-1)).toPrecision(3)));
  const rows=[];let balance=5000;
  for(let month=1;month<=3;month++){const interest=round(balance*.0165,2), reduction=round(125-interest,2);balance=round(balance-reduction,2);rows.push([125,interest,reduction,balance]);}
  assert.deepEqual(rows,[[125,82.5,42.5,4957.5],[125,81.8,43.2,4914.3],[125,81.09,43.91,4870.39]]);
  check(1,"8biv",round(-Math.log(1-5000*.0165/125)/Math.log(1.0165)));
  const i=1.085**(1/52)-1;
  // Direct discounted sum, independent of the amortisation closed form.
  const weekly=5000/Array.from({length:156},(_,j)=>(1+i)**-(j+1)).reduce((a,b)=>a+b);
  check(1,"8bv",round(weekly,2));assert.equal(round(66*125-156*round(weekly,2),2),2609.04);
  for(const c of [.5,2*Math.PI/(12+34/60)]){
    const theta=Math.acos(16/19);
    const clock=[(2*Math.PI-theta)/c+2,(2*Math.PI+theta)/c+2].flatMap((hours)=>{const minutes=round(hours*60);return [Math.floor(minutes/60),minutes%60];});
    check(1,"9c",clock.join(", "));
  }
});

test("2017 Paper 2 checks phone-event enumeration, regression, geometry and conditional probabilities independently", () => {
  const round=(x,dp=0)=>Number(x.toFixed(dp));
  let fourthOnSeventh=0, fixedSequence=0;
  for(let mask=0;mask<128;mask++){
    const answers=Array.from({length:7},(_,i)=>(mask>>i)&1);
    const count=answers.reduce((a,b)=>a+b), probability=.2**count*.8**(7-count);
    if(answers.slice(0,6).reduce((a,b)=>a+b)===3 && answers[6])fourthOnSeventh+=probability;
    if(answers.join("")==="0101010")fixedSequence+=probability;
  }
  check(2,"1a",fixedSequence);check(2,"1b",fourthOnSeventh);
  assert.ok(1-.8**20<=.99 && 1-.8**21>.99);
  const X=[40,48,56,64,88,96,112],Y=[21,16,18,16,13,11,9];
  const avg=(a)=>a.reduce((x,y)=>x+y)/a.length, mx=avg(X),my=avg(Y);
  const xy=X.reduce((sum,x,i)=>sum+(x-mx)*(Y[i]-my),0),xx=X.reduce((sum,x)=>sum+(x-mx)**2,0),yy=Y.reduce((sum,y)=>sum+(y-my)**2,0);
  check(2,"2a",round(xy/Math.sqrt(xx*yy),3));
  assert.ok(Math.abs(xy/xx+.14705882352941177)<1e-12);
  check(2,"2di",round(60*(260/96-260/112)));check(2,"2dii",round(260*(1/9-1/11)*1.329,2));
  const circle=part(2,"4a").answerCheck;
  for(const [x,y] of [[0,0],[6.5,0],[10,7]]) assert.ok(Math.abs((x-circle.centreX)**2+(y-circle.centreY)**2-circle.radiusSquared)<1e-12);
  check(2,"4b",round(Math.acos(84/Math.sqrt(61.25*149))*180/Math.PI,2));
  check(2,"5b",Math.hypot(12,5)*12/5);
  // Area from quadrilateral vertices G,C,D,E, rather than subtracting triangles.
  const points=[[15,36],[31.2,36],[31.2,0],[60/13,144/13]];
  const twiceArea=points.reduce((sum,[x,y],j)=>{const [nx,ny]=points[(j+1)%points.length];return sum+x*ny-y*nx;},0);
  check(2,"5d",Math.abs(twiceArea)/2);
  check(2,"6a",round(Math.sqrt(.214*(2*6371+.214))));
  check(2,"6b",round(2*Math.PI*6371*Math.cos(53*Math.PI/180)));
  // Spherical-cap integral of π(2Rh − h²), R=12, h from zero to six.
  assert.equal(12*6**2-6**3/3,360);
  const outcomes=[1/3*1/2*1/2,1/3*1/2*1/2,1/3*1/2*1/5,1/3*1/2*4/5,2/3*1/4*1/5,2/3*1/4*4/5,2/3*3/4*1/8,2/3*3/4*7/8];
  assert.ok(Math.abs(outcomes.reduce((a,b)=>a+b)-1)<1e-12);
  const late=outcomes[0]+outcomes[2]+outcomes[4]+outcomes[6];check(2,"8bii",late);check(2,"8biii",(outcomes[0]+outcomes[2])/late);
  const width=Math.sqrt(225/8),height=Math.sqrt(3)*width;
  assert.ok(Math.abs(Math.sqrt(225+width**2)*Math.tan(Math.PI/6)-height)<1e-12);
  check(2,"9c",round(width,1));check(2,"9d",round(height,1));
  const angle=Math.acos(width/height)*180/Math.PI;
  assert.equal(round(angle,1),54.7);assert.equal(round(Math.acos(5.3/9.2)*180/Math.PI,1),54.8);
  check(2,"9f",round(2*angle/360*100,1));
});

test("new 2017 method records coexist with earlier papers and retain repeated history", async () => {
  const { readMethodAttempts, saveMethodAttempts, paperMethodProgress } = await load("src/utils/methodAttempts.ts");
  const previous = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  const storage = new Map();
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: (k) => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v) } });
  try {
    const attempts = Array.from({ length: 14 }, (_, i) => ({
      id: `2017-repeat-${i}`, partId: i === 0 ? "lc-hl-2018-normal-p1-1a" : `lc-hl-2017-normal-p${i % 2 + 1}-1a`,
      attemptedAt: new Date(Date.UTC(2026, 10, i + 1)).toISOString(),
      createdAt: new Date(Date.UTC(2026, 10, i + 1)).toISOString(), updatedAt: new Date(Date.UTC(2026, 10, i + 1)).toISOString(),
      methodScore: i < 7 ? 2 : 4, scaleVersion: "easy-maths-five-levels-v1", earnedMarks: null, maximumMarks: null, note: null,
    }));
    assert.equal(saveMethodAttempts(attempts), true);
    assert.deepEqual(readMethodAttempts(), attempts);
    assert.deepEqual(paperMethodProgress(readMethodAttempts()), { attempts: 14, parts: 3, improved: 2, independent: 2 });
  } finally {
    if (previous) Object.defineProperty(globalThis, "localStorage", previous);
    else delete globalThis.localStorage;
  }
});

test("2017 normal calculations use the correct tail and sample-mean standard error",()=>{
  const cdf=(z)=>{
    const a=-8,n=20000,h=(z-a)/n,density=(x)=>Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);
    let sum=density(a)+density(z);
    for(let i=1;i<n;i++)sum+=(i%2?4:2)*density(a+i*h);
    return sum*h/3;
  };
  check(2,"8ai",(1-cdf((50-63.5)/10))*100);
  assert.ok(Math.abs(cdf((85.2-63.5)/10)-.985)<.00001);
  const z=(62-63.5)/(10/Math.sqrt(150));
  assert.ok(z>-1.96 && z<1.96);
  assert.ok(Math.abs(2*cdf(z)-.06619258)<.00001);
});
