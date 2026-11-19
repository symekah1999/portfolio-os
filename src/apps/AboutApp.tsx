"use client";
import { GraduationCap, Briefcase, Building2, Award, Sigma } from "lucide-react";
import { motion } from "framer-motion";
import Scramble from "@/components/Scramble";

const competencies = [
  ["Financial & revenue data analysis", "reconciling records, identifying variances, supporting audit engagements"],
  ["Statistical analysis", "data summarization, descriptive statistics, trend interpretation"],
  ["Economic analysis", "macroeconomic projections, fiscal and monetary policy evaluation"],
  ["Reporting & dashboards", "periodic reports that track performance against benchmarks"],
  ["Research", "quantitative and qualitative analysis with evidence-based recommendations"],
  ["Microsoft Office & advanced Excel", "formulas, scenario/sensitivity analysis, dashboard design"],
  ["SQL & Python", "data cleaning, querying and analysis"],
  ["Cross-functional collaboration", "working with peers, seniors and audit teams"],
];

const education = [
  ["Certificate in Data Science (SQL, Python, data analysis)", "Moringa School · completed June 2026"],
  ["ACCA", "KCA University · 2025"],
  ["BSc Economics and Statistics, Second Class Upper", "University of Nairobi · Feb 2020 – Sept 2024"],
  ["KCSE (B+)", "Maranda High School · 2015 – 2018"],
  ["ICDL", "Institute of Advanced Technology, Nairobi"],
];

const cfi = [
  "Accounting Fundamentals", "Accounting Principles and Standards", "Advanced Excel Formulas and Functions", "Budgeting and Forecasting",
  "Business Valuation Modelling (I & II)", "Capital IQ Fundamentals", "Dashboard and Data Visualization", "Excel Fundamentals: Formulas for Finance",
  "FP&A Monthly Cash Flow Forecast Model", "Financial Modelling Fundamentals", "Presentation of Financial Information", "Professional Ethics",
  "Scenario & Sensitivity Analysis in Excel", "PowerPoint & Pitchbooks",
];

const H = ({ icon: I, children }: { icon: typeof Award; children: string }) => (
  <h2 className="flex items-center gap-2 text-xs mono uppercase mt-6 mb-2" style={{ color: "var(--accent)" }}>
    <I size={14} /> {children}
  </h2>
);

export default function AboutApp() {
  return (
    <div className="p-6 max-w-2xl h-full overflow-auto">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-16 h-16 grid place-items-center text-2xl font-bold mono relative" style={{ background: "var(--accent)", color: "var(--on-accent)", borderRadius: 4, boxShadow: "0 0 24px var(--line-strong)" }}>SS</div>
        <div>
          <h1 className="text-2xl font-semibold uppercase glitch"><Scramble text="Shadrack Symekah" /></h1>
          <p style={{ color: "var(--muted)" }}>Data scientist who ships full-stack products · Nairobi, Kenya</p>
        </div>
      </div>

      <p className="text-[15px] leading-relaxed mb-3">
        Detail-oriented graduate with a BSc in Economics and Statistics and hands-on experience in revenue monitoring, tax data analysis and financial reporting.
        I combine statistical and data science techniques with research and communication skills to turn raw data into clear, actionable insights, and I build the apps that put them in people&apos;s hands.
      </p>
      <p className="text-[14px] leading-relaxed" style={{ color: "var(--muted)" }}>
        This desktop is my portfolio. Open <b>Products</b> for the apps I run in real life, and <b>Data Science</b> for modelling projects with their results, including the limitations.
      </p>

      <H icon={Briefcase}>Experience</H>
      <motion.div className="p-3 panel" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
        <div className="font-medium text-sm mono">Revenue Monitoring and Reporting Intern · Kenya Revenue Authority</div>
        <div className="text-xs mono mb-2" style={{ color: "var(--muted)" }}>May 2025 – present · Nairobi</div>
        <ul className="list-disc pl-5 space-y-1 text-sm marker:text-[var(--accent)]" style={{ color: "var(--muted)" }}>
          <li>Support audit engagements by analysing revenue and tax data (PAYE, VAT, Corporation Tax, Excise Duty), preparing periodic reports and dashboards that track collection performance against compliance benchmarks.</li>
          <li>Work with audit and reporting teams to reconcile tax records, identify variances and resolve discrepancies.</li>
          <li>Apply data-driven insights to improve the accuracy and clarity of financial data presented to audit teams.</li>
        </ul>
      </motion.div>
      <motion.div className="flex gap-3 p-3 panel mt-3" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
        <Building2 size={18} style={{ color: "var(--accent)" }} className="mt-0.5 shrink-0" />
        <div><div className="font-medium text-sm mono">Menetekel Apartments</div><div className="text-sm" style={{ color: "var(--muted)" }}>Property manager of a 34-unit building in Nairobi, and the user of the rent-collection app I built for it.</div></div>
      </motion.div>

      <H icon={Sigma}>Core competencies</H>
      <div className="grid gap-2 sm:grid-cols-2">
        {competencies.map(([h, t]) => (
          <div key={h} className="p-2.5 panel"><div className="text-[13px] font-medium">{h}</div><div className="text-xs" style={{ color: "var(--muted)" }}>{t}</div></div>
        ))}
      </div>

      <H icon={GraduationCap}>Education</H>
      <div className="grid gap-2">
        {education.map(([h, t]) => (
          <div key={h} className="p-2.5 panel"><div className="text-[13px] font-medium">{h}</div><div className="text-xs" style={{ color: "var(--muted)" }}>{t}</div></div>
        ))}
      </div>

      <H icon={Award}>CFI certifications</H>
      <div className="flex flex-wrap gap-1.5">{cfi.map((c) => <span key={c} className="chip">{c}</span>)}</div>

      <p className="mt-6 text-sm" style={{ color: "var(--muted)" }}>
        Looking for: machine learning engineering and full-stack-for-AI roles, and entry-level finance, data analysis or business operations roles where analytical rigour adds measurable value.
      </p>
    </div>
  );
}
