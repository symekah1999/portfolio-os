# Portfolio OS

My portfolio as a browser desktop: draggable, resizable windows, a dock, a terminal, and one window per project.

**Stack:** Next.js 15, TypeScript, Tailwind v4, Zustand (window manager), react-rnd, Framer Motion, lucide-react.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Where things live

| Path | What |
|---|---|
| `src/data/projects.ts` | All project content: add or edit a project here |
| `src/lib/store.ts` | Window manager state (open, focus, minimise, maximise, settings) |
| `src/components/` | `Desktop` (menu bar, icons, dock), `Window` (drag/resize), `AppRouter` |
| `src/apps/` | About, folders, project viewer, terminal, contact, settings |
| `public/projects/` | Charts and screenshots taken from each project's own repo or notebook |

## Theme and motion

Robotic HUD look: cyan accent (switchable in Settings or with `theme amber` in the terminal), monospace headings, corner brackets, scanlines. On a visitor's first load per tab there is a short boot sequence (any key or click skips it). Windows animate open, close and minimise; text decodes in; cards stagger in. Effects can be turned off in Settings, and `prefers-reduced-motion` skips the boot and animated backdrop automatically.

Phones get a simplified layout: each window opens full-screen above the dock.

## Content rules

Numbers shown for a project come from its notebook outputs, not README summaries. Where a README and a notebook disagree, the notebook wins and the project's "Honest notes" says so.
