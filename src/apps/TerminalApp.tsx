"use client";
import { useEffect, useRef, useState } from "react";
import { projects, byId } from "@/data/projects";
import { useOpenApp } from "@/lib/useOpenApp";
import { useOS } from "@/lib/store";

type Line = { kind: "in" | "out"; text: string };
const HELP = [
  "Commands:",
  "  help            show this list",
  "  whoami          who I am",
  "  ls              list projects",
  "  cat <id>        summary of a project",
  "  open <id>       open a project window (or: about, contact, settings)",
  "  contact         where to find me",
  "  sysinfo         system readout",
  "  theme <name>    cyan | amber | matrix | magenta | red",
  "  clear           clear the screen",
];

export default function TerminalApp() {
  const open = useOpenApp();
  const [lines, setLines] = useState<Line[]>([{ kind: "out", text: "PORTFOLIO-OS shell v1.0 — type 'help' for commands." }]);
  const [input, setInput] = useState("");
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Scroll only this panel; scrollIntoView() would also scroll the page and shift the whole desktop.
    if (box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    const [cmd, ...rest] = raw.trim().split(/\s+/);
    const arg = rest.join(" ").toLowerCase();
    const out: string[] = [];
    switch (cmd) {
      case "": break;
      case "help": out.push(...HELP); break;
      case "whoami": out.push("Shadrack Symekah: data scientist who ships full-stack products. Nairobi, Kenya."); break;
      case "ls": projects.forEach((p) => out.push(`${p.id.padEnd(12)} [${p.category}]  ${p.name}`)); break;
      case "cat": {
        const p = byId(arg);
        if (!p) out.push(`cat: ${arg || "(missing id)"}: no such project. Try 'ls'.`);
        else { out.push(p.name, p.tagline, "", p.summary); }
        break;
      }
      case "open": {
        const p = byId(arg);
        if (p) { open(`project:${p.id}`); out.push(`opening ${p.name}…`); }
        else if (["about", "contact", "settings"].includes(arg)) { open(arg); out.push(`opening ${arg}…`); }
        else out.push(`open: ${arg || "(missing id)"}: not found. Try 'ls'.`);
        break;
      }
      case "contact": out.push("GitHub:   github.com/symekah1999", "LinkedIn: linkedin.com/in/shadrack-symekah9791561a2"); break;
      case "sysinfo": out.push("OS        portfolio-os 1.0", `MODULES   ${projects.length} (products ${projects.filter((p) => p.category === "products").length}, data science ${projects.filter((p) => p.category === "datascience").length})`, "STACK     Next.js · TypeScript · Tailwind · Zustand · Framer Motion", "OPERATOR  Shadrack Symekah"); break;
      case "theme": {
        const map: Record<string, string> = { cyan: "#00e5ff", amber: "#ffb000", matrix: "#39ff88", magenta: "#ff3df2", red: "#ff4d4d" };
        if (map[arg]) { useOS.getState().set({ accent: map[arg] }); out.push(`accent set to ${arg}`); }
        else out.push("theme: choose cyan, amber, matrix, magenta or red");
        break;
      }
      case "clear": setLines([]); return;
      default: out.push(`${cmd}: command not found. Type 'help'.`);
    }
    setLines((l) => [...l, { kind: "in", text: raw }, ...out.map((t) => ({ kind: "out" as const, text: t }))]);
  };

  return (
    <div ref={box} className="h-full overflow-auto scroll-thin p-4 font-mono text-[13px] bg-black/70" onClick={() => document.getElementById("term-input")?.focus()}>
      {lines.map((l, i) => (
        <div key={i} className="whitespace-pre-wrap" style={{ color: l.kind === "in" ? "var(--text)" : "var(--muted)" }}>
          {l.kind === "in" ? <><span style={{ color: "var(--accent)" }}>operator@portfolio-os</span>:~$ {l.text}</> : l.text}
        </div>
      ))}
      <form onSubmit={(e) => { e.preventDefault(); run(input); setInput(""); }} className="flex">
        <span style={{ color: "var(--accent)" }}>operator@portfolio-os</span><span>:~$&nbsp;</span>
        <input id="term-input" autoFocus value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false}
          autoCapitalize="off" autoComplete="off" className="flex-1 bg-transparent outline-none" />
      </form>
    </div>
  );
}
