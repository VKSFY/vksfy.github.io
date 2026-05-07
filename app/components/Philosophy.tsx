"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const STATS = [
  { value: "4", label: "years self-taught", note: "no bootcamps, no degrees" },
  { value: "3", label: "open source projects", note: "small, but mine" },
  { value: "∞", label: "small builds", note: "the ones that taught me everything" },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="04"
          title="Philosophy"
          caption="why i do this"
        />

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative glass-amber rounded-3xl p-10 md:p-16 overflow-hidden"
        >
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-amber-glow/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative">
            <div className="font-mono text-amber-glow text-7xl leading-none mb-6 select-none">
              "
            </div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.3] text-balance text-bone">
              I don't learn to put things on a resume.
              <br className="hidden md:block" />
              <span className="text-bone/70">
                {" "}
                I learn because I want to build the next thing —
              </span>{" "}
              <span className="text-amber-glow">
                and building it teaches me more than any course ever could.
              </span>
            </p>

            <div className="mt-10 flex items-center gap-3 font-mono text-[12px] text-muted">
              <span className="inline-block w-8 h-px bg-amber-glow/60" />
              <span>oscar — somewhere in brooklyn, ~3am</span>
            </div>
          </div>
        </motion.blockquote>

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
