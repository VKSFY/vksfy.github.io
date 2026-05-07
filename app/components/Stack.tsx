"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const StackGraph = dynamic(() => import("./StackGraph"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] text-muted">
      <span className="animate-pulse">loading graph…</span>
    </div>
  ),
});

const LEGEND = [
  { color: "bg-amber-glow", label: "core (you are here)" },
  { color: "bg-amber-soft", label: "primary languages" },
  { color: "bg-bone", label: "tools, frameworks, infra" },
];

export default function Stack() {
  return (
    <section id="stack" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="03"
          title="Stack"
          caption="not a list — a network"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-12 gap-6"
        >
          <div className="lg:col-span-9 relative h-[480px] sm:h-[560px] rounded-2xl glass overflow-hidden">
            <div className="absolute top-4 left-4 z-10 font-mono text-[11px] text-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-glow animate-pulse" />
              <span>graph.tsx — drag &amp; hover</span>
            </div>
            <StackGraph />
            <div className="absolute bottom-3 right-4 font-mono text-[10px] text-muted/70">
              powered by d3-force
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="glass rounded-xl p-5">
              <div className="font-mono text-[11px] text-amber-glow uppercase tracking-widest mb-3">
                legend
              </div>
              <ul className="space-y-3">
                {LEGEND.map((l) => (
                  <li
                    key={l.label}
                    className="flex items-center gap-3 text-[13px] text-bone/85"
                  >
                    <span className={`w-3 h-3 rounded-full ${l.color}`} />
                    <span>{l.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-xl p-5 text-[13px] text-bone/80 leading-relaxed">
              <div className="font-mono text-[11px] text-amber-glow uppercase tracking-widest mb-3">
                read me
              </div>
              <p>
                Hover any node for a one-liner on what it is and why I use it.
                Drag the satellites around — they'll find a new equilibrium.
                The center is fixed.
              </p>
            </div>

            <div className="glass rounded-xl p-5 font-mono text-[12px] space-y-1.5 text-bone/85">
              <div className="text-amber-glow text-[11px] uppercase tracking-widest mb-2">
                shorthand
              </div>
              <div>
                <span className="text-muted">primary:</span>&nbsp;Python · TS
              </div>
              <div>
                <span className="text-muted">favorite:</span>&nbsp;TypeScript
                <div className="text-muted text-[10px] pl-[3.75rem]">
                  goes anywhere
                </div>
              </div>
              <div>
                <span className="text-muted">learning:</span>&nbsp;Rust · k8s
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
