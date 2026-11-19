"use client";
import { useEffect, useRef } from "react";
import { useOS } from "@/lib/store";

/** Drifting node network on a canvas, with links between nearby nodes. */
function Network({ accent }: { accent: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    type N = { x: number; y: number; vx: number; vy: number };
    let nodes: N[] = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(26, Math.min(70, Math.floor((w * h) / 22000)));
      nodes = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h * 0.7, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25 }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduce) { n.x += n.vx; n.y += n.vy; }
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h * 0.75) n.vy *= -1;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 140) {
            ctx.strokeStyle = accent; ctx.globalAlpha = (1 - d / 140) * 0.28;
            ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 0.8; ctx.fillStyle = accent;
      for (const n of nodes) { ctx.beginPath(); ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2); ctx.fill(); }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [accent]);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function Backdrop() {
  const { settings } = useOS();
  return (
    <>
      <div className={`absolute inset-0 wp-${settings.wallpaper}`} />
      {settings.fx && settings.wallpaper !== "void" && <div className="floor-grid" />}
      {settings.fx && <Network accent={settings.accent} />}
    </>
  );
}
