import { Fragment, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";

interface EquationToken {
  id: string;
  value: string;
}

type DragItem =
  | { type: "palette"; value: string }
  | { type: "answer"; id: string; value: string };

interface DragState {
  item: DragItem;
  x: number;
  y: number;
  targetIndex: number | null;
  overRemove: boolean;
}

interface PendingDrag {
  item: DragItem;
  pointerId: number;
  startX: number;
  startY: number;
}

const paletteGroups = [
  { label: "Numbers", values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ","] },
  { label: "Symbols", values: ["x", "y", "π", "+", "−", "×", "÷", "=", "(", ")", "²", "³", "√", "%"] },
];

const LINE_BREAK = "\n";
const operators = new Set(["+", "−", "×", "÷", "="]);
const superscripts = new Set(["²", "³"]);

function displayValue(value: string) {
  return value === LINE_BREAK ? "↵" : value;
}

function spokenValue(value: string) {
  return value === LINE_BREAK ? "new line" : value;
}

function tokenClass(value: string) {
  if (value === LINE_BREAK) return " is-line-break";
  if (operators.has(value)) return " is-operator";
  if (superscripts.has(value)) return " is-superscript";
  return "";
}

function dropTargetAt(x: number, y: number) {
  const target = document.elementFromPoint(x, y);
  const dropZone = target?.closest<HTMLElement>("[data-equation-drop-index]");
  const answerToken = target?.closest<HTMLElement>("[data-equation-token-index]");
  const answerBox = target?.closest<HTMLElement>("[data-equation-answer-length]");
  const removeZone = target?.closest<HTMLElement>("[data-equation-remove]");

  let targetIndex: number | null = null;
  if (dropZone) {
    targetIndex = Number(dropZone.dataset.equationDropIndex);
  } else if (answerToken) {
    const tokenIndex = Number(answerToken.dataset.equationTokenIndex);
    const bounds = answerToken.getBoundingClientRect();
    targetIndex = x < bounds.left + bounds.width / 2 ? tokenIndex : tokenIndex + 1;
  } else if (answerBox) {
    targetIndex = Number(answerBox.dataset.equationAnswerLength);
  }

  return {
    targetIndex,
    overRemove: Boolean(removeZone),
  };
}

export function EquationBuilder() {
  const [tokens, setTokens] = useState<EquationToken[]>([]);
  const [drag, setDrag] = useState<DragState | null>(null);
  const pendingDrag = useRef<PendingDrag | null>(null);
  const isDragging = useRef(false);
  const suppressClick = useRef(false);
  const tokenCounter = useRef(0);

  const createToken = (value: string): EquationToken => ({
    id: `equation-token-${tokenCounter.current++}`,
    value,
  });

  const appendToken = (value: string) => {
    setTokens((current) => [...current, createToken(value)]);
  };

  const removeToken = (id: string) => {
    setTokens((current) => current.filter((token) => token.id !== id));
  };

  const moveToken = (id: string, direction: -1 | 1) => {
    setTokens((current) => {
      const currentIndex = current.findIndex((token) => token.id === id);
      const nextIndex = currentIndex + direction;
      if (currentIndex < 0 || nextIndex < 0 || nextIndex >= current.length) return current;

      const next = [...current];
      [next[currentIndex], next[nextIndex]] = [next[nextIndex], next[currentIndex]];
      return next;
    });
  };

  const placeItem = (item: DragItem, targetIndex: number) => {
    setTokens((current) => {
      if (item.type === "palette") {
        const next = [...current];
        next.splice(targetIndex, 0, createToken(item.value));
        return next;
      }

      const sourceIndex = current.findIndex((token) => token.id === item.id);
      if (sourceIndex < 0) return current;

      const next = [...current];
      const [moved] = next.splice(sourceIndex, 1);
      const adjustedTarget = targetIndex > sourceIndex ? targetIndex - 1 : targetIndex;
      next.splice(adjustedTarget, 0, moved);
      return next;
    });
  };

  const beginPointerDrag = (event: ReactPointerEvent<HTMLElement>, item: DragItem) => {
    if (event.button !== 0) return;
    pendingDrag.current = {
      item,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
    isDragging.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const updatePointerDrag = (event: ReactPointerEvent<HTMLElement>) => {
    const pending = pendingDrag.current;
    if (!pending || pending.pointerId !== event.pointerId) return;

    const distance = Math.hypot(event.clientX - pending.startX, event.clientY - pending.startY);
    if (!isDragging.current && distance < 7) return;

    isDragging.current = true;
    event.preventDefault();
    const target = dropTargetAt(event.clientX, event.clientY);
    setDrag({ item: pending.item, x: event.clientX, y: event.clientY, ...target });
  };

  const finishPointerDrag = (event: ReactPointerEvent<HTMLElement>) => {
    const pending = pendingDrag.current;
    if (!pending || pending.pointerId !== event.pointerId) return;

    if (isDragging.current) {
      event.preventDefault();
      const target = dropTargetAt(event.clientX, event.clientY);
      if (target.overRemove && pending.item.type === "answer") {
        removeToken(pending.item.id);
      } else if (target.targetIndex !== null) {
        placeItem(pending.item, target.targetIndex);
      }
      suppressClick.current = true;
      window.setTimeout(() => {
        suppressClick.current = false;
      }, 0);
    }

    pendingDrag.current = null;
    isDragging.current = false;
    setDrag(null);
  };

  const cancelPointerDrag = () => {
    pendingDrag.current = null;
    isDragging.current = false;
    setDrag(null);
  };

  const handlePaletteClick = (value: string) => {
    if (suppressClick.current) return;
    appendToken(value);
  };

  const handleTokenKeyDown = (event: KeyboardEvent<HTMLElement>, token: EquationToken) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      removeToken(token.id);
    } else if (event.altKey && event.key === "ArrowLeft") {
      event.preventDefault();
      moveToken(token.id, -1);
    } else if (event.altKey && event.key === "ArrowRight") {
      event.preventDefault();
      moveToken(token.id, 1);
    }
  };

  const expression = tokens.map((token) => token.value).join("");
  const dragHandlers = {
    onPointerMove: updatePointerDrag,
    onPointerUp: finishPointerDrag,
    onPointerCancel: cancelPointerDrag,
  };

  return (
    <section className="equation-builder" aria-labelledby="equation-builder-title">
      <div className="equation-builder-heading">
        <div>
          <span className="equation-eyebrow">TRY IT YOURSELF</span>
          <h2 id="equation-builder-title">Build your workings</h2>
        </div>
        <span className="equation-experiment-label">No checking yet</span>
      </div>

      <div className="equation-workspace">
        <div className="equation-answer-column">
          <span className="equation-field-label">YOUR WORKINGS</span>
          <div
            className={`equation-answer-box${tokens.length === 0 ? " is-empty" : ""}${drag ? " is-dragging" : ""}`}
            aria-label={expression ? `Your equation: ${expression}` : "Your equation is empty"}
            data-equation-answer-length={tokens.length}
          >
            <span
              className={`equation-drop-zone${drag?.targetIndex === 0 ? " is-active" : ""}`}
              data-equation-drop-index="0"
              aria-hidden="true"
            />
            {tokens.length === 0 && (
              <span className="equation-placeholder">Build your equation here. Add a new line for each step.</span>
            )}
            {tokens.map((token, index) => (
              <Fragment key={token.id}>
                <span
                  className={`answer-token${tokenClass(token.value)}${drag?.item.type === "answer" && drag.item.id === token.id ? " is-dragged" : ""}`}
                  role="group"
                  tabIndex={0}
                  aria-label={`${spokenValue(token.value)}. Drag to move, press Delete to remove, or Alt and arrow keys to reorder.`}
                  data-equation-token-index={index}
                  onPointerDown={(event) => beginPointerDrag(event, { type: "answer", id: token.id, value: token.value })}
                  onKeyDown={(event) => handleTokenKeyDown(event, token)}
                  {...dragHandlers}
                >
                  <span aria-hidden="true">{displayValue(token.value)}</span>
                  <button
                    type="button"
                    className="answer-token-remove"
                    aria-label={`Remove ${spokenValue(token.value)}`}
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={() => removeToken(token.id)}
                  >
                    ×
                  </button>
                </span>
                <span
                  className={`equation-drop-zone${drag?.targetIndex === index + 1 ? " is-active" : ""}`}
                  data-equation-drop-index={index + 1}
                  aria-hidden="true"
                />
              </Fragment>
            ))}
          </div>

          <p className="equation-instructions">
            Tap to add, or drag notation into place. Add new lines to show each step clearly.
          </p>
          <div className="equation-actions">
            <button
              type="button"
              onClick={() => setTokens((current) => current.slice(0, -1))}
              disabled={tokens.length === 0}
            >
              ← Backspace
            </button>
            <button type="button" onClick={() => setTokens([])} disabled={tokens.length === 0}>
              Clear all
            </button>
          </div>
          <div
            className={`equation-remove-zone${drag?.overRemove ? " is-active" : ""}${drag?.item.type === "palette" ? " is-disabled" : ""}`}
            data-equation-remove
            aria-hidden={!drag}
          >
            Drag a tile here to remove it
          </div>
        </div>

        <div className="equation-palette" aria-label="Equation symbols">
          {paletteGroups.map((group) => (
            <div className="palette-group" key={group.label}>
              <span>{group.label}</span>
              <div>
                {group.values.map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={`Add ${value}`}
                    onClick={() => handlePaletteClick(value)}
                    onPointerDown={(event) => beginPointerDrag(event, { type: "palette", value })}
                    {...dragHandlers}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="palette-group palette-layout-group">
            <span>Layout</span>
            <button
              type="button"
              className="palette-new-line"
              aria-label="Add a new line"
              onClick={() => handlePaletteClick(LINE_BREAK)}
              onPointerDown={(event) => beginPointerDrag(event, { type: "palette", value: LINE_BREAK })}
              {...dragHandlers}
            >
              <span aria-hidden="true">↵</span> New line
            </button>
          </div>
        </div>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {expression ? `Current equation: ${expression}` : "The equation is empty."}
      </p>

      {drag && (
        <span
          className="equation-drag-preview"
          style={{ transform: `translate(${drag.x + 12}px, ${drag.y + 12}px)` }}
          aria-hidden="true"
        >
          {displayValue(drag.item.value)}
        </span>
      )}
    </section>
  );
}
