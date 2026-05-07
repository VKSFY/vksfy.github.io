"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SectionHeader from "./SectionHeader";

type Method = {
  cmd: string;
  label: string;
  value: string;
  href: string;
  copy?: string;
};

const METHODS: Method[] = [
  {
    cmd: "$ email",
    label: "email",
    value: "oscar.vaks2010@gmail.com",
    href: "mailto:oscar.vaks2010@gmail.com",
    copy: "oscar.vaks2010@gmail.com",
  },
  {
    cmd: "$ github",
    label: "github",
    value: "github.com/VKSFY",
    href: "https://github.com/VKSFY",
  },
];

function MethodRow({ m, index }: { m: Method; index: number }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async (e: React.MouseEvent) => {
    if (!m.copy) return;
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(m.copy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <motion.a
      href={m.href}
      target={m.href.startsWith("http") ? "_blank" : undefined}
      rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex items-center justify-between gap-4 px-6 py-5 border-b border-bone/5 last:border-b-0 hover:bg-amber-glow/[0.04] transition-colors"
    >
      <div className="flex items-center gap-4 min-w-0">
        <span className="font-mono text-[12px] text-amber-glow/80 shrink-0 w-20">
          {m.cmd}
        </span>
        <span className="font-mono text-[15px] text-bone group-hover:text-amber-glow transition-colors truncate">
          {m.value}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {m.copy && (
          <button
            type="button"
            onClick={onCopy}
            className="font-mono text-[11px] text-muted hover:text-amber-glow px-2 py-1 rounded border border-transparent hover:border-amber-glow/30 transition-colors"
            aria-label={`Copy ${m.label}`}
          >
            {copied ? "copied" : "copy"}
          </button>
        )}
        <span className="font-mono text-[13px] text-amber-glow opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
          ↗
        </span>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          index="05"
          title="Let's talk systems."
          caption="get in touch"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-bone/5 bg-ink-950/40">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-glow/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-3 font-mono text-[11px] text-muted">
              ~/contact — bash
            </span>
          </div>

          <div className="px-6 py-6 border-b border-bone/5">
            <div className="font-mono text-[13px] text-bone/85 leading-relaxed">
              <span className="text-amber-glow">$</span> whoami
              <br />
              <span className="text-muted">→ oscar, brooklyn, 10th grade</span>
              <br />
              <br />
              <span className="text-amber-glow">$</span> echo "i'm easy to find. pick a channel:"
            </div>
          </div>

          <div>
            {METHODS.map((m, i) => (
              <MethodRow key={m.label} m={m} index={i} />
            ))}
          </div>

          <div className="px-6 py-4 border-t border-bone/5 bg-ink-950/40 flex items-center justify-between font-mono text-[11px] text-muted">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>open inbox · responds from brooklyn</span>
            </span>
            <span className="hidden sm:inline">no form, no spam. just say hi.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
