"use client";
import { useOS, type Settings } from "@/lib/store";

const accents = ["#7c5cff", "#14b8a6", "#f97316", "#ec4899", "#3b82f6"];
const walls: Settings["wallpaper"][] = ["aurora", "midnight", "dusk"];

export default function SettingsApp() {
  const { settings, set } = useOS();
  return (
    <div className="p-6">
      <h2 className="text-sm font-medium mb-2">Accent colour</h2>
      <div className="flex gap-2 mb-6">
        {accents.map((c) => (
          <button key={c} aria-label={c} onClick={() => set({ accent: c })} className="w-8 h-8 rounded-full"
            style={{ background: c, outline: settings.accent === c ? "2px solid #fff" : "none", outlineOffset: 2 }} />
        ))}
      </div>
      <h2 className="text-sm font-medium mb-2">Wallpaper</h2>
      <div className="flex gap-2">
        {walls.map((w) => (
          <button key={w} onClick={() => set({ wallpaper: w })} className={`btn wallpaper-${w} capitalize`}
            style={{ outline: settings.wallpaper === w ? "2px solid var(--accent)" : "none" }}>{w}</button>
        ))}
      </div>
    </div>
  );
}
