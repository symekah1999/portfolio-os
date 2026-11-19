"use client";
import { useMemo, useState } from "react";
import { Check, Plus, Search } from "lucide-react";

const Banner = () => (
  <div className="text-[11px] mono uppercase px-3 py-1.5 mb-4 panel" style={{ color: "#ffb000" }}>
    Sandbox demo · synthetic data only · nothing here comes from the real apps
  </div>
);

/* ---------------- Growth OS ---------------- */
type Habit = { id: number; name: string; streak: number; done: boolean };
type Note = { id: number; text: string; tag: string };

function GrowthDemo() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Morning prayer & planning", streak: 12, done: true },
    { id: 2, name: "Lift or walk", streak: 5, done: false },
    { id: 3, name: "Read 20 pages", streak: 9, done: false },
    { id: 4, name: "Evening review", streak: 3, done: false },
  ]);
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, text: "Idea: weekly review template", tag: "idea" },
    { id: 2, text: "Follow up on CFI course module 4", tag: "task" },
    { id: 3, text: "Budget check before month end", tag: "finance" },
  ]);
  const [draft, setDraft] = useState("");
  const [q, setQ] = useState("");
  const [goals, setGoals] = useState([
    { name: "Ship portfolio", pct: 70 },
    { name: "ACCA paper revision", pct: 35 },
    { name: "Deadlift 140 kg", pct: 55 },
  ]);
  const score = Math.round((habits.filter((h) => h.done).length / habits.length) * 100);
  const shown = useMemo(() => notes.filter((n) => (n.text + n.tag).toLowerCase().includes(q.toLowerCase())), [notes, q]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <section className="panel p-3">
        <h3 className="text-xs mono uppercase mb-2" style={{ color: "var(--accent)" }}>Life systems · today {score}%</h3>
        {habits.map((h) => (
          <button key={h.id} onClick={() => setHabits(habits.map((x) => x.id === h.id ? { ...x, done: !x.done, streak: x.done ? x.streak - 1 : x.streak + 1 } : x))}
            className="w-full flex items-center gap-2 py-1.5 text-left text-[13px]">
            <span className="w-4 h-4 grid place-items-center border" style={{ borderColor: "var(--line-strong)" }}>{h.done && <Check size={12} />}</span>
            <span className="flex-1">{h.name}</span>
            <span className="chip">{h.streak}d</span>
          </button>
        ))}
      </section>
      <section className="panel p-3">
        <h3 className="text-xs mono uppercase mb-2" style={{ color: "var(--accent)" }}>Goals</h3>
        {goals.map((g, i) => (
          <label key={g.name} className="block mb-2 text-[13px]">
            <div className="flex justify-between"><span>{g.name}</span><span className="mono">{g.pct}%</span></div>
            <input type="range" min={0} max={100} value={g.pct} className="w-full" style={{ accentColor: "var(--accent)" }}
              onChange={(e) => setGoals(goals.map((x, j) => j === i ? { ...x, pct: +e.target.value } : x))} />
          </label>
        ))}
      </section>
      <section className="panel p-3 md:col-span-2">
        <h3 className="text-xs mono uppercase mb-2" style={{ color: "var(--accent)" }}>Quick capture &amp; search</h3>
        <form className="flex gap-2 mb-2" onSubmit={(e) => { e.preventDefault(); if (!draft.trim()) return; setNotes([{ id: Date.now(), text: draft.trim(), tag: "inbox" }, ...notes]); setDraft(""); }}>
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Capture a thought…" className="flex-1 bg-transparent border px-2 py-1 text-[13px]" style={{ borderColor: "var(--line-strong)" }} />
          <button className="btn btn-accent"><Plus size={13} /> Add</button>
        </form>
        <div className="flex items-center gap-2 mb-2"><Search size={13} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search notes" className="flex-1 bg-transparent border px-2 py-1 text-[13px]" style={{ borderColor: "var(--line-strong)" }} /></div>
        {shown.map((n) => <div key={n.id} className="flex gap-2 py-1 text-[13px]"><span className="chip">{n.tag}</span>{n.text}</div>)}
        {!shown.length && <div className="text-[13px]" style={{ color: "var(--muted)" }}>No matches.</div>}
      </section>
    </div>
  );
}

/* ---------------- RentTrack ---------------- */
type Unit = { unit: string; tenant: string; rent: number; paid: number };
const seed: Unit[] = Array.from({ length: 12 }, (_, i) => ({
  unit: `A${i + 1}`, tenant: `Tenant ${String.fromCharCode(65 + i)}`, rent: i % 3 === 0 ? 18000 : 15000,
  paid: [1, 4, 7].includes(i) ? 0 : [2, 9].includes(i) ? 8000 : i % 3 === 0 ? 18000 : 15000,
}));
const kes = (n: number) => "KES " + n.toLocaleString();

function RentDemo() {
  const [units, setUnits] = useState(seed);
  const [filter, setFilter] = useState<"all" | "arrears" | "paid">("all");
  const due = units.reduce((s, u) => s + u.rent, 0);
  const got = units.reduce((s, u) => s + u.paid, 0);
  const rows = units.filter((u) => filter === "all" || (filter === "paid" ? u.paid >= u.rent : u.paid < u.rent));
  const pay = (unit: string) => setUnits(units.map((u) => u.unit === unit ? { ...u, paid: u.rent } : u));
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[["Expected", kes(due)], ["Collected", kes(got)], ["Arrears", kes(due - got)]].map(([l, v]) => (
          <div key={l} className="panel p-3"><div className="mono text-sm" style={{ color: "var(--accent)" }}>{v}</div><div className="text-[10.5px] mono uppercase" style={{ color: "var(--muted)" }}>{l}</div></div>
        ))}
      </div>
      <div className="flex gap-2 mb-2">{(["all", "arrears", "paid"] as const).map((f) => <button key={f} onClick={() => setFilter(f)} className={`btn ${filter === f ? "btn-accent" : ""}`}>{f}</button>)}</div>
      <table className="w-full text-[13px]">
        <thead><tr className="mono text-[11px] uppercase text-left" style={{ color: "var(--muted)" }}><th>Unit</th><th>Tenant</th><th>Rent</th><th>Paid</th><th /></tr></thead>
        <tbody>{rows.map((u) => (
          <tr key={u.unit} className="border-t" style={{ borderColor: "var(--line)" }}>
            <td className="py-1.5 mono">{u.unit}</td><td>{u.tenant}</td><td>{kes(u.rent)}</td>
            <td style={{ color: u.paid >= u.rent ? "#4ade80" : "#ffb000" }}>{kes(u.paid)}</td>
            <td className="text-right">{u.paid < u.rent && <button className="btn" onClick={() => pay(u.unit)}>Record payment</button>}</td>
          </tr>))}</tbody>
      </table>
    </div>
  );
}

export default function DemoApp({ id }: { id: string }) {
  return (
    <div className="p-4 overflow-auto h-full">
      <Banner />
      {id === "growth-os" ? <GrowthDemo /> : <RentDemo />}
    </div>
  );
}
