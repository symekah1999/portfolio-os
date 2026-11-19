"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, Boxes, LineChart, TerminalSquare, Mail, Settings as Cog } from "lucide-react";
import { useOS } from "@/lib/store";
import { useOpenApp } from "@/lib/useOpenApp";
import Window from "./Window";
import AppRouter from "./AppRouter";
import Backdrop from "./Backdrop";
import BootScreen from "./BootScreen";

const apps = [
  { id: "about", label: "About Me", icon: User },
  { id: "folder:products", label: "Products", icon: Boxes },
  { id: "folder:datascience", label: "Data Science", icon: LineChart },
  { id: "terminal", label: "Terminal", icon: TerminalSquare },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "settings", label: "Settings", icon: Cog },
];

function StatusClock() {
  const [t, setT] = useState("");
  const [up, setUp] = useState(0);
  useEffect(() => {
    const f = () => { setT(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })); setUp((u) => u + 1); };
    f();
    const i = setInterval(f, 1000);
    return () => clearInterval(i);
  }, []);
  const m = String(Math.floor(up / 60)).padStart(2, "0"), s = String(up % 60).padStart(2, "0");
  return <span suppressHydrationWarning className="mono">UPTIME {m}:{s} · {t}</span>;
}

export default function Desktop() {
  const { windows, settings, focus } = useOS();
  const open = useOpenApp();
  const [booted, setBooted] = useState<boolean | null>(null);
  const finishBoot = useCallback(() => {
    try { sessionStorage.setItem("pos-booted", "1"); } catch {}
    setBooted(true);
  }, []);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("pos-booted") === "1"; } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setBooted(seen || reduce);
  }, []);

  useEffect(() => { document.documentElement.style.setProperty("--accent", settings.accent); }, [settings.accent]);

  useEffect(() => { if (booted) open("about"); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [booted]);

  const visible = windows.filter((w) => !w.minimized);
  const activeId = visible.length ? visible.reduce((a, b) => (a.z > b.z ? a : b)).id : null;
  const openIds = new Set(windows.map((w) => w.id));

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      <AnimatePresence>{booted === false && <BootScreen key="boot" onDone={finishBoot} />}</AnimatePresence>

      <Backdrop />
      {settings.fx && <><div className="fx-overlay" /><div className="fx-sweep" /></>}

      {booted && (
        <motion.div className="absolute inset-0" initial={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          {/* menu bar */}
          <div className="absolute top-0 inset-x-0 h-[30px] z-[5000] flex items-center justify-between px-4 text-[11.5px] glass" style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}>
            <div className="flex items-center gap-3 mono uppercase">
              <span className="w-2 h-2 rounded-full blink" style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }} />
              <b style={{ color: "var(--accent)" }}>Shadrack OS</b>
              <span className="hidden sm:inline" style={{ color: "var(--muted)" }}>// system online</span>
            </div>
            <StatusClock />
          </div>

          {/* desktop icons */}
          <div className="absolute top-[44px] left-3 hidden md:flex flex-col gap-2 z-[1]">
            {apps.slice(0, 5).map(({ id, label, icon: I }, idx) => (
              <motion.button key={id} onClick={() => open(id)}
                initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + idx * 0.08, duration: 0.35 }}
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
                className="w-[92px] flex flex-col items-center gap-1 p-2 rounded-sm group">
                <div className="w-12 h-12 grid place-items-center relative panel group-hover:shadow-[0_0_18px_var(--line-strong)]" style={{ borderColor: "var(--line-strong)" }}>
                  <i className="hud-corner hud-tl" style={{ width: 8, height: 8 }} /><i className="hud-corner hud-br" style={{ width: 8, height: 8 }} />
                  <I size={22} style={{ color: "var(--accent)" }} />
                </div>
                <span className="mono text-[10.5px] uppercase text-center" style={{ textShadow: "0 1px 6px #000" }}>{label}</span>
              </motion.button>
            ))}
          </div>

          {/* windows */}
          <div className="absolute inset-0">
            <AnimatePresence>
              {windows.map((w) => (
                <Window key={w.id} win={w} active={w.id === activeId}><AppRouter id={w.id} /></Window>
              ))}
            </AnimatePresence>
          </div>

          {/* dock */}
          <motion.div className="absolute bottom-3 inset-x-0 z-[5000] flex justify-center px-2" initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35, type: "spring", stiffness: 160, damping: 18 }}>
            <div className="glass px-2 py-2 flex gap-1.5 max-w-full overflow-x-auto" style={{ borderRadius: 6, borderColor: "var(--line-strong)" }}>
              {apps.map(({ id, label, icon: I }) => {
                const w = windows.find((x) => x.id === id);
                return (
                  <motion.button key={id} title={label} aria-label={label} whileHover={{ y: -8, scale: 1.18 }} whileTap={{ scale: 0.92 }}
                    onClick={() => (w && !w.minimized ? focus(id) : open(id))}
                    className="relative w-11 h-11 rounded-sm grid place-items-center hover:bg-white/10">
                    <I size={21} style={{ color: w ? "var(--accent)" : "var(--text)" }} />
                    {openIds.has(id) && <span className="absolute -bottom-0.5 w-4 h-[2px]" style={{ background: "var(--accent)", boxShadow: "0 0 6px var(--accent)" }} />}
                  </motion.button>
                );
              })}
              {windows.filter((w) => w.id.startsWith("project:")).map((w) => (
                <button key={w.id} title={w.title} onClick={() => (w.minimized ? open(w.id) : focus(w.id))}
                  className="relative px-2 h-11 mono text-[10.5px] uppercase max-w-[110px] truncate hover:bg-white/10" style={{ borderLeft: "1px solid var(--line)" }}>
                  {w.title}
                  <span className="absolute -bottom-0.5 left-2 right-2 h-[2px]" style={{ background: "var(--accent)" }} />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
