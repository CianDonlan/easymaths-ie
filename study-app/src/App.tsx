import QuadraticsPilot from "./features/quadraticsPilot/QuadraticsPilot";
import { Paper2017P1Visuals, Paper2017P2Visuals } from "./components/Paper2017Visuals";
import { Paper2018P1Visuals, Paper2018P2Visuals } from "./components/Paper2018Visuals";
import { Paper2019P1Visuals, Paper2019P2Visuals } from "./components/Paper2019Visuals";
import { useEffect, useMemo, useState } from "react";
import { EquationBuilder } from "./components/EquationBuilder";
import { FinalAnswerCheck } from "./components/FinalAnswerCheck";
import { BookPaper } from "./components/BookPaper";
import { MethodAttemptLog } from "./components/MethodAttemptLog";
import { GGraph } from "./components/GGraph";
import { SelfCheckAnswer } from "./components/SelfCheckAnswer";
import { WebOrbitals, WebStageTable } from "./components/WebVisuals";
import { KayakGraphChoices, KayakRoute } from "./components/KayakVisuals";
import { SpeedGraphPad, SpeedTable } from "./components/SpeedVisuals";
import { DotPatternGrid } from "./components/DotPattern";
import { InverseGraphPad } from "./components/InverseGraphPad";
import { SurveyVenn } from "./components/SurveyVenn";
import { AgeFrequencyTable, AgeList, CountrySampleTable, MarkProportionTable, ScoreDistribution } from "./components/StatisticsVisuals";
import { CongruentTrianglesDiagram, EnlargementDiagram } from "./components/GeometryVisuals";
import { CosineTriangle, OverlappingCircles, SineGraph, SubmarineDiagram } from "./components/Paper2Visuals";
import { FlagpoleDiagram, PyramidDiagram, PyramidNetPad, TowerDiagram } from "./components/Paper2Question8Visuals";
import { DiabetesTestTree } from "./components/ProbabilityTree";
import { Argand2024Pad, PlantLogoDiagram, ScarfGraphChoices, SphereCapDiagram, TangentEstimateGraph, TshirtSalesGraphPad } from "./components/Paper2024Visuals";
import { PrizeProbabilityTable, SwimRetestData, SwimStemLeafPlot } from "./components/Paper2024P2Visuals";
import { CentroidConstructionPad, CircleLocusDiagram, LatticePointsDiagram, NestedCirclesDiagram, ParallelTransversalsDiagram } from "./components/Paper2024P2GeometryVisuals";
import { CylinderInSphereDiagram, DoubleConeSphereDiagram, HotelBookingTree, HotelNormalCurve, OpenCylinderNetDiagram } from "./components/Paper2024P2Question78Visuals";
import { AdventureCourseDiagram } from "./components/Paper2024P2Question9Visuals";
import { WiperDiagram } from "./components/Paper2024P2Question10Visuals";
import { Paper2023P1GraphPad } from "./components/Paper2023P1GraphPad";
import { Argand2023Diagram, FunctionMaps2023Diagram } from "./components/Paper2023P1Question45Visuals";
import { BetweenCurves2023Diagram, CurvatureChoices2023Diagram } from "./components/Paper2023P1Question67Visuals";
import { TicketPrices2023Table } from "./components/Paper2023P1Question8Visuals";
import { FactorCurve2023Pad, FactorPairs2023Table, TangentTriangle2023Diagram } from "./components/Paper2023P1Question9Visuals";
import { PyramidSection2023Diagram, RectangleCover2023Diagram } from "./components/Paper2023P1Question10Visuals";
import { Spinner2023Diagram } from "./components/Paper2023P2Question1Visuals";
import { CirclePoints2023Diagram, CubeTrials2023Table, Cuboid2023Diagram } from "./components/Paper2023P2Question45Visuals";
import { Breathing2023Graph, HillHeight2023Diagram, RectangleAngles2023Diagram, RoadGradient2023Diagram } from "./components/Paper2023P2Question67Visuals";
import { WordGameTree2023Pad, WordScoreNormal2023Diagram } from "./components/Paper2023P2Question8Visuals";
import { ArrowheadTile2023Diagram, SquareHexTiles2023Diagram, UnitCirclePair2023Diagram } from "./components/Paper2023P2Question9Visuals";
import { IntegralRegions2022Diagram, ComplexCircle2022Diagram, DerivativeGraph2022Diagram, HeartRate2022Graph, FerrisWheel2022Diagram, FerrisAxes2022Diagram } from "./components/Paper2022P1Visuals";
import { Paper2020P1Visuals, Paper2020P2Visuals } from "./components/Paper2020Visuals";
import { Paper2021P2Visuals } from "./components/Paper2021P2Visuals";
import { Paper2021P1Visuals } from "./components/Paper2021Visuals";
import { Paper2022P2Visuals } from "./components/Paper2022P2Visuals";
import { Basin2023Diagram } from "./components/Paper2023P2Question10Visuals";
import { findPaper, papers } from "./data/papers";
import { bookPapers, findRealPaper, realPapers } from "./data/realCatalogue";
import { parseRoutePath, type Route } from "./utils/parseRoute";
import {
  createEmptyProgress,
  MAX_SAVED_ATTEMPTS,
  parseProgress,
  STORAGE_KEY,
} from "./utils/progress";
import type { Progress } from "./utils/progress";
import type {
  AnswerAttemptState,
  AnswerCheckOutcome,
  StudyPaper,
  StudyQuestion,
} from "./types";

const emptyAnswerAttemptState: AnswerAttemptState = {
  draft: "",
  history: [],
  totalAttempts: 0,
};

function parseRoute(): Route {
  return parseRoutePath(window.location.hash.replace(/^#/, "") || "/");
}

function readProgress(): Progress {
  try {
    return parseProgress(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return createEmptyProgress();
  }
}

function questionKey(paperId: string, questionId: string) {
  return `${paperId}:${questionId}`;
}

function questionPath(paperId: string, questionId: string) {
  if (findRealPaper(paperId)) return `/book/${paperId}/parts/${questionId}`;
  return `/papers/${paperId}/questions/${questionId}`;
}

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function recordQuestionVisit(current: Progress, route: Route): Progress {
  if (route.screen !== "question") return current;

  const paper = findPaper(route.paperId);
  if (!paper?.questions.some((question) => question.id === route.questionId)) return current;

  const key = questionKey(route.paperId, route.questionId);
  const path = questionPath(route.paperId, route.questionId);
  if (current.lastPath === path && current.viewed.includes(key)) return current;

  return {
    ...current,
    lastPath: path,
    viewed: current.viewed.includes(key) ? current.viewed : [...current.viewed, key],
  };
}

function App() {
  const [route, setRoute] = useState<Route>(parseRoute);
  const [progress, setProgress] = useState<Progress>(() =>
    recordQuestionVisit(readProgress(), parseRoute()),
  );

  useEffect(() => {
    const handleHashChange = () => {
      const nextRoute = parseRoute();
      setRoute(nextRoute);
      setProgress((current) => recordQuestionVisit(current, nextRoute));
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  let content;
  if (route.screen === "home") {
    content = <HomeScreen progress={progress} />;
  } else if (route.screen === "quadratics-pilot") {
    content = <QuadraticsPilot />;
  } else if (route.screen === "papers") {
    content = <PapersScreen progress={progress} />;
  } else if (route.screen === "book") {
    content = <BookPaper key={`${route.paperId}:${route.partId ?? "index"}`} paperId={route.paperId} partId={route.partId} />;
  } else if (route.screen === "question") {
    const paper = findPaper(route.paperId);
    const question = paper?.questions.find((item) => item.id === route.questionId);
    if (paper && question) {
      const key = questionKey(paper.id, question.id);
      content = (
        <QuestionScreen
          paper={paper}
          question={question}
          progress={progress}
          onAnswerChange={(draft) =>
            setProgress((current) => {
              const existing = current.answerAttempts[key] ?? emptyAnswerAttemptState;
              return {
                ...current,
                answerAttempts: {
                  ...current.answerAttempts,
                  [key]: { ...existing, draft, outcome: undefined },
                },
              };
            })
          }
          onCheckAnswer={(outcome, answer) =>
            setProgress((current) => {
              const existing = current.answerAttempts[key] ?? emptyAnswerAttemptState;
              const history = [
                ...existing.history,
                { answer: answer.trim(), outcome },
              ].slice(-MAX_SAVED_ATTEMPTS);
              return {
                ...current,
                answerAttempts: {
                  ...current.answerAttempts,
                  [key]: {
                    draft: answer,
                    outcome,
                    history,
                    totalAttempts: existing.totalAttempts + 1,
                  },
                },
              };
            })
          }
          onToggleAnswer={() =>
            setProgress((current) => ({
              ...current,
              answers: toggleValue(current.answers, key),
            }))
          }
          onToggleSolution={() =>
            setProgress((current) => ({
              ...current,
              solutions: toggleValue(current.solutions, key),
            }))
          }
        />
      );
    } else {
      content = <NotFound />;
    }
  } else {
    content = <NotFound />;
  }

  return (
    <div className="app-shell">
      <Header />
      <main>{content}</main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#/" aria-label="Easy Maths home">
          <span className="brand-wordmark">EASY MATHS<span>.IE</span></span>
        </a>
        <div className="header-actions">
          <span className="prototype-badge">Early prototype</span>
          <a className="nav-link" href="#/pilot/quadratics">Level 3 pilot</a>
          <a className="nav-link" href="#/papers">Papers</a>
        </div>
      </div>
    </header>
  );
}

function HomeScreen({ progress }: { progress: Progress }) {
  const continuePath = progress.lastPath ? `#${progress.lastPath}` : "#/papers";

  return (
    <div className="home-page">
      <section className="hero page-width">
        <div className="hero-copy">
          <span className="eyebrow">Leaving Certificate · Higher Level</span>
          <h1>Maths.<br />One step<br /><span>at a time.</span></h1>
          <p className="hero-description">
            Practise exam-style questions, check your answer and understand each step—without the clutter.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#/book/lc-hl-2025-normal-p1">Study 2025 Paper 1 <span aria-hidden="true">→</span></a>
            <a className="button button-secondary" href={continuePath}>
              {progress.lastPath ? "Continue sample" : "Try sample questions"}
              <span aria-hidden="true">→</span>
            </a>
            <a className="button button-secondary" href="#/papers">Browse papers</a>
          </div>
          <p className="small-note">No account needed · Practice saved on this device only</p>
        </div>

        <div className="hero-preview" aria-label="Example study question preview">
          <div className="preview-topline">
            <span>Paper 1</span>
            <span>Question 2 of 4</span>
          </div>
          <div className="preview-progress"><span /></div>
          <div className="preview-meta">
            <span className="topic-chip">Calculus</span>
            <span>10 marks</span>
          </div>
          <p className="preview-label">QUESTION 2 (A)</p>
          <p className="preview-question">Let f(x) = x³ − 4x² + 2x + 1.<br />Find f′(2).</p>
          <div className="preview-button">Show answer <span>＋</span></div>
          <div className="preview-footer">
            <span>← Previous</span>
            <strong>Next question →</strong>
          </div>
        </div>
      </section>

      <a className="pilot-launch page-width" href="#/pilot/quadratics"><div><span className="eyebrow">New · Level 3 pilot</span><strong>Try notes & help for quadratics</strong><p>Six questions, two method notes and worked examples. Open the standalone test space.</p></div><span aria-hidden="true">→</span></a>
      <section className="principles page-width" aria-label="How the app helps">
        <article>
          <span className="principle-number">01</span>
          <div><h2>Real practice</h2><p>Short, focused sessions built around exam-style questions.</p></div>
        </article>
        <article>
          <span className="principle-number">02</span>
          <div><h2>Clear solutions</h2><p>Reveal the answer first, then work through each step.</p></div>
        </article>
        <article>
          <span className="principle-number">03</span>
          <div><h2>Visible progress</h2><p>Pick up where you left off and keep moving forward.</p></div>
        </article>
      </section>
    </div>
  );
}

function PapersScreen({ progress }: { progress: Progress }) {
  return (
    <div className="papers-page page-width">
      <a className="back-link" href="#/">← Home</a>
      <div className="page-heading">
        <div>
          <span className="eyebrow">Practice library</span>
          <h1>Choose a paper</h1>
          <p>Work through a real paper with your Edco book, or try the original sample questions.</p>
        </div>
        <div className="corpus-note">
          <strong>75</strong>
          <span>official paper PDFs<br />saved for later</span>
        </div>
      </div>

      {progress.lastPath && (
        <a className="continue-card" href={`#${progress.lastPath}`}>
          <div>
            <span className="continue-label">CONTINUE YOUR LAST SESSION</span>
            <strong>Pick up where you left off</strong>
          </div>
          <span className="continue-arrow" aria-hidden="true">→</span>
        </a>
      )}

      <div className="section-heading"><h2>Real papers</h2><span>{realPapers.length} papers available</span></div>
      <div className="paper-grid real-paper-grid">
        {realPapers.map((paper) => {
          const catalogue = bookPapers.find((item) => item.id === paper.id);
          return <article className="paper-card book-paper-card" key={paper.id}>
            <div className="paper-card-top"><span className="paper-number">P{paper.paperNumber}</span><span className="sample-label">REAL PAPER</span></div>
            <p className="paper-year">{paper.year} · Normal sitting</p>
            <h3>Higher Level<br />Paper {paper.paperNumber}</h3>
            <p>{paper.description}</p>
            <div className="paper-stats"><span>{catalogue?.questions.length ?? 0} questions · {catalogue?.parts.length ?? 0} parts</span><span>{paper.questions.length} parts ready onscreen</span></div>
            <a className="paper-action" href={`#/book/${paper.id}`}>Open real paper <span aria-hidden="true">→</span></a>
          </article>;
        })}
      </div>

      <div className="section-heading">
        <h2>Practice papers</h2>
        <span>{papers.length} available</span>
      </div>
      <div className="paper-grid">
        {papers.map((paper) => {
          const viewedCount = paper.questions.filter((question) =>
            progress.viewed.includes(questionKey(paper.id, question.id)),
          ).length;
          const percent = Math.round((viewedCount / paper.questions.length) * 100);
          return (
            <article className="paper-card" key={paper.id}>
              <div className="paper-card-top">
                <span className="paper-number">P{paper.paperNumber}</span>
                <span className="sample-label">SAMPLE CONTENT</span>
              </div>
              <p className="paper-year">{paper.year}</p>
              <h3>Higher Level<br />Paper {paper.paperNumber}</h3>
              <p>{paper.description}</p>
              <div className="paper-stats">
                <span>{paper.questions.length} questions</span>
                <span>≈ {paper.estimatedMinutes} min</span>
              </div>
              {viewedCount > 0 && (
                <div className="paper-progress" aria-label={`${percent}% viewed`}>
                  <span style={{ width: `${percent}%` }} />
                </div>
              )}
              <a
                className="paper-action"
                href={`#${questionPath(paper.id, paper.questions[0].id)}`}
              >
                {viewedCount ? "Keep studying" : "Open paper"} <span aria-hidden="true">→</span>
              </a>
            </article>
          );
        })}
      </div>
      <p className="content-disclaimer">
        Prototype questions are original examples and are not transcribed from the official SEC papers.
      </p>
    </div>
  );
}

interface QuestionScreenProps {
  paper: StudyPaper;
  question: StudyQuestion;
  progress: Progress;
  onAnswerChange: (answer: string) => void;
  onCheckAnswer: (outcome: AnswerCheckOutcome, answer: string) => void;
  onToggleAnswer: () => void;
  onToggleSolution: () => void;
}

function QuestionScreen({
  paper,
  question,
  progress,
  onAnswerChange,
  onCheckAnswer,
  onToggleAnswer,
  onToggleSolution,
}: QuestionScreenProps) {
  const index = paper.questions.findIndex((item) => item.id === question.id);
  const previous = paper.questions[index - 1];
  const next = paper.questions[index + 1];
  const key = questionKey(paper.id, question.id);
  const answerVisible = progress.answers.includes(key);
  const solutionVisible = progress.solutions.includes(key);
  const answerAttempt = progress.answerAttempts[key] ?? emptyAnswerAttemptState;
  const completed = useMemo(
    () => paper.questions.filter((item) => progress.viewed.includes(questionKey(paper.id, item.id))).length,
    [paper, progress.viewed],
  );

  return (
    <div className="study-page page-width">
      <div className="study-breadcrumbs">
        <a href={paper.kind === "real" ? `#/book/${paper.id}` : "#/papers"}>{paper.kind === "real" ? `← ${paper.year} Paper ${paper.paperNumber}` : "← All papers"}</a>
        <span>{paper.year} · Higher Level · Paper {paper.paperNumber}</span>
      </div>

      <div className="study-layout">
        <aside className="question-sidebar">
          <div className="sidebar-heading">
            <span>YOUR SESSION</span>
            <strong>{completed}/{paper.questions.length} viewed</strong>
          </div>
          <div className="sidebar-progress"><span style={{ width: `${(completed / paper.questions.length) * 100}%` }} /></div>
          <nav aria-label="Questions">
            {paper.questions.map((item, itemIndex) => {
              const itemKey = questionKey(paper.id, item.id);
              const isViewed = progress.viewed.includes(itemKey);
              const isCurrent = item.id === question.id;
              return (
                <a
                  key={item.id}
                  className={`question-nav-item${isCurrent ? " current" : ""}`}
                  href={`#${questionPath(paper.id, item.id)}`}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  <span className="nav-number">{isViewed && !isCurrent ? "✓" : itemIndex + 1}</span>
                  <span><strong>Question {item.number}</strong><small>{item.topic}</small></span>
                </a>
              );
            })}
          </nav>
        </aside>

        <section className="question-panel">
          <div className="mobile-session-line">
            <span>Question {index + 1} of {paper.questions.length}</span>
            <div><span style={{ width: `${((index + 1) / paper.questions.length) * 100}%` }} /></div>
          </div>
          <div className="question-meta">
            <span className="topic-chip">{question.topic}</span>
            <span>{question.marks === null ? "Part marks unverified" : `${question.marks} marks`}</span>
          </div>
          <div className="question-copy">
            <span className="question-kicker">QUESTION {question.number}</span>
            <h1>{question.prompt}</h1>
            {question.expression && <div className="study-expression">{question.expression}</div>}
            {question.illustration === "g-graph" && <GGraph />}
            {question.illustration === "web-table" && <WebStageTable />}
            {question.illustration === "web-orbitals" && <WebOrbitals />}
            {question.illustration === "kayak-route" && <KayakRoute />}
            {question.illustration === "kayak-graphs" && <KayakGraphChoices />}
            {question.illustration === "speed-table" && <SpeedTable />}
            {question.illustration === "speed-plot" && <SpeedGraphPad />}
            {question.illustration === "dot-pattern" && <DotPatternGrid />}
            {question.illustration === "inverse-graph" && <InverseGraphPad />}
            {question.illustration === "survey-venn" && <SurveyVenn />}
            {question.illustration === "ages-row" && <AgeList />}
            {question.illustration === "age-frequencies" && <AgeFrequencyTable />}
            {question.illustration === "congruent-triangles" && <CongruentTrianglesDiagram />}
            {question.illustration === "enlargement" && <EnlargementDiagram />}
            {question.illustration === "enlargement-shaded" && <EnlargementDiagram shaded />}
            {question.illustration === "sine-graph" && <SineGraph />}
            {question.illustration === "cosine-triangle" && <CosineTriangle />}
            {question.illustration === "submarine-scale" && <SubmarineDiagram />}
            {question.illustration === "submarine-algebra" && <SubmarineDiagram algebra />}
            {question.illustration === "overlapping-circles" && <OverlappingCircles />}
            {question.illustration === "pyramid-roof" && <PyramidDiagram />}
            {question.illustration === "pyramid-net" && <PyramidNetPad />}
            {question.illustration === "flagpole-angle" && <FlagpoleDiagram />}
            {question.illustration === "tower-angles" && <TowerDiagram />}
            {question.illustration === "diabetes-tree" && <DiabetesTestTree />}
            {question.illustration === "score-bell" && <ScoreDistribution />}
            {question.illustration === "country-samples" && <CountrySampleTable />}
            {question.illustration === "mark-proportions" && <MarkProportionTable />}
            {question.illustration === "argand-2024" && <Argand2024Pad />}
            {question.illustration === "tangent-graph-2024" && <TangentEstimateGraph />}
            {question.illustration === "tshirt-graph-2024" && <TshirtSalesGraphPad />}
            {question.illustration === "scarf-choices-2024" && <ScarfGraphChoices />}
            {question.illustration === "sphere-cap-2024" && <SphereCapDiagram />}
            {question.illustration === "plant-logo-2024" && <PlantLogoDiagram />}
            {question.illustration === "swim-stem-leaf-2024" && <SwimStemLeafPlot />}
            {question.illustration === "swim-retest-2024" && <SwimRetestData />}
            {question.illustration === "prize-table-2024" && <PrizeProbabilityTable />}
            {question.illustration === "centroid-pad-2024" && <CentroidConstructionPad />}
            {question.illustration === "parallel-transversals-2024" && <ParallelTransversalsDiagram />}
            {question.illustration === "nested-circles-2024" && <NestedCirclesDiagram />}
            {question.illustration === "circle-locus-2024" && <CircleLocusDiagram />}
            {question.illustration === "lattice-points-2024" && <LatticePointsDiagram />}
            {question.illustration === "hotel-normal-2024" && <HotelNormalCurve />}
            {question.illustration === "hotel-booking-tree-2024" && <HotelBookingTree />}
            {question.illustration === "open-cylinder-net-2024" && <OpenCylinderNetDiagram />}
            {question.illustration === "cylinder-in-sphere-2024" && <CylinderInSphereDiagram />}
            {question.illustration === "double-cone-sphere-2024" && <DoubleConeSphereDiagram />}
            {question.illustration === "adventure-course-2024" && <AdventureCourseDiagram />}
            {question.illustration === "wiper-original-2024" && <WiperDiagram />}
            {question.illustration === "wiper-adjusted-2024" && <WiperDiagram adjusted />}
            {question.illustration === "graph-down-2023" && <Paper2023P1GraphPad shift="down" />}
            {question.illustration === "graph-left-2023" && <Paper2023P1GraphPad shift="left" />}
            {question.illustration === "argand-2023" && <Argand2023Diagram />}
            {question.illustration === "argand-pad-2023" && <Argand2023Diagram interactive />}
            {question.illustration === "function-maps-2023" && <FunctionMaps2023Diagram />}
            {question.illustration === "between-curves-2023" && <BetweenCurves2023Diagram />}
            {question.illustration === "curvature-choices-2023" && <CurvatureChoices2023Diagram />}
            {question.illustration === "ticket-prices-2023" && <TicketPrices2023Table />}
            {question.illustration === "factor-pairs-table-2023" && <FactorPairs2023Table />}
            {question.illustration === "factor-points-2023" && <FactorCurve2023Pad mode="points" />}
            {question.illustration === "factor-curve-2023" && <FactorCurve2023Pad mode="curve" />}
            {question.illustration === "tangent-triangle-2023" && <TangentTriangle2023Diagram />}
            {question.illustration === "rectangle-cover-2023" && <RectangleCover2023Diagram />}
            {question.illustration === "rectangle-cover-pad-2023" && <RectangleCover2023Diagram interactive />}
            {question.illustration === "pyramid-section-2023" && <PyramidSection2023Diagram />}
            {question.illustration === "spinner-2023" && <Spinner2023Diagram />}
            {question.illustration === "circle-points-2023" && <CirclePoints2023Diagram />}
            {question.illustration === "cube-trials-2023" && <CubeTrials2023Table />}
            {question.illustration === "cuboid-2023" && <Cuboid2023Diagram />}
            {question.illustration === "rectangle-angles-2023" && <RectangleAngles2023Diagram />}
            {question.illustration === "road-gradient-2023" && <RoadGradient2023Diagram />}
            {question.illustration === "hill-height-2023" && <HillHeight2023Diagram />}
            {question.illustration === "breathing-2023-graph" && <Breathing2023Graph />}
            {question.illustration === "word-score-normal-2023" && <WordScoreNormal2023Diagram />}
            {question.illustration === "word-game-tree-pad-2023" && <WordGameTree2023Pad />}
            {question.illustration === "word-game-tree-complete-2023" && <WordGameTree2023Pad completed />}
            {question.illustration === "square-hex-tiles-2023" && <SquareHexTiles2023Diagram />}
            {question.illustration === "arrowhead-tile-2023" && <ArrowheadTile2023Diagram />}
            {question.illustration === "unit-circle-pair-2023" && <UnitCirclePair2023Diagram />}
            {question.illustration === "basin-2023" && <Basin2023Diagram />}
            {question.illustration === "integral-regions-2022" && <IntegralRegions2022Diagram />}
            {question.illustration === "complex-circle-2022" && <ComplexCircle2022Diagram />}
            {question.illustration === "derivative-graph-2022" && <DerivativeGraph2022Diagram />}
            {question.illustration === "heart-rate-2022" && <HeartRate2022Graph />}
            {question.illustration === "ferris-table-2022" && <FerrisWheel2022Diagram table />}
            {question.illustration === "ferris-axes-2022" && <FerrisAxes2022Diagram />}
            {question.illustration?.startsWith("p2-2022-") && <Paper2022P2Visuals kind={question.illustration} />}
            {question.illustration?.startsWith("p1-2021-") && <Paper2021P1Visuals kind={question.illustration} />}
            {question.illustration?.startsWith("p2-2021-") && <Paper2021P2Visuals kind={question.illustration} />}
            {question.illustration?.startsWith("p1-2017-") && <Paper2017P1Visuals kind={question.illustration} />}
            {question.illustration?.startsWith("p2-2017-") && <Paper2017P2Visuals kind={question.illustration} />}
            {question.illustration?.startsWith("p1-2018-") && <Paper2018P1Visuals kind={question.illustration} />}
            {question.illustration?.startsWith("p2-2018-") && <Paper2018P2Visuals kind={question.illustration} />}
            {question.illustration?.startsWith("p1-2019-") && <Paper2019P1Visuals kind={question.illustration} />}
            {question.illustration?.startsWith("p2-2019-") && <Paper2019P2Visuals kind={question.illustration} />}
            {question.illustration?.startsWith("p1-2020-") && <Paper2020P1Visuals kind={question.illustration} />}
            {question.illustration?.startsWith("p2-2020-") && <Paper2020P2Visuals kind={question.illustration} />}
          </div>

          {question.answerCheck && (
            <FinalAnswerCheck
              key={key}
              config={question.answerCheck}
              answer={answerAttempt.draft}
              outcome={answerAttempt.outcome}
              history={answerAttempt.history}
              totalAttempts={answerAttempt.totalAttempts}
              badge={paper.kind === "real" ? "Reviewed answer check" : undefined}
              onAnswerChange={onAnswerChange}
              onCheck={onCheckAnswer}
            />
          )}
          {question.selfCheck && <SelfCheckAnswer key={`self-check-${key}`} answer={answerAttempt.draft} placeholder={question.selfCheck.placeholder} checks={question.selfCheck.checks} onAnswerChange={onAnswerChange} onShowSolution={() => { if (!solutionVisible) onToggleSolution(); }} />}

          <details className="workings-disclosure" key={`workings-${key}`}>
            <summary>
              <span className="workings-summary-icon" aria-hidden="true">∑</span>
              <span className="workings-summary-copy">
                <strong>Workings pad</strong>
                <small>Optional space to build your method step by step</small>
              </span>
              <span className="workings-summary-action" aria-hidden="true" />
            </summary>
            <EquationBuilder />
          </details>

          <div className="reveal-section">
            <button
              className="reveal-button"
              type="button"
              aria-expanded={answerVisible}
              aria-controls="answer-panel"
              onClick={onToggleAnswer}
            >
              <span><span className="reveal-icon" aria-hidden="true">A</span>{answerVisible ? "Hide answer" : "Show answer"}</span>
              <span aria-hidden="true">{answerVisible ? "−" : "+"}</span>
            </button>
            {answerVisible && (
              <div className="answer-panel" id="answer-panel">
                <span>ANSWER</span>
                <strong>{question.answer}</strong>
              </div>
            )}

            <button
              className="reveal-button"
              type="button"
              aria-expanded={solutionVisible}
              aria-controls="solution-panel"
              onClick={onToggleSolution}
            >
              <span><span className="reveal-icon solution-icon" aria-hidden="true">↳</span>{solutionVisible ? "Hide worked solution" : "Show worked solution"}</span>
              <span aria-hidden="true">{solutionVisible ? "−" : "+"}</span>
            </button>
            {solutionVisible && (
              <div className="solution-panel" id="solution-panel">
                <span>WORKED SOLUTION</span>
                <p>{question.solution}</p>
              </div>
            )}
          </div>

          {paper.kind === "real" && <MethodAttemptLog key={`method-${key}`} partId={question.id} />}

          <div className="question-controls">
            {previous ? (
              <a className="previous-question" href={`#${questionPath(paper.id, previous.id)}`}>← Previous</a>
            ) : <span />}
            {next ? (
              <a className="button button-primary" href={`#${questionPath(paper.id, next.id)}`}>Next question <span>→</span></a>
            ) : (
              <a className="button button-primary" href={paper.kind === "real" ? `#/book/${paper.id}` : "#/papers"}>{paper.kind === "real" ? "All paper parts" : "Finish paper"} <span>✓</span></a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <section className="not-found page-width">
      <span className="eyebrow">404</span>
      <h1>That question isn’t here.</h1>
      <p>The link may be old, or this paper may not have been added yet.</p>
      <a className="button button-primary" href="#/papers">Back to papers <span>→</span></a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width">
        <span>EasyMaths.ie · Early product prototype</span>
        <span>Built to learn what helps students study.</span>
      </div>
    </footer>
  );
}

export default App;
