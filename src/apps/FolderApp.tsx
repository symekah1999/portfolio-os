"use client";
import { Folder, FileText, LineChart, Boxes } from "lucide-react";
import { projects, type Category } from "@/data/projects";
import { useOpenApp } from "@/lib/useOpenApp";

export default function FolderApp({ category }: { category: Category }) {
  const open = useOpenApp();
  const items = projects.filter((p) => p.category === category);
  const Icon = category === "products" ? Boxes : LineChart;
  return (
    <div className="p-5">
      <div className="text-xs mb-4" style={{ color: "var(--muted)" }}>
        <Folder size={12} className="inline mr-1" />~/{category === "products" ? "Products" : "Data Science"} · {items.length} projects
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <button key={p.id} onClick={() => open(`project:${p.id}`)} className="text-left p-4 rounded-xl transition hover:-translate-y-0.5"
            style={{ background: "rgba(255,255,255,.05)", border: "1px solid var(--line)" }}>
            <div className="w-10 h-10 rounded-lg grid place-items-center mb-3" style={{ background: "color-mix(in srgb, var(--accent) 30%, transparent)" }}>
              <Icon size={20} style={{ color: "var(--accent)" }} />
            </div>
            <div className="font-medium text-sm mb-1 flex items-center gap-1.5">{p.name}{p.private && <span className="chip">private repo</span>}</div>
            <div className="text-xs leading-snug" style={{ color: "var(--muted)" }}>{p.tagline}</div>
            <div className="mt-3 flex flex-wrap gap-1">{p.stack.slice(0, 3).map((s) => <span key={s} className="chip">{s}</span>)}</div>
          </button>
        ))}
      </div>
      <div className="mt-6 text-xs flex items-center gap-1" style={{ color: "var(--muted)" }}><FileText size={12} /> Click a project to open it.</div>
    </div>
  );
}
