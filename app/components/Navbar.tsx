"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const links = [
  { label: "about", href: "#about" },
  { label: "projects", href: "#projects" },
  { label: "stack", href: "#stack" },
  { label: "now", href: "#now" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-ink-900/70 border-b border-amber-glow/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#top"
          className="font-mono text-sm tracking-tight flex items-center gap-2 group"
        >
          <span className="w-2 h-2 rounded-full bg-amber-glow group-hover:animate-pulse" />
          <span className="text-bone">oscar</span>
          <span className="text-muted">.dev</span>
        </a>
        <div className="hidden md:flex items-center gap-7 font-mono text-[13px]">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted hover:text-bone transition-colors link-underline"
            >
              <span className="text-amber-glow/60 mr-1">0{i + 1}.</span>
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="https://github.com/VKSFY"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[12px] px-3 py-1.5 rounded border border-amber-glow/30 text-amber-glow hover:bg-amber-glow/10 transition-colors"
        >
          github →
        </a>
      </div>
    </motion.nav>
  );
}
