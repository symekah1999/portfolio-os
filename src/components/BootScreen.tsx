"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  "PORTFOLIO-OS v1.0  //  BOOT SEQUENCE",
  "[ OK ] mounting /projects ............. 6 modules",
  "[ OK ] loading products ............... renttrack, growth-os, fitness-os",
  "[ OK ] loading data-science ........... kdhs, dropout, chicago",
  "[ OK ] calibrating interface .......... ready",
  "[ OK ] operator identified ............ SHADRACK SYMEKAH",
  "SYSTEM ONLINE",
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= LINES.length) { const t = setTimeout(onDone, 450); return () => clearTimeout(t); }
    const t = setTimeout(() => setN((v) => v + 1), n === 0 ? 350 : 260);
    return () => clearTimeout(t);
  }, [n, onDone]);
  useEffect(() => {
    const skip = () => onDone();
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [onDone]);

  const pct = Math.round((Math.min(n, LINES.length) / LINES.length) * 100);
  return (
    <motion.div
      className="fixed inset-0 z-[10000] mono text-[13px] p-6 md:p-12 flex flex-col justify-end cursor-pointer"
      style={{ background: "#02060d", color: "var(--accent)" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      onClick={onDone}
    >
      <div className="max-w-2xl w-full">
        {LINES.slice(0, n).map((l, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }}
            style={{ color: l.startsWith("SYSTEM") ? "#fff" : undefined, textShadow: l.startsWith("SYSTEM") ? "0 0 12px var(--accent)" : undefined }}
            className={l.startsWith("SYSTEM") ? "text-lg mt-2 font-bold" : ""}>
            {l}
          </motion.div>
        ))}
        {n < LINES.length && <span className="blink">▮</span>}
        <div className="mt-5 h-[3px] w-full" style={{ background: "var(--line)" }}>
          <motion.div className="h-full" style={{ background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }} animate={{ width: `${pct}%` }} transition={{ duration: 0.25 }} />
        </div>
        <div className="mt-2 text-[11px]" style={{ color: "var(--muted)" }}>{pct}%  ·  press any key or click to skip</div>
      </div>
    </motion.div>
  );
}
