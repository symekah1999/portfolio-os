"use client";
import { useEffect, useState } from "react";
import { useOS } from "@/lib/store";

const GLYPHS = "01<>/\\[]{}#$%&*+=-_";

/** Decodes text from random glyphs into the real string, left to right. */
export default function Scramble({ text, delay = 0, speed = 28, className }: { text: string; delay?: number; speed?: number; className?: string }) {
  const fx = useOS((s) => s.settings.fx);
  const [out, setOut] = useState(text);

  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fx || reduce) { setOut(text); return; }
    let frame = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        frame++;
        const settled = Math.floor(frame / 2);
        setOut(
          text.split("").map((c, i) => (c === " " || i < settled ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(""),
        );
        if (settled >= text.length) { clearInterval(timer); setOut(text); }
      }, speed);
    }, delay);
    return () => { clearTimeout(start); if (timer) clearInterval(timer); };
  }, [text, delay, speed, fx]);

  return <span className={className} aria-label={text}>{out}</span>;
}
