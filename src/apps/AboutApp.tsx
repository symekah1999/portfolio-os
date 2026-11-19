"use client";
import { GraduationCap, Briefcase, Building2, Award } from "lucide-react";
import { motion } from "framer-motion";
import Scramble from "@/components/Scramble";

export default function AboutApp() {
  const rows = [
    { icon: Briefcase, h: "Kenya Revenue Authority", t: "Intern, Revenue Monitoring and Reporting. Analytical work across PAYE, VAT, Corporation Tax and Excise Duty for senior stakeholders." },
    { icon: Building2, h: "Menetekel Apartments", t: "Property manager of a 34-unit building in Nairobi, and the user of the rent-collection app I built for it." },
    { icon: GraduationCap, h: "Education", t: "BSc Economics and Statistics (Second Class Upper), University of Nairobi. Data Science programme, Moringa School. ACCA in progress at KCA University." },
    { icon: Award, h: "Certifications", t: "CFI certifications." },
  ];
  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-16 h-16 grid place-items-center text-2xl font-bold mono relative" style={{ background: "var(--accent)", color: "var(--on-accent)", borderRadius: 4, boxShadow: "0 0 24px var(--line-strong)" }}>SS</div>
        <div>
          <h1 className="text-2xl font-semibold uppercase glitch"><Scramble text="Shadrack Symekah" /></h1>
          <p style={{ color: "var(--muted)" }}>Data scientist who ships full-stack products · Nairobi, Kenya</p>
        </div>
      </div>
      <p className="text-[15px] leading-relaxed mb-5">
        I build end-to-end: from the model and the analysis to the app that puts it in someone&apos;s hands. This desktop is my portfolio.
        Open <b>Products</b> for the apps I run in real life, and <b>Data Science</b> for modelling projects with their results, including the limitations.
      </p>
      <div className="grid gap-3">
        {rows.map(({ icon: I, h, t }, i) => (
          <motion.div key={h} className="flex gap-3 p-3 panel" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.1 }}>
            <I size={18} style={{ color: "var(--accent)" }} className="mt-0.5 shrink-0" />
            <div><div className="font-medium text-sm mono">{h}</div><div className="text-sm" style={{ color: "var(--muted)" }}>{t}</div></div>
          </motion.div>
        ))}
      </div>
      <p className="mt-5 text-sm" style={{ color: "var(--muted)" }}>
        Looking for: machine learning engineering and full-stack-for-AI roles.
      </p>
    </div>
  );
}
