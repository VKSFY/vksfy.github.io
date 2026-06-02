"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

// Update this whenever something changes — the "feel alive" trick
const LAST_UPDATED = "2026-06-02";

const NOW_ITEMS: { cmd: string; title: string; body?: string }[] = [
  {
    cmd: "$ next",
    title: "between builds",
    body: "just shipped keel. scoping the next thing.",
  },
  {
    cmd: "$ learning",
    title: "rust · kubernetes",
  },
];

const STATS = [
  { value: "4", label: "years self-taught", note: "no bootcamps, no degrees" },
  { value: "5", label: "open source projects", note: "small, but mine" },
  { value: "∞", label: "small builds", note: "the ones that taught me everything" },
];

export default function Philosophy() {
  return (
    <section id="now" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="04"
          title="/now"
          caption="what's on my desk this week"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-bone/5 bg-ink-950/40">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-glow/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-3 font-mono text-[11px] text-muted">
              ~/now — last updated {LAST_UPDATED}
            </span>
          </div>

          <ol className="font-mono">
            {NOW_ITEMS.map((it, i) => (
              <motion.li
                key={it.cmd}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="px-6 py-5 border-b border-bone/5 last:border-b-0 grid grid-cols-1 sm:grid-cols-[8rem_1fr] gap-1 sm:gap-4 hover:bg-amber-glow/[0.03] transition-colors"
              >
                <div className="text-amber-glow/85 text-[13px] shrink-0">
                  {it.cmd}
                </div>
                <div>
                  <div className="text-bone text-[15px]">{it.title}</div>
                  {it.body && (
                    <div className="text-muted text-[12.5px] mt-1 leading-relaxed sans">
                      {it.body}
                    </div>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>

          <div className="px-6 py-3 border-t border-bone/5 bg-ink-950/40 font-mono text-[11px] text-muted flex items-center justify-between">
            <span>
              <span className="text-amber-glow">$</span> ls ~/this-week
            </span>
            <span>
              {NOW_ITEMS.length} entries{" "}
              <span className="text-bone/30">·</span> stale by design
            </span>
          </div>
        </motion.div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-6 hover:border-amber-glow/30 transition-colors"
            >
              <div className="font-mono text-5xl font-bold gradient-text leading-none">
                {s.value}
              </div>
              <div className="mt-3 text-[14px] text-bone">{s.label}</div>
              <div className="mt-1 text-[12px] text-muted">{s.note}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
