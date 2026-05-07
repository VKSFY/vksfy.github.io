"use client";

import { useEffect, useRef, useState } from "react";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  Simulation,
} from "d3-force";

type StackNode = {
  id: string;
  group: 0 | 1 | 2;
  parent?: string;
  desc?: string;
  // d3 will populate
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  r?: number;
};

type StackLink = {
  source: string | StackNode;
  target: string | StackNode;
};

const NODES: StackNode[] = [
  { id: "Oscar", group: 0, desc: "the center node — caffeine + curiosity" },

  { id: "Python", group: 1, parent: "Oscar", desc: "first love. backend, scripts, scale." },
  { id: "TypeScript", group: 1, parent: "Oscar", desc: "where ideas become UIs." },
  { id: "React", group: 1, parent: "Oscar", desc: "components, state, hooks." },

  // Python branch
  { id: "FastAPI", group: 2, parent: "Python", desc: "small, fast, async APIs." },
  { id: "asyncio", group: 2, parent: "Python", desc: "concurrency without threads." },
  { id: "pydantic", group: 2, parent: "Python", desc: "types at the edges." },
  { id: "pytest", group: 2, parent: "Python", desc: "tests that don't lie." },
  { id: "click", group: 2, parent: "Python", desc: "good CLIs feel like a shell." },

  // TS branch
  { id: "Node.js", group: 2, parent: "TypeScript", desc: "JS on the server." },
  { id: "Bun", group: 2, parent: "TypeScript", desc: "fast runtime, fast tooling." },
  { id: "tRPC", group: 2, parent: "TypeScript", desc: "types across the wire." },
  { id: "Zod", group: 2, parent: "TypeScript", desc: "runtime types that match static ones." },

  // React branch
  { id: "Next.js", group: 2, parent: "React", desc: "router, server components." },
  { id: "Tailwind", group: 2, parent: "React", desc: "design without leaving the file." },
  { id: "Framer Motion", group: 2, parent: "React", desc: "things in motion feel alive." },

  // Cross-cutting
  { id: "Postgres", group: 2, parent: "Python", desc: "the database I trust." },
  { id: "Redis", group: 2, parent: "Python", desc: "fast cache, queues." },
  { id: "Docker", group: 2, parent: "Oscar", desc: "ship the same env that ran the tests." },
  { id: "Linux", group: 2, parent: "Oscar", desc: "where things actually run." },
  { id: "Git", group: 2, parent: "Oscar", desc: "source of truth." },
];

const LINKS: StackLink[] = NODES.filter((n) => n.parent).map((n) => ({
  source: n.parent!,
  target: n.id,
}));

const GROUP_RADIUS: Record<number, number> = { 0: 22, 1: 13, 2: 7 };

export default function StackGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<Simulation<StackNode, StackLink> | null>(null);
  const stateRef = useRef<{
    nodes: StackNode[];
    links: StackLink[];
    width: number;
    height: number;
    dpr: number;
    hover: StackNode | null;
    drag: StackNode | null;
    pointer: { x: number; y: number };
  }>({
    nodes: [],
    links: [],
    width: 0,
    height: 0,
    dpr: 1,
    hover: null,
    drag: null,
    pointer: { x: 0, y: 0 },
  });
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    node: StackNode;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nodes: StackNode[] = NODES.map((n) => ({
      ...n,
      r: GROUP_RADIUS[n.group],
    }));
    const links: StackLink[] = LINKS.map((l) => ({ ...l }));
    stateRef.current.nodes = nodes;
    stateRef.current.links = links;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      stateRef.current.width = rect.width;
      stateRef.current.height = rect.height;
      stateRef.current.dpr = dpr;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const center = nodes.find((n) => n.group === 0);
    if (center) {
      center.fx = stateRef.current.width / 2;
      center.fy = stateRef.current.height / 2;
    }

    const sim = forceSimulation<StackNode>(nodes)
      .force(
        "link",
        forceLink<StackNode, StackLink>(links)
          .id((d) => d.id)
          .distance((l: any) => {
            const t = l.target as StackNode;
            return t.group === 1 ? 110 : 60;
          })
          .strength(0.6)
      )
      .force("charge", forceManyBody().strength(-220))
      .force(
        "center",
        forceCenter(stateRef.current.width / 2, stateRef.current.height / 2)
      )
      .force(
        "collide",
        forceCollide<StackNode>().radius((d) => (d.r ?? 8) + 8)
      )
      .force("x", forceX(stateRef.current.width / 2).strength(0.04))
      .force("y", forceY(stateRef.current.height / 2).strength(0.04))
      .alphaDecay(0.02)
      .velocityDecay(0.35);

    simRef.current = sim;

    const draw = () => {
      const { width, height, nodes, links, hover } = stateRef.current;
      ctx.clearRect(0, 0, width, height);

      // Draw links
      for (const l of links) {
        const s = (typeof l.source === "string" ? null : l.source) as StackNode;
        const t = (typeof l.target === "string" ? null : l.target) as StackNode;
        if (!s || !t || s.x == null || t.x == null) continue;
        const isHoverEdge =
          hover && (hover.id === s.id || hover.id === t.id);
        ctx.strokeStyle = isHoverEdge
          ? "rgba(245, 158, 11, 0.6)"
          : "rgba(245, 158, 11, 0.18)";
        ctx.lineWidth = isHoverEdge ? 1.4 : 0.7;
        ctx.beginPath();
        ctx.moveTo(s.x!, s.y!);
        ctx.lineTo(t.x!, t.y!);
        ctx.stroke();
      }

      // Draw nodes
      for (const n of nodes) {
        if (n.x == null || n.y == null) continue;
        const r = n.r ?? 6;
        const isHover = hover?.id === n.id;
        const glowR = r * (isHover ? 4.5 : 3);
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        if (n.group === 0) {
          grd.addColorStop(0, "rgba(245, 158, 11, 0.55)");
          grd.addColorStop(1, "rgba(245, 158, 11, 0)");
        } else if (n.group === 1) {
          grd.addColorStop(0, "rgba(245, 158, 11, 0.4)");
          grd.addColorStop(1, "rgba(245, 158, 11, 0)");
        } else {
          grd.addColorStop(0, "rgba(245, 158, 11, 0.25)");
          grd.addColorStop(1, "rgba(245, 158, 11, 0)");
        }
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // core
        if (n.group === 0) {
          ctx.fillStyle = "#f59e0b";
        } else if (n.group === 1) {
          ctx.fillStyle = "#fbbf24";
        } else {
          ctx.fillStyle = isHover ? "#fbbf24" : "#e6e9f0";
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();

        // ring on hover
        if (isHover) {
          ctx.strokeStyle = "rgba(245, 158, 11, 0.9)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2);
          ctx.stroke();
        }

        // label
        const showLabel = n.group <= 1 || isHover;
        if (showLabel) {
          ctx.font = `${n.group === 0 ? "600 14px" : "500 12px"} JetBrains Mono, ui-monospace, monospace`;
          ctx.fillStyle =
            n.group === 0
              ? "#0a0f1e"
              : n.group === 1
              ? "#fff"
              : "#e6e9f0";
          if (n.group === 0) {
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(n.id, n.x, n.y);
          } else {
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillStyle = isHover ? "#f59e0b" : "rgba(230, 233, 240, 0.85)";
            ctx.fillText(n.id, n.x + r + 6, n.y);
          }
        }
      }
    };

    sim.on("tick", draw);

    const onResize = () => {
      resize();
      sim.force(
        "center",
        forceCenter(stateRef.current.width / 2, stateRef.current.height / 2)
      );
      const c = stateRef.current.nodes.find((n) => n.group === 0);
      if (c) {
        c.fx = stateRef.current.width / 2;
        c.fy = stateRef.current.height / 2;
      }
      sim.alpha(0.3).restart();
    };
    window.addEventListener("resize", onResize);

    const findNode = (x: number, y: number): StackNode | null => {
      for (const n of stateRef.current.nodes) {
        if (n.x == null || n.y == null) continue;
        const r = n.r ?? 8;
        const dx = x - n.x;
        const dy = y - n.y;
        if (dx * dx + dy * dy < (r + 6) * (r + 6)) return n;
      }
      return null;
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      stateRef.current.pointer = { x, y };

      if (stateRef.current.drag) {
        stateRef.current.drag.fx = x;
        stateRef.current.drag.fy = y;
        sim.alphaTarget(0.3).restart();
      } else {
        const hit = findNode(x, y);
        stateRef.current.hover = hit;
        canvas.style.cursor = hit ? "grab" : "default";
        if (hit && hit.desc) {
          setTooltip({ x, y, node: hit });
        } else {
          setTooltip(null);
        }
      }
    };

    const onDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const hit = findNode(x, y);
      if (hit && hit.group !== 0) {
        stateRef.current.drag = hit;
        hit.fx = x;
        hit.fy = y;
        canvas.style.cursor = "grabbing";
        sim.alphaTarget(0.3).restart();
      }
    };

    const onUp = () => {
      const drag = stateRef.current.drag;
      if (drag) {
        drag.fx = null;
        drag.fy = null;
      }
      stateRef.current.drag = null;
      sim.alphaTarget(0);
      canvas.style.cursor = stateRef.current.hover ? "grab" : "default";
    };

    const onLeave = () => {
      stateRef.current.hover = null;
      setTooltip(null);
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("mouseleave", onLeave);

    // Gentle ambient drift
    const drift = setInterval(() => {
      if (!stateRef.current.drag && sim.alpha() < 0.05) {
        sim.alpha(0.06).restart();
      }
    }, 5000);

    return () => {
      sim.stop();
      clearInterval(drift);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
      {tooltip && tooltip.node.desc && (
        <div
          className="pointer-events-none absolute z-20 px-3 py-2 rounded-md glass-amber font-mono text-[11px] text-bone max-w-[220px] shadow-xl"
          style={{
            left: Math.min(
              Math.max(tooltip.x + 14, 8),
              (wrapRef.current?.clientWidth ?? 0) - 230
            ),
            top: Math.min(
              tooltip.y + 14,
              (wrapRef.current?.clientHeight ?? 0) - 80
            ),
          }}
        >
          <div className="text-amber-glow font-bold mb-1">
            {tooltip.node.id}
          </div>
          <div className="text-bone/80 leading-relaxed">
            {tooltip.node.desc}
          </div>
        </div>
      )}
    </div>
  );
}
