import { useRef, useEffect, useCallback, useState } from "react";
import * as d3 from "d3";
import type { KGNode, KGEdge, SimNode, SimLink, EdgeType } from "../../types";
import { DOMAIN_COLOR, EDGE_COLOR, ROLE_SIZE } from "../../lib/constants";

interface Props {
  nodes: KGNode[];
  edges: KGEdge[];
  selectedId?: string | null;
  egoRootId?: string | null;
  onSelectNode?: (node: KGNode) => void;
  onDblClickNode?: (node: KGNode) => void;
  className?: string;
}

const DPR = Math.min(window.devicePixelRatio || 1, 2);

function nodeRadius(role: string): number {
  return (ROLE_SIZE as Record<string, number>)[role] ?? 6;
}

export default function KGCanvas({
  nodes,
  edges,
  selectedId,
  egoRootId,
  onSelectNode,
  onDblClickNode,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const stateRef  = useRef({
    nodes: [] as SimNode[],
    links: [] as SimLink[],
    transform: { x: 0, y: 0, k: 1 },
    sim: null as ReturnType<typeof d3.forceSimulation> | null,
    animFrame: 0,
    W: 0,
    H: 0,
  });
  const [hoverId, setHoverId] = useState<string | null>(null);

  // ── Init / resize canvas ────────────────────────────────────────────────────
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;
    const { width, height } = wrap.getBoundingClientRect();
    canvas.width  = Math.floor(width  * DPR);
    canvas.height = Math.floor(height * DPR);
    canvas.style.width  = width  + "px";
    canvas.style.height = height + "px";
    stateRef.current.W = width;
    stateRef.current.H = height;
  }, []);

  // ── Render ──────────────────────────────────────────────────────────────────
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { nodes: sNodes, links: sLinks, transform: tf, W, H } = stateRef.current;
    const { x, y, k } = tf;

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(k, k);

    // highlighted set
    const hl = new Set<string>();
    if (selectedId) {
      hl.add(selectedId);
      sLinks.forEach(l => {
        const s = (l.source as SimNode).id ?? l.source as string;
        const t = (l.target as SimNode).id ?? l.target as string;
        if (s === selectedId) hl.add(t);
        if (t === selectedId) hl.add(s);
      });
    }
    const hasHL  = selectedId != null;
    const dimAlp = hasHL ? 0.07 : 1;

    // edges
    for (const l of sLinks) {
      const s = typeof l.source === "object" ? l.source : sNodes.find(n => n.id === l.source);
      const t = typeof l.target === "object" ? l.target : sNodes.find(n => n.id === l.target);
      if (!s || !t) continue;
      const isHL = !hasHL || (hl.has(s.id) && hl.has(t.id));
      const c    = EDGE_COLOR[l.et] ?? "#aaa";

      ctx.globalAlpha  = isHL ? 0.55 : dimAlp;
      ctx.strokeStyle  = c;
      ctx.lineWidth    = isHL ? 1.4 : 0.5;

      const dx   = t.x - s.x, dy = t.y - s.y;
      const dist = Math.hypot(dx, dy) || 1;
      const tr   = nodeRadius(t.role), sr = nodeRadius(s.role);
      const ex   = t.x - (dx / dist) * tr,  ey  = t.y - (dy / dist) * tr;
      const sx2  = s.x + (dx / dist) * sr,  sy2 = s.y + (dy / dist) * sr;

      ctx.beginPath();
      l.et === "corresponds_to" ? ctx.setLineDash([4, 3]) : ctx.setLineDash([]);
      ctx.moveTo(sx2, sy2); ctx.lineTo(ex, ey); ctx.stroke();
      ctx.setLineDash([]);

      if (l.et !== "corresponds_to" && isHL) {
        const ang = Math.atan2(dy, dx), ah = 6;
        ctx.globalAlpha = 0.75; ctx.fillStyle = c;
        ctx.beginPath(); ctx.moveTo(ex, ey);
        ctx.lineTo(ex - ah * Math.cos(ang - .42), ey - ah * Math.sin(ang - .42));
        ctx.lineTo(ex - ah * Math.cos(ang + .42), ey - ah * Math.sin(ang + .42));
        ctx.closePath(); ctx.fill();
      }
    }

    // nodes (back to front by role size)
    const sorted = [...sNodes].sort((a, b) => nodeRadius(a.role) - nodeRadius(b.role));
    for (const n of sorted) {
      const r      = nodeRadius(n.role);
      const color  = (DOMAIN_COLOR as Record<string, string>)[n.domain] ?? "#aaa";
      const isHL   = !hasHL || hl.has(n.id);
      const isSel  = n.id === selectedId;
      const isRoot = n.id === egoRootId;
      const isHov  = n.id === hoverId;

      // glow for Core/Branch
      if ((n.role === "Core" || n.role === "Branch") && isHL) {
        ctx.globalAlpha = 0.12;
        ctx.beginPath(); ctx.arc(n.x, n.y, r + 5, 0, 2 * Math.PI);
        ctx.fillStyle = color; ctx.fill();
      }

      ctx.globalAlpha = isHL ? 1 : dimAlp;
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 2 * Math.PI);
      ctx.fillStyle = color; ctx.fill();

      if (isRoot) {
        ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.globalAlpha = 1; ctx.stroke();
        ctx.beginPath(); ctx.arc(n.x, n.y, r + 8, 0, 2 * Math.PI);
        ctx.globalAlpha = 0.22; ctx.lineWidth = 2; ctx.stroke();
      } else if (isSel) {
        ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.globalAlpha = 1; ctx.stroke();
      } else if (isHov && !isSel) {
        ctx.strokeStyle = "#888"; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.4; ctx.stroke();
      }

      const showLbl =
        isRoot ||
        (isHL && (isSel || hl.has(n.id) || n.deg >= 8)) ||
        (egoRootId && isHL) ||
        k > 2;

      if (showLbl) {
        ctx.globalAlpha = isHL ? 0.9 : dimAlp * 0.4;
        ctx.fillStyle   = "#1a1a18";
        const fs = Math.max(9, 11 / k);
        ctx.font = `${isRoot || isSel ? 600 : 400} ${fs}px -apple-system,sans-serif`;
        ctx.textAlign = "center";
        const lbl = n.label.length > 26 ? n.label.slice(0, 25) + "…" : n.label;
        ctx.fillText(lbl, n.x, n.y - r - 5);
      }
    }

    ctx.globalAlpha = 1;
    ctx.restore();
  }, [selectedId, egoRootId, hoverId]);

  // ── Hit test ────────────────────────────────────────────────────────────────
  const hitNode = useCallback((mx: number, my: number): SimNode | null => {
    const { nodes: sNodes, transform: tf } = stateRef.current;
    const wx = (mx - tf.x) / tf.k;
    const wy = (my - tf.y) / tf.k;
    for (let i = sNodes.length - 1; i >= 0; i--) {
      const n = sNodes[i];
      const r = nodeRadius(n.role) + 7;
      if (Math.hypot(n.x - wx, n.y - wy) <= r) return n;
    }
    return null;
  }, []);

  // ── Build simulation ────────────────────────────────────────────────────────
  useEffect(() => {
    const st = stateRef.current;
    if (st.sim) { st.sim.stop(); st.sim = null; }
    if (!stateRef.current.W) return;

    const W = st.W, H = st.H;

    const pos: Record<string, { x: number; y: number }> = {};
    st.nodes.forEach(n => { pos[n.id] = { x: n.x, y: n.y }; });

    st.nodes = nodes.map(n => ({
      ...n,
      x:  pos[n.id]?.x ?? W / 2 + (Math.random() - .5) * 300,
      y:  pos[n.id]?.y ?? H / 2 + (Math.random() - .5) * 300,
      vx: 0, vy: 0,
    }));
    st.links = edges.map(e => ({ source: e.s, target: e.t, et: e.et }));

    const count     = nodes.length;
    const charge    = Math.max(-700, -90 - count * 4);
    const linkDist  = count < 20 ? 110 : count < 60 ? 88 : 70;
    const linkStr   = count < 20 ? 0.65 : 0.4;

    st.sim = d3.forceSimulation(st.nodes as unknown as d3.SimulationNodeDatum[])
      .force("link",   d3.forceLink(st.links).id((d: unknown) => (d as SimNode).id).distance(linkDist).strength(linkStr))
      .force("charge", d3.forceManyBody().strength(charge).distanceMax(400))
      .force("center", d3.forceCenter(W / 2, H / 2).strength(0.06))
      .force("col",    d3.forceCollide().radius((d: unknown) => nodeRadius((d as SimNode).role) + 3))
      .alphaDecay(0.025)
      .on("tick", render);

    setTimeout(() => { if (st.sim) st.sim.alphaTarget(0); }, 6000);
  }, [nodes, edges, render]);

  // ── Events ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const st = stateRef.current;

    let isPan = false, panSx = 0, panSy = 0, panOx = 0, panOy = 0;
    let dragN: SimNode | null = null, dragMoved = false;

    const getPos = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      return { mx: e.clientX - r.left, my: e.clientY - r.top };
    };

    const onDown = (e: MouseEvent) => {
      const { mx, my } = getPos(e);
      const h = hitNode(mx, my);
      if (h) { dragN = h; dragMoved = false; }
      else   { isPan = true; panSx = e.clientX; panSy = e.clientY; panOx = st.transform.x; panOy = st.transform.y; }
    };
    const onMove = (e: MouseEvent) => {
      const { mx, my } = getPos(e);
      if (dragN) {
        const wx = (mx - st.transform.x) / st.transform.k;
        const wy = (my - st.transform.y) / st.transform.k;
        dragN.x = wx; dragN.y = wy; dragN.fx = wx; dragN.fy = wy;
        dragMoved = true;
        if (st.sim) st.sim.alpha(0.3).restart();
        render();
      } else if (isPan) {
        st.transform.x = panOx + (e.clientX - panSx);
        st.transform.y = panOy + (e.clientY - panSy);
        render();
      }
      // hover
      const h = hitNode(mx, my);
      const newHov = h?.id ?? null;
      setHoverId(prev => { if (prev !== newHov) { render(); return newHov; } return prev; });
      canvas.style.cursor = h ? "pointer" : "default";
    };
    const onUp = (e: MouseEvent) => {
      if (dragN && !dragMoved) {
        const { mx, my } = getPos(e);
        const h = hitNode(mx, my);
        if (h) onSelectNode?.(h);
      }
      if (dragN) { dragN.fx = null; dragN.fy = null; }
      dragN = null; isPan = false;
    };
    const onDblClick = (e: MouseEvent) => {
      const { mx, my } = getPos(e);
      const h = hitNode(mx, my);
      if (h) onDblClickNode?.(h);
    };
    const onLeave = () => { setHoverId(null); canvas.style.cursor = "default"; };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const { mx, my } = getPos(e as unknown as MouseEvent);
      const f  = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      const ns = Math.max(0.05, Math.min(15, st.transform.k * f));
      st.transform.x = mx - (mx - st.transform.x) * (ns / st.transform.k);
      st.transform.y = my - (my - st.transform.y) * (ns / st.transform.k);
      st.transform.k = ns;
      render();
    };

    canvas.addEventListener("mousedown",   onDown);
    canvas.addEventListener("mousemove",   onMove);
    canvas.addEventListener("mouseup",     onUp);
    canvas.addEventListener("dblclick",    onDblClick);
    canvas.addEventListener("mouseleave",  onLeave);
    canvas.addEventListener("wheel",       onWheel, { passive: false });

    return () => {
      canvas.removeEventListener("mousedown",   onDown);
      canvas.removeEventListener("mousemove",   onMove);
      canvas.removeEventListener("mouseup",     onUp);
      canvas.removeEventListener("dblclick",    onDblClick);
      canvas.removeEventListener("mouseleave",  onLeave);
      canvas.removeEventListener("wheel",       onWheel);
    };
  }, [hitNode, render, onSelectNode, onDblClickNode]);

  // ── Resize observer ──────────────────────────────────────────────────────────
  useEffect(() => {
    resize();
    const ro = new ResizeObserver(() => {
      const prevW = stateRef.current.W;
      const prevH = stateRef.current.H;
      resize();
      const nextW = stateRef.current.W;
      const nextH = stateRef.current.H;
      // Canvas just got real dimensions for the first time — restart sim
      if ((prevW === 0 || prevH === 0) && nextW > 0 && nextH > 0) {
        const st = stateRef.current;
        if (st.sim) { st.sim.stop(); st.sim = null; }
        if (st.nodes.length > 0) {
          st.nodes.forEach(n => {
            if (!n.x || Math.abs(n.x) < 1) {
              n.x = nextW / 2 + (Math.random() - 0.5) * 300;
              n.y = nextH / 2 + (Math.random() - 0.5) * 300;
            }
          });
          const count = st.nodes.length;
          const charge = Math.max(-700, -90 - count * 4);
          const linkDist = count < 20 ? 110 : count < 60 ? 88 : 70;
          st.sim = d3.forceSimulation(st.nodes as unknown as d3.SimulationNodeDatum[])
            .force("link",   d3.forceLink(st.links).id((d: unknown) => (d as SimNode).id).distance(linkDist).strength(0.4))
            .force("charge", d3.forceManyBody().strength(charge).distanceMax(400))
            .force("center", d3.forceCenter(nextW / 2, nextH / 2).strength(0.06))
            .force("col",    d3.forceCollide().radius((d: unknown) => nodeRadius((d as SimNode).role) + 3))
            .alphaDecay(0.025)
            .on("tick", render);
          setTimeout(() => { if (st.sim) st.sim.alphaTarget(0); }, 6000);
        }
      }
    });
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [resize, render]);

  return (
    <div ref={wrapRef} className={`relative w-full h-full ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
