"use client";
import { create } from "zustand";

export type Win = {
  id: string; // e.g. "about", "folder:products", "project:renttrack"
  title: string;
  x: number; y: number; w: number; h: number;
  z: number; minimized: boolean; maximized: boolean;
};

export type Settings = { accent: string; wallpaper: "grid" | "void" | "ember"; fx: boolean };

type OS = {
  windows: Win[];
  topZ: number;
  settings: Settings;
  open: (id: string, title: string, size?: { w: number; h: number }) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMax: (id: string) => void;
  move: (id: string, p: Partial<Pick<Win, "x" | "y" | "w" | "h">>) => void;
  set: (s: Partial<Settings>) => void;
};

export const useOS = create<OS>((set, get) => ({
  windows: [],
  topZ: 10,
  settings: { accent: "#00e5ff", wallpaper: "grid", fx: true },
  open: (id, title, size = { w: 820, h: 560 }) => {
    const { windows, topZ } = get();
    const existing = windows.find((w) => w.id === id);
    const z = topZ + 1;
    if (existing) {
      set({ topZ: z, windows: windows.map((w) => (w.id === id ? { ...w, z, minimized: false } : w)) });
      return;
    }
    const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const w = Math.min(size.w, vw - 40), h = Math.min(size.h, vh - 150);
    const n = windows.length % 6;
    const x = Math.max(10, (vw - w) / 2 + n * 28 - 60);
    const y = Math.max(40, (vh - h) / 2 + n * 24 - 50);
    set({ topZ: z, windows: [...windows, { id, title, x, y, w, h, z, minimized: false, maximized: false }] });
  },
  close: (id) => set({ windows: get().windows.filter((w) => w.id !== id) }),
  focus: (id) => {
    const z = get().topZ + 1;
    set({ topZ: z, windows: get().windows.map((w) => (w.id === id ? { ...w, z } : w)) });
  },
  minimize: (id) => set({ windows: get().windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)) }),
  toggleMax: (id) => set({ windows: get().windows.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)) }),
  move: (id, p) => set({ windows: get().windows.map((w) => (w.id === id ? { ...w, ...p } : w)) }),
  set: (s) => set({ settings: { ...get().settings, ...s } }),
}));
