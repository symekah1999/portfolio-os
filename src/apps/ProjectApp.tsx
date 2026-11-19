"use client";
import { useState } from "react";
import { ExternalLink, AlertTriangle, X } from "lucide-react";
import { motion } from "framer-motion";
import { byId } from "@/data/projects";
import Scramble from "@/components/Scramble";

const up = (i: number) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 + i * 0.07, duration: 0.35 } });

export default function ProjectApp({ id }: { id: string }) {
  const p = byId(id);
  const [zoom, setZoom] = useState<string | null>(null);
  if (!p) return <div className="p-6">Project not found.</div>;
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-xl font-semibold uppercase"><Scramble text={p.name} /></h1>
      <motion.p className="mt-1 mb-4" style={{ color: "var(--muted)" }} {...up(1)}>{p.tagline}</motion.p>

      {p.metrics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
          {p.metrics.map((m, i) => (
            <motion.div key={m.label} className="p-3 panel relative" {...up(2 + i * 0.5)}>
              <i className="hud-corner hud-tl" style={{ width: 7, height: 7 }} />
              <div className="text-lg font-semibold mono" style={{ color: "var(--accent)" }}><Scramble text={m.value} delay={250 + i * 120} /></div>
              <div className="text-[10.5px] mono uppercase" style={{ color: "var(--muted)" }}>{m.label}</div>
            </motion.div>
          ))}
        </div>
      )}

      <motion.p className="text-[14px] leading-relaxed mb-4" {...up(3)}>{p.summary}</motion.p>
      <ul className="list-disc pl-5 space-y-1.5 text-[14px] mb-5 marker:text-[var(--accent)]">
        {p.highlights.map((h, i) => <motion.li key={h} {...up(4 + i * 0.5)}>{h}</motion.li>)}
      </ul>

      <div className="flex flex-wrap gap-1.5 mb-4">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
      <div className="flex flex-wrap gap-2 mb-6">
        {p.links.map((l, i) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={`btn ${i === 0 ? "btn-accent" : ""}`}>
            {l.label} <ExternalLink size={13} />
          </a>
        ))}
        {p.private && <span className="chip self-center">Source is private</span>}
      </div>

      {p.images && (
        <div className="mb-6">
          <h2 className="text-xs mono uppercase mb-2" style={{ color: "var(--accent)" }}>// gallery</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {p.images.map((im, i) => (
              <motion.button key={im.src} onClick={() => setZoom(im.src)} className="text-left overflow-hidden panel"
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }} viewport={{ once: true }} transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
                whileHover={{ boxShadow: "0 0 20px var(--line-strong)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={im.src} alt={im.caption} className="w-full h-44 object-contain bg-black/40" loading="lazy" />
                <div className="px-3 py-2 text-xs mono" style={{ color: "var(--muted)" }}>{im.caption}</div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {p.honest && (
        <div className="p-4" style={{ background: "rgba(255,176,0,.07)", border: "1px solid rgba(255,176,0,.35)", borderRadius: 4 }}>
          <div className="flex items-center gap-2 text-xs mono uppercase mb-2" style={{ color: "#ffb000" }}><AlertTriangle size={15} /> Honest notes</div>
          <ul className="list-disc pl-5 space-y-1 text-[13px]" style={{ color: "var(--muted)" }}>
            {p.honest.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
      )}

      {zoom && (
        <div className="fixed inset-0 z-[9999] bg-black/80 grid place-items-center p-6" onClick={() => setZoom(null)}>
          <button className="absolute top-4 right-4 btn" aria-label="Close"><X size={16} /></button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoom} alt="" className="max-w-full max-h-full rounded-lg" />
        </div>
      )}
    </div>
  );
}
