"use client";
import { useOS } from "@/lib/store";
import { resolveApp } from "@/lib/apps";

export function useOpenApp() {
  const open = useOS((s) => s.open);
  return (id: string) => {
    const a = resolveApp(id);
    open(a.id, a.title, { w: a.w, h: a.h });
  };
}
