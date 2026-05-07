"use client";

export default function Footer() {
  return (
    <footer className="relative border-t border-bone/5 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-muted">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-glow" />
          <span>oscar.dev</span>
          <span>—</span>
          <span>built from scratch with next.js, tailwind, framer motion</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#top"
            className="hover:text-amber-glow transition-colors"
          >
            ↑ back to top
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
