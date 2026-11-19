"use client";
import { Rnd } from "react-rnd";
import { Minus, Square, X } from "lucide-react";
import { useOS, type Win } from "@/lib/store";
import { useIsMobile } from "@/lib/useIsMobile";

export default function Window({ win, children }: { win: Win; children: React.ReactNode }) {
  const { focus, close, minimize, toggleMax, move } = useOS();
  const mobile = useIsMobile();
  if (win.minimized) return null;

  const bar = (
    <div
      className="win-handle flex items-center gap-2 px-3 h-10 shrink-0 border-b select-none"
      style={{ borderColor: "var(--line)", background: "rgba(255,255,255,.04)" }}
      onDoubleClick={() => !mobile && toggleMax(win.id)}
    >
      <div className="flex gap-1.5">
        <button aria-label="Close" onClick={() => close(win.id)} className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] grid place-items-center group">
          <X size={9} className="opacity-0 group-hover:opacity-80 text-black" />
        </button>
        <button aria-label="Minimise" onClick={() => minimize(win.id)} className="w-3.5 h-3.5 rounded-full bg-[#febc2e] grid place-items-center group">
          <Minus size={9} className="opacity-0 group-hover:opacity-80 text-black" />
        </button>
        {!mobile && (
          <button aria-label="Maximise" onClick={() => toggleMax(win.id)} className="w-3.5 h-3.5 rounded-full bg-[#28c840] grid place-items-center group">
            <Square size={7} className="opacity-0 group-hover:opacity-80 text-black" />
          </button>
        )}
      </div>
      <div className="flex-1 text-center text-[13px] truncate" style={{ color: "var(--muted)" }}>{win.title}</div>
      <div className="w-12" />
    </div>
  );

  const body = <div className="flex-1 overflow-auto scroll-thin min-h-0">{children}</div>;

  if (mobile || win.maximized) {
    return (
      <div
        className="glass absolute flex flex-col overflow-hidden"
        style={{ zIndex: win.z, inset: mobile ? "30px 0 84px 0" : "30px 0 72px 0", borderRadius: mobile ? 0 : 12 }}
        onMouseDown={() => focus(win.id)}
      >
        {bar}
        {body}
      </div>
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
      style={{ zIndex: win.z }}
    >
      <div className="glass w-full h-full flex flex-col overflow-hidden rounded-xl shadow-2xl shadow-black/50">
        {bar}
        {body}
      </div>
    </Rnd>
  );
}
