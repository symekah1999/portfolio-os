"use client";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import { useOS, type Win } from "@/lib/store";
import { useIsMobile } from "@/lib/useIsMobile";

const enter = { opacity: 0, scale: 0.94, filter: "blur(6px)" };
const shown = { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" };
const hidden = { opacity: 0, scale: 0.8, y: 60, filter: "blur(4px)" };
const gone = { opacity: 0, scale: 0.9, filter: "blur(8px)" };

export default function Window({ win, active, children }: { win: Win; active: boolean; children: React.ReactNode }) {
  const { focus, close, minimize, toggleMax, move, settings } = useOS();
  const mobile = useIsMobile();
  const fx = settings.fx;

  const bar = (
    <div
      className="win-handle flex items-center gap-2 px-3 h-10 shrink-0 border-b select-none"
      style={{ borderColor: "var(--line)", background: "color-mix(in srgb, var(--accent) 6%, transparent)" }}
      onDoubleClick={() => !mobile && toggleMax(win.id)}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: active ? "var(--accent)" : "var(--muted)", boxShadow: active ? "0 0 8px var(--accent)" : "none" }} />
      <div className="flex-1 mono text-[11.5px] uppercase truncate" style={{ color: active ? "var(--accent)" : "var(--muted)" }}>{win.title}</div>
      <div className="flex gap-1.5">
        <button aria-label="Minimise" onClick={() => minimize(win.id)} className="w-6 h-6 grid place-items-center hover:bg-white/10 rounded-sm"><Minus size={13} /></button>
        {!mobile && <button aria-label="Maximise" onClick={() => toggleMax(win.id)} className="w-6 h-6 grid place-items-center hover:bg-white/10 rounded-sm"><Square size={11} /></button>}
        <button aria-label="Close" onClick={() => close(win.id)} className="w-6 h-6 grid place-items-center hover:bg-[#ff4d4d] hover:text-black rounded-sm"><X size={14} /></button>
      </div>
    </div>
  );

  const inner = (
    <>
      <i className="hud-corner hud-tl" /><i className="hud-corner hud-tr" /><i className="hud-corner hud-bl" /><i className="hud-corner hud-br" />
      {fx && <div className="scanline-once" />}
      {bar}
      <div className="flex-1 overflow-auto scroll-thin min-h-0">{children}</div>
    </>
  );

  const anim = win.minimized ? hidden : shown;
  const t = { duration: fx ? 0.26 : 0.01, ease: [0.2, 0.8, 0.2, 1] as const };
  const hideStyle = { visibility: win.minimized ? ("hidden" as const) : ("visible" as const), pointerEvents: win.minimized ? ("none" as const) : ("auto" as const), transition: win.minimized ? "visibility 0s linear .26s" : "none" };

  if (mobile || win.maximized) {
    return (
      <motion.div
        initial={enter} animate={anim} exit={gone} transition={t}
        className={`glass absolute flex flex-col overflow-hidden ${active ? "win-active" : "win-idle"}`}
        style={{ zIndex: win.z, inset: mobile ? "30px 0 84px 0" : "30px 0 72px 0", borderRadius: mobile ? 0 : 4, ...hideStyle }}
        onMouseDown={() => focus(win.id)}
      >
        {inner}
      </motion.div>
    );
  }

  return (
    <Rnd
      bounds="parent"
      minWidth={340}
      minHeight={240}
      size={{ width: win.w, height: win.h }}
      position={{ x: win.x, y: win.y }}
      dragHandleClassName="win-handle"
      onMouseDown={() => focus(win.id)}
      onDragStop={(_, d) => move(win.id, { x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, pos) => move(win.id, { w: ref.offsetWidth, h: ref.offsetHeight, x: pos.x, y: pos.y })}
      style={{ zIndex: win.z, ...hideStyle }}
    >
      <motion.div
        initial={enter} animate={anim} exit={gone} transition={t}
        className={`glass relative w-full h-full flex flex-col overflow-hidden ${active ? "win-active" : "win-idle"}`}
        style={{ borderRadius: 4 }}
      >
        {inner}
      </motion.div>
    </Rnd>
  );
}
