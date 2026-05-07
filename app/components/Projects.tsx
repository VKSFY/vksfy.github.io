"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

type Project = {
  name: string;
  blurb: string;
  why: string;
  tech: string[];
  status: "active" | "shipped";
  href: string;
  accent: "amber" | "indigo";
};

const PROJECTS: Project[] = [
  {
    name: "venvsnap",
    blurb:
      "A Python library that snapshots a virtual environment into a single lockfile and rehydrates it from a local cache.",
    why: "Pip install is slow. requirements.txt drifts. You end up redownloading the same wheels on every machine you touch. venvsnap is the version of pip freeze I actually wanted.",
    tech: ["Python", "click", "wheels", "tomli", "pytest"],
    status: "shipped",
    href: "https://github.com/VKSFY/venvsnap",
    accent: "amber",
  },
  {
    name: "multi-source-reconciliation-engine",
    blurb:
      "A backend engine for reconciling records across multiple data sources: match, merge, and reason about conflicts.",
    why: "When two systems disagree about the same thing, someone has to decide who's right. This engine is the framework for that decision. Pluggable matchers, deterministic merge rules, and an audit trail you can trust at 3am.",
    tech: ["Python", "asyncio", "Postgres", "pydantic", "Redis"],
    status: "shipped",
    href: "https://github.com/VKSFY/multi-source-reconciliation-engine",
    accent: "indigo",
  },
];

const ALSO_BUILT = [
  "saas dashboard prototype",
  "discord automation bot",
  "ts cli scaffolder",
  "personal habit tracker",
  "scrape→summarize pipeline",
  "static site gen",
  "gym log api",
  "midi visualizer",
];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <motion.a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative block rounded-2xl overflow-hidden glass hover:border-amber-glow/30 transition-all duration-500"
    >
      {/* Animated gradient bg */}
      <div
        className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700"
        aria-hidden="true"
      >
        <div
          className={`absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full blur-3xl ${
            p.accent === "amber"
              ? "bg-amber-glow/15"
              : "bg-indigo-500/15"
          } animate-float`}
        />
        <div
          className={`absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full blur-3xl ${
            p.accent === "amber"
              ? "bg-orange-500/10"
              : "bg-blue-500/10"
          }`}
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 p-7 md:p-8 flex flex-col gap-6 h-full">
        <div className="flex items-start justify-between gap-4">
          <div className="font-mono text-[11px] text-muted flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                p.status === "active"
                  ? "bg-amber-glow animate-pulse"
                  : "bg-emerald-400"
              }`}
            />
            <span
              className={`uppercase tracking-wider ${
                p.status === "active"
                  ? "text-amber-glow"
                  : "text-emerald-400"
              }`}
            >
              {p.status}
            </span>
          </div>
          <div className="font-mono text-[11px] text-muted flex items-center gap-1.5">
            github.com/VKSFY
            <span className="text-amber-glow transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </div>
        </div>

        <div>
          <div className="font-mono text-3xl md:text-4xl font-bold tracking-tight text-bone group-hover:text-amber-glow transition-colors">
            {p.name}
          </div>
          <div className="mt-3 text-bone/85 text-[15px] leading-relaxed">
            {p.blurb}
          </div>
        </div>

        <div className="text-muted text-[14px] leading-relaxed border-l-2 border-amber-glow/40 pl-4 italic">
          {p.why}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2 py-1 rounded bg-bone/[0.04] border border-bone/10 text-bone/75 group-hover:border-amber-glow/20 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="pt-2 border-t border-bone/10 flex items-center justify-between font-mono text-[11px]">
          <span className="text-muted">view repo</span>
          <span className="text-amber-glow group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="02"
          title="Projects"
          caption="things i've built / am building"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} p={p} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14"
        >
          <div className="font-mono text-[11px] text-muted mb-4 uppercase tracking-widest flex items-center gap-3">
            <span className="inline-block w-6 h-px bg-bone/20" />
            also built
            <span className="text-bone/30">·</span>
            <span className="text-bone/40 normal-case tracking-normal">
              smaller things, side quests, prototypes
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {ALSO_BUILT.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="font-mono text-[12px] px-3 py-1.5 rounded-full bg-ink-800/60 border border-bone/10 text-bone/70 hover:border-amber-glow/40 hover:text-bone hover:bg-ink-700/60 transition-all cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
