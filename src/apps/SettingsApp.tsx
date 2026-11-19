"use client";
import { useOS, type Settings } from "@/lib/store";

const accents = [
  { c: "#00e5ff", n: "Cyan" },
  { c: "#ffb000", n: "Amber" },
  { c: "#39ff88", n: "Matrix" },
  { c: "#ff3df2", n: "Magenta" },
  { c: "#ff4d4d", n: "Red alert" },
];
const walls: Settings["wallpaper"][] = ["grid", "void", "ember"];

export default function SettingsApp() {
  const { settings, set } = useOS();
  return (
    <div className="p-6">
      <h2 className="mono text-xs uppercase mb-3" style={{ color: "var(--accent)" }}>// accent</h2>
      <div className="flex gap-2 mb-6">
        {accents.map(({ c, n }) => (
          <button key={c} aria-label={n} title={n} onClick={() => set({ accent: c })} className="w-8 h-8 rounded-sm"
            style={{ background: c, outline: settings.accent === c ? "2px solid #fff" : "none", outlineOffset: 2, boxShadow: `0 0 12px ${c}66` }} />
        ))}
      </div>
      <h2 className="mono text-xs uppercase mb-3" style={{ color: "var(--accent)" }}>// wallpaper</h2>
      <div className="flex gap-2 mb-6">
        {walls.map((w) => (
          <button key={w} onClick={() => set({ wallpaper: w })} className="btn" style={{ outline: settings.wallpaper === w ? "1px solid var(--accent)" : "none" }}>{w}</button>
        ))}
      </div>
      <h2 className="mono text-xs uppercase mb-3" style={{ color: "var(--accent)" }}>// effects</h2>
      <label className="flex items-center gap-3 text-sm cursor-pointer">
        <input type="checkbox" checked={settings.fx} onChange={(e) => set({ fx: e.target.checked })} />
        Animated backdrop, scanlines and text decoding
      </label>
      <p className="text-xs mt-2" style={{ color: "var(--muted)" }}>Turn off for a calmer, faster desktop. Your system&apos;s reduced-motion setting is respected automatically.</p>
    </div>
  );
}
