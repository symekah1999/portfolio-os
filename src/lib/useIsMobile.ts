"use client";
import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const q = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const f = () => setM(q.matches);
    f();
    q.addEventListener("change", f);
    return () => q.removeEventListener("change", f);
  }, [breakpoint]);
  return m;
}
