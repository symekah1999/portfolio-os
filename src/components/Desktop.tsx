"use client";
import { useEffect, useState } from "react";
import { User, Boxes, LineChart, TerminalSquare, Mail, Settings as Cog } from "lucide-react";
import { useOS } from "@/lib/store";
import { useOpenApp } from "@/lib/useOpenApp";
import Window from "./Window";
import AppRouter from "./AppRouter";

const apps = [
  { id: "about", label: "About Me", icon: User },
  { id: "folder:products", label: "Products", icon: Boxes },
  { id: "folder:datascience", label: "Data Science", icon: LineChart },
  { id: "terminal", label: "Terminal", icon: TerminalSquare },
  { id: "contact", label: "Contact", icon: Mail },
  { id: "settings", label: "Settings", icon: Cog },
];

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleString([], { weekday: "short", hour: "2-digit", minute: "2-digit" }));
    f();
    const i = setInterval(f, 30000);
    return () => clearInterval(i);
  }, []);
  return <span suppressHydrationWarning>{t}</span>;
}

export default function Desktop() {
  const { windows, settings, focus } = useOS();
  const open = useOpenApp();

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", settings.accent);
  }, [settings.accent]);

  // Greet visitors with the About window on first load.
  useEffect(() => { open("about"); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  const openIds = new Set(windows.map((w) => w.id));

  return (
    <div className={`relative w-screen h-screen overflow-hidden wallpaper-${settings.wallpaper}`}>
      {/* menu bar */}
      <div className="absolute top-0 inset-x-0 h-[30px] z-[5000] flex items-center justify-between px-4 text-[12.5px] glass" style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}>
        <div className="flex items-center gap-4"><b>Shadrack OS</b><span className="hidden sm:inline" style={{ color: "var(--muted)" }}>Portfolio</span></div>
        <Clock />
      </div>

      {/* desktop icons */}
      <div className="absolute top-[44px] left-3 hidden md:flex flex-col gap-3 z-[1]">
        {apps.slice(0, 5).map(({ id, label, icon: I }) => (
          <button key={id} onDoubleClick={() => open(id)} onClick={() => open(id)} className="w-[88px] flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10">
            <div className="w-12 h-12 rounded-xl grid place-items-center" style={{ background: "color-mix(in srgb, var(--accent) 35%, rgba(255,255,255,.06))" }}>
              <I size={24} />
            </div>
            <span className="text-[12px] text-center drop-shadow">{label}</span>
          </button>
        ))}
      </div>

      {/* windows */}
      <div className="absolute inset-0">
        {windows.map((w) => (
          <Window key={w.id} win={w}><AppRouter id={w.id} /></Window>
        ))}
      </div>

      {/* dock */}
      <div className="absolute bottom-3 inset-x-0 z-[5000] flex justify-center px-2">
        <div className="glass rounded-2xl px-2 py-2 flex gap-1.5 max-w-full overflow-x-auto">
          {apps.map(({ id, label, icon: I }) => {
            const w = windows.find((x) => x.id === id);
            return (
              <button key={id} title={label} aria-label={label}
                onClick={() => (w && !w.minimized ? focus(id) : open(id))}
                className="relative w-11 h-11 rounded-xl grid place-items-center hover:bg-white/15 transition hover:-translate-y-1">
                <I size={22} />
                {openIds.has(id) && <span className="absolute -bottom-0.5 w-1 h-1 rounded-full" style={{ background: "var(--accent)" }} />}
              </button>
            );
          })}
          {windows.filter((w) => w.id.startsWith("project:")).map((w) => (
            <button key={w.id} title={w.title} onClick={() => (w.minimized ? open(w.id) : focus(w.id))}
              className="relative px-2 h-11 rounded-xl text-[11px] max-w-[110px] truncate hover:bg-white/15" style={{ borderLeft: "1px solid var(--line)" }}>
              {w.title}
              <span className="absolute -bottom-0.5 left-1/2 w-1 h-1 rounded-full" style={{ background: "var(--accent)" }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
