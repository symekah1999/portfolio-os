"use client";
import { useState } from "react";
import { ExternalLink, AlertTriangle, X } from "lucide-react";
import { byId } from "@/data/projects";

export default function ProjectApp({ id }: { id: string }) {
  const p = byId(id);
  const [zoom, setZoom] = useState<string | null>(null);
  if (!p) return <div className="p-6">Project not found.</div>;
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-xl font-semibold">{p.name}</h1>
      <p className="mt-1 mb-4" style={{ color: "var(--muted)" }}>{p.tagline}</p>

      {p.metrics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
          {p.metrics.map((m) => (
            <div key={m.label} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,.05)", border: "1px solid var(--line)" }}>
              <div className="text-lg font-semibold">{m.value}</div>
              <div className="text-[11px]" style={{ color: "var(--muted)" }}>{m.label}</div>
            </div>
          ))}
        </div>
      )}

      <p className="text-[14px] leading-relaxed mb-4">{p.summary}</p>
      <ul className="list-disc pl-5 space-y-1.5 text-[14px] mb-5">
        {p.highlights.map((h) => <li key={h}>{h}</li>)}
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
          <h2 className="text-sm font-medium mb-2">Gallery</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {p.images.map((im) => (
              <button key={im.src} onClick={() => setZoom(im.src)} className="text-left rounded-xl overflow-hidden"
                style={{ background: "rgba(255,255,255,.05)", border: "1px solid var(--line)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={im.src} alt={im.caption} className="w-full h-44 object-contain bg-black/40" loading="lazy" />
                <div className="px-3 py-2 text-xs" style={{ color: "var(--muted)" }}>{im.caption}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {p.honest && (
        <div className="p-4 rounded-xl" style={{ background: "rgba(255,180,0,.07)", border: "1px solid rgba(255,180,0,.25)" }}>
          <div className="flex items-center gap-2 text-sm font-medium mb-2"><AlertTriangle size={15} /> Honest notes</div>
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
