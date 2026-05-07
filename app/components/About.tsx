"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

type Commit = {
  hash: string;
  date: string;
  title: string;
  body: string;
  tag?: string;
};

const TIMELINE: Commit[] = [
  {
    hash: "a3f1c0e",
    date: "2021 · 6th grade",
    title: "init: saw 'Python' on a TI-84",
    body: "Calculator menu had an option called Python. Looked it up. Pretty much never closed the tab.",
    tag: "origin",
  },
  {
    hash: "b71ed29",
    date: "2022",
    title: "feat: first scripts that did something real",
    body: "Automation, scrapers, dumb little bots. Learned why functions and loops exist.",
  },
  {
    hash: "c14ab98",
    date: "2023",
    title: "feat: got into typescript + react",
    body: "Stopped staring at terminals long enough to build UIs. Backend was still home though.",
  },
  {
    hash: "f2c8a17",
    date: "2025",
    title: "feat: multi-source-reconciliation-engine",
    body: "Backend engine for reconciling data across multiple sources. First real infra-shaped problem I tried to solve.",
    tag: "open-source",
  },
  {
    hash: "d09f7b3",
    date: "early 2026",
    title: "release: venvsnap",
    body: "Snapshots a venv into a lockfile and restores from a local cache. First library I shipped that other people could actually use.",
    tag: "open-source",
  },
  {
    hash: "HEAD",
    date: "now",
    title: "wip: a python game engine",
    body: "Pygame is showing its age and the alternatives are too niche, so I'm building one. Versatile, modern, mine.",
    tag: "current",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader index="01" title="About" caption="who is this kid" />

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6 text-bone/80 text-[17px] leading-[1.75]"
          >
            <p className="text-bone">
              I'm Oscar. I'm{" "}
              <span className="text-amber-glow font-mono">16</span>, a 10th
              grader from Brooklyn, and I've been at this for about four years.
            </p>
            <p>
              It started in 6th grade math class. I was clicking around the
              TI-84 menu and noticed an option called{" "}
              <span className="font-mono text-amber-glow">Python</span>. I had
              no idea calculators ran anything that wasn't a calculator, so I
              went home, downloaded it, and started typing. Pretty much haven't
              stopped since.
            </p>
            <p>
              I'm self-taught. No bootcamps, no CS degree (yet), just a long
              line of half-finished projects feeding into the next one. These
              days I'm mostly in Python and TypeScript, but backend is the
              part I'm really into. It's more structure, more logic, and the
              problems get more interesting the further down you go.
            </p>
            <p>
              When I'm not at a keyboard I'm probably at the gym, or cornering
              someone with whatever rabbit hole I'm in that week. Distributed
              systems, compilers, how Postgres actually handles MVCC. Pick a
              topic, I'll keep going.
            </p>

            <div className="pt-4 mt-6 border-t border-bone/10 grid grid-cols-3 gap-4 font-mono text-[11px]">
              <div>
                <div className="text-muted uppercase tracking-wider mb-1">
                  loc
                </div>
                <div className="text-bone">brooklyn, ny</div>
              </div>
              <div>
                <div className="text-muted uppercase tracking-wider mb-1">
                  status
                </div>
                <div className="text-amber-glow">10th grade</div>
              </div>
              <div>
                <div className="text-muted uppercase tracking-wider mb-1">
                  shipped
                </div>
                <div className="text-bone">3 oss · ∞ wip</div>
              </div>
            </div>
          </motion.div>

          {/* Git log timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="glass rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-bone/5 bg-ink-950/40">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-glow/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 font-mono text-[11px] text-muted">
                  ~/oscar — git log --oneline --decorate
                </span>
              </div>
              <ol className="relative font-mono text-[13px] py-4">
                {TIMELINE.map((c, i) => (
                  <motion.li
                    key={c.hash}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.06,
                    }}
                    className="relative px-6 py-4 group hover:bg-amber-glow/[0.03] transition-colors"
                  >
                    {/* Vertical line */}
                    {i !== TIMELINE.length - 1 && (
                      <span className="absolute left-[2.05rem] top-9 bottom-0 w-px bg-bone/10" />
                    )}
                    <div className="flex items-start gap-4">
                      <span
                        className={`relative z-10 mt-1.5 w-3 h-3 rounded-full border-2 shrink-0 ${
                          c.tag === "current"
                            ? "bg-amber-glow border-amber-glow animate-pulse"
                            : c.tag
                            ? "bg-ink-900 border-amber-glow"
                            : "bg-ink-900 border-bone/30"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-amber-glow">{c.hash}</span>
                          <span className="text-muted">{c.date}</span>
                          {c.tag && (
                            <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider rounded bg-amber-glow/10 text-amber-glow border border-amber-glow/20">
                              {c.tag}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-bone">{c.title}</div>
                        <div className="mt-1 text-muted text-[12px] leading-relaxed">
                          {c.body}
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ol>
              <div className="px-6 py-3 border-t border-bone/5 bg-ink-950/40 font-mono text-[11px] text-muted flex items-center justify-between">
                <span>
                  <span className="text-amber-glow">$</span> git log --since=2021
                </span>
                <span>{TIMELINE.length} commits</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
