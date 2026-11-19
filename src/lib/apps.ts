import { projects } from "@/data/projects";

export type AppDef = { id: string; title: string; w: number; h: number };

export function resolveApp(id: string): AppDef {
  if (id === "about") return { id, title: "About Me", w: 760, h: 560 };
  if (id === "terminal") return { id, title: "Terminal", w: 700, h: 440 };
  if (id === "contact") return { id, title: "Contact", w: 520, h: 420 };
  if (id === "settings") return { id, title: "Settings", w: 520, h: 420 };
  if (id === "folder:products") return { id, title: "Products", w: 760, h: 480 };
  if (id === "folder:datascience") return { id, title: "Data Science", w: 760, h: 480 };
  if (id.startsWith("project:")) {
    const p = projects.find((x) => x.id === id.slice(8));
    return { id, title: p?.name ?? "Project", w: 900, h: 640 };
  }
  return { id, title: id, w: 700, h: 480 };
}
