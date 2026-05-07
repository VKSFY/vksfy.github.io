"use client";

import { motion } from "framer-motion";

type Props = {
  index: string;
  title: string;
  caption?: string;
};

export default function SectionHeader({ index, title, caption }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 flex items-end justify-between gap-6 flex-wrap"
    >
      <div>
        <div className="font-mono text-[12px] text-amber-glow/80 mb-3 flex items-center gap-2">
          <span className="text-amber-glow/60">{index}</span>
          <span className="inline-block w-10 h-px bg-amber-glow/40" />
          <span className="text-muted">{caption ?? "section"}</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
          {title}
        </h2>
      </div>
    </motion.div>
  );
}
