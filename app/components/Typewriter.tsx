"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "backend engineer.",
  "tool builder.",
  "self-taught.",
  "started on a TI-84.",
];

const TYPE_SPEED = 70;
const DELETE_SPEED = 35;
const HOLD_TIME = 1600;

export default function Typewriter() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
    "typing"
  );

  useEffect(() => {
    const current = PHRASES[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, TYPE_SPEED);
      } else {
        timeout = setTimeout(() => setPhase("holding"), 0);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), HOLD_TIME);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(current.slice(0, text.length - 1));
        }, DELETE_SPEED);
      } else {
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, phraseIdx]);

  return (
    <span className="caret font-mono text-amber-glow">
      {text || " "}
    </span>
  );
}
