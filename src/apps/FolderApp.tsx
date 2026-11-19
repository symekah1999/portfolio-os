"use client";
import { Folder, FileText, LineChart, Boxes } from "lucide-react";
import { motion } from "framer-motion";
import Scramble from "@/components/Scramble";
import { projects, type Category } from "@/data/projects";
import { useOpenApp } from "@/lib/useOpenApp";

export default function FolderApp({ category }: { category: Category }) {
  const open = useOpenApp();
  const items = projects.filter((p) => p.category === category);
  const Icon = category === "products" ? Boxes : LineChart;
  return (
    <div className="p-5">
      <div className="text-xs mb-4 mono uppercase" style={{ color: "var(--muted)" }}>
        <Folder size={12} className="inline mr-1" />~/{category === "products" ? "Products" : "Data Science"} · {items.length} projects
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <motion.button key={p.id} onClick={() => open(`project:${p.id}`)} className="text-left p-4 panel relative"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.09, duration: 0.35 }}
            whileHover={{ y: -3, boxShadow: "0 0 22px var(--line-strong)", borderColor: "var(--accent)" }}>
            <i className="hud-corner hud-tl" style={{ width: 8, height: 8 }} /><i className="hud-corner hud-br" style={{ width: 8, height: 8 }} />
            <div className="w-10 h-10 grid place-items-center mb-3" style={{ background: "color-mix(in srgb, var(--accent) 16%, transparent)", border: "1px solid var(--line-strong)" }}>
              <Icon size={20} style={{ color: "var(--accent)" }} />
            </div>
            <div className="font-medium text-sm mb-1 flex items-center gap-1.5 mono flex-wrap"><Scramble text={p.name} delay={i * 90} />{p.private && <span className="chip">private repo</span>}</div>
            <div className="text-xs leading-snug" style={{ color: "var(--muted)" }}>{p.tagline}</div>
            <div className="mt-3 flex flex-wrap gap-1">{p.stack.slice(0, 3).map((s) => <span key={s} className="chip">{s}</span>)}</div>
          </motion.button>
        ))}
      </div>
      <div className="mt-6 text-xs flex items-center gap-1" style={{ color: "var(--muted)" }}><FileText size={12} /> Click a project to open it.</div>
    </div>
  );
}
