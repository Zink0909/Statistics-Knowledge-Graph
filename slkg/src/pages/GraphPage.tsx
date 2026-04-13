import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import KGCanvas from "../components/graph/KGCanvas";
import NodePanel from "../components/graph/NodePanel";
import type { KGNode, Domain, EdgeType } from "../types";
import { DOMAINS, EDGE_TYPES, DOMAIN_COLOR } from "../lib/constants";
import { allNodes, allEdges, egoNetwork, searchNodes } from "../lib/graphUtils";

const DEFAULT_DEG = 5;

export default function GraphPage() {
  const navigate = useNavigate();

  const [domainFilter, setDomainFilter] = useState<Domain | "">("");
  const [etypeFilter,  setEtypeFilter]  = useState<EdgeType | "">("");
  const [query,        setQuery]        = useState("");
  const [minDeg,       setMinDeg]       = useState(DEFAULT_DEG);
  const [selectedNode, setSelectedNode] = useState<KGNode | null>(null);
  const [egoRoot,      setEgoRoot]      = useState<string | null>(null);

  const isEgoMode = egoRoot !== null;

  // ── Visible nodes / edges ─────────────────────────────────────────────────
  const { visNodes, visEdges } = useMemo(() => {
    if (isEgoMode) {
      const ego = egoNetwork(egoRoot!, etypeFilter || undefined);
      return { visNodes: ego.nodes, visEdges: ego.edges };
    }

    let pool = allNodes;
    if (domainFilter) pool = pool.filter(n => n.domain === domainFilter);

    let fn: KGNode[];
    if (query.trim().length >= 2) {
      const matches = new Set(searchNodes(query).map(n => n.id));
      // include 1-hop neighbors
      allEdges.forEach(e => {
        if (matches.has(e.s)) matches.add(e.t);
        if (matches.has(e.t)) matches.add(e.s);
      });
      fn = pool.filter(n => matches.has(n.id));
    } else {
      fn = [...pool].sort((a, b) => b.deg - a.deg).slice(0, Math.max(10, minDeg * 4));
      fn = fn.filter(n => n.deg >= minDeg);
    }

    const ns = new Set(fn.map(n => n.id));
    let fe = allEdges.filter(e => ns.has(e.s) && ns.has(e.t));
    if (etypeFilter) fe = fe.filter(e => e.et === etypeFilter);

    return { visNodes: fn, visEdges: fe };
  }, [domainFilter, etypeFilter, query, minDeg, isEgoMode, egoRoot]);

  const handleSelectNode = useCallback((node: KGNode) => {
    setSelectedNode(prev => prev?.id === node.id ? null : node);
  }, []);

  const handleDblClick = useCallback((node: KGNode) => {
    setEgoRoot(node.id);
    setSelectedNode(node);
  }, []);

  const enterEgo = (id: string) => {
    setEgoRoot(id);
    const n = allNodes.find(x => x.id === id);
    if (n) setSelectedNode(n);
  };

  const exitEgo = () => {
    setEgoRoot(null);
    setSelectedNode(null);
  };

  return (
    <div className="flex h-full">
      {/* ── Canvas area ── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-stone-200 bg-white flex-shrink-0 flex-wrap">
          {isEgoMode ? (
            <button onClick={exitEgo} className="btn text-xs">
              ← Overview
            </button>
          ) : (
            <>
              <select
                className="text-xs border border-stone-200 rounded-md px-2 py-1 bg-white text-stone-700 outline-none"
                value={domainFilter}
                onChange={e => setDomainFilter(e.target.value as Domain | "")}
              >
                <option value="">All domains</option>
                {DOMAINS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <select
                className="text-xs border border-stone-200 rounded-md px-2 py-1 bg-white text-stone-700 outline-none"
                value={etypeFilter}
                onChange={e => setEtypeFilter(e.target.value as EdgeType | "")}
              >
                <option value="">All edge types</option>
                {EDGE_TYPES.map(et => (
                  <option key={et} value={et}>{et}</option>
                ))}
              </select>

              <input
                className="text-xs border border-stone-200 rounded-md px-2 py-1 w-36 outline-none"
                placeholder="Filter nodes…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />

              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <span>Min degree</span>
                <input
                  type="range" min={1} max={12} value={minDeg} step={1}
                  className="w-20"
                  onChange={e => setMinDeg(+e.target.value)}
                />
                <span className="w-4">{minDeg}</span>
              </div>
            </>
          )}

          <div className="ml-auto text-xs text-stone-400">
            {visNodes.length} nodes · {visEdges.length} edges
            {isEgoMode && (
              <span className="ml-2 text-stone-500">
                Ego: {allNodes.find(n => n.id === egoRoot)?.label}
              </span>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 min-h-0 relative">
          <KGCanvas
            nodes={visNodes}
            edges={visEdges}
            selectedId={selectedNode?.id}
            egoRootId={egoRoot}
            onSelectNode={handleSelectNode}
            onDblClickNode={handleDblClick}
            className="bg-stone-50"
          />

          {/* Hint overlay when nothing selected */}
          {!selectedNode && !isEgoMode && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-stone-400
                            bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-stone-200
                            pointer-events-none">
              Click to select · Double-click for ego view · Scroll to zoom
            </div>
          )}

          {/* Ego mode ring legend */}
          {isEgoMode && (
            <div className="absolute top-3 left-3 text-xs text-stone-500
                            bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-stone-200
                            pointer-events-none space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-stone-800 inline-block" />
                Root node
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-400 inline-block" />
                Direct (1-hop)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-stone-300 inline-block" />
                Second-hop
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="w-64 border-l border-stone-200 bg-white flex-shrink-0 flex flex-col overflow-hidden">
        {selectedNode ? (
          <NodePanel
            node={selectedNode}
            isEgoMode={isEgoMode}
            onEnterEgo={enterEgo}
            onClose={() => setSelectedNode(null)}
          />
        ) : (
          <div className="flex flex-col h-full">
            {/* Domain legend */}
            <div className="px-4 py-3 border-b border-stone-100">
              <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                Domain
              </div>
              {DOMAINS.map(d => (
                <button
                  key={d}
                  onClick={() => setDomainFilter(domainFilter === d ? "" : d as Domain)}
                  className={`flex items-center gap-2 w-full text-left mb-1 rounded px-1 py-0.5
                    ${domainFilter === d ? "bg-stone-100" : "hover:bg-stone-50"}`}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: (DOMAIN_COLOR as Record<string, string>)[d] }} />
                  <span className="text-xs text-stone-600 truncate">{d}</span>
                </button>
              ))}
            </div>

            {/* Hint */}
            <div className="px-4 py-3 text-xs text-stone-400 leading-relaxed">
              <p>Click a node to see its connections.</p>
              <p className="mt-2">Double-click to enter ego (radial) view.</p>
              <p className="mt-2">Use filters above to focus on a domain or edge type.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
