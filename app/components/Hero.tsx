"use client";

import { motion } from "framer-motion";
import Typewriter from "./Typewriter";
import ParticleNetwork from "./ParticleNetwork";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-10 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 relative z-10"
        >
          <div className="font-mono text-[12px] text-amber-glow/80 mb-6 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-amber-glow/60" />
            <span>~/portfolio</span>
            <span className="text-muted">— hello, world.</span>
          </div>

          <h1 className="text-7xl sm:text-8xl lg:text-[9.5rem] font-bold tracking-tighter leading-[0.9] gradient-text">
            Oscar.
          </h1>

          <div className="mt-8 text-2xl sm:text-3xl font-mono">
            <span className="text-muted">$ </span>
            <Typewriter />
          </div>

          <p className="mt-8 max-w-md text-bone/75 text-lg leading-relaxed text-balance">
            I learn something. Then I build with it.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/VKSFY"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-md bg-amber-glow text-ink-950 font-mono text-sm font-semibold hover:bg-amber-soft transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.05.78 2.13v3.16c0 .31.21.66.8.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.73 18.27.5 12 .5Z" />
              </svg>
              github
              <span className="opacity-60 transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>

            <a
              href="#about"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-bone/15 hover:border-amber-glow/50 text-bone/80 hover:text-bone font-mono text-sm transition-colors"
            >
              about me
            </a>
          </div>

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="hidden md:flex absolute -bottom-12 left-0 items-center gap-3 text-muted hover:text-amber-glow transition-colors group"
            aria-label="Scroll down"
          >
            <span className="font-mono text-[11px] tracking-widest uppercase">
              scroll
            </span>
            <span className="block w-12 h-px bg-current" />
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="block"
            >
              ↓
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Right - particle network */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-5 relative h-[420px] lg:h-[520px]"
        >
          <div className="absolute inset-0 rounded-2xl glass overflow-hidden">
            <ParticleNetwork />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 font-mono text-[11px] text-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-glow animate-pulse" />
              <span>graph.live</span>
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[11px] text-muted">
              nodes:&nbsp;<span className="text-amber-glow">active</span>
            </div>
          </div>
          <div className="absolute -inset-4 rounded-2xl bg-amber-glow/[0.04] blur-2xl -z-10" />
        </motion.div>
      </div>

      {/* Footer ticker */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-bone/5 bg-ink-950/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-muted">
          <span>brooklyn, ny</span>
          <span className="hidden sm:inline">
            currently:&nbsp;
            <span className="text-amber-glow">writing a python game engine →</span>
          </span>
          <span>
            v.0<span className="text-amber-glow">4</span>.years
          </span>
        </div>
      </div>
    </section>
  );
}
