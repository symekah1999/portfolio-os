"use client";
import { Github, Linkedin, ExternalLink } from "lucide-react";

export default function ContactApp() {
  const links = [
    { icon: Github, label: "GitHub", sub: "github.com/symekah1999", href: "https://github.com/symekah1999" },
    { icon: Linkedin, label: "LinkedIn", sub: "linkedin.com/in/shadrack-symekah9791561a2", href: "https://www.linkedin.com/in/shadrack-symekah9791561a2" },
  ];
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-1">Get in touch</h1>
      <p className="mb-5 text-sm" style={{ color: "var(--muted)" }}>Open to machine learning engineering and full-stack-for-AI roles.</p>
      <div className="grid gap-3">
        {links.map(({ icon: I, label, sub, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 rounded-xl hover:brightness-125"
            style={{ background: "rgba(255,255,255,.05)", border: "1px solid var(--line)" }}>
            <I size={22} style={{ color: "var(--accent)" }} />
            <div className="flex-1"><div className="font-medium text-sm">{label}</div><div className="text-xs" style={{ color: "var(--muted)" }}>{sub}</div></div>
            <ExternalLink size={14} />
          </a>
        ))}
      </div>
    </div>
  );
}
