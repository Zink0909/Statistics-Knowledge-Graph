import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { KGNode } from "../types";
import { allNodes, findPath, getNode, searchNodes } from "../lib/graphUtils";
import { DOMAIN_COLOR, EDGE_COLOR } from "../lib/constants";
import DomainBadge from "../components/ui/DomainBadge";

function NodeSearch({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: KGNode | null;
  onChange: (n: KGNode | null) => void;
}) {
  const [q,       setQ]       = useState(value?.label ?? "");
  const [results, setResults] = useState<KGNode[]>([]);
  const [open,    setOpen]    = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) setQ(value.label);
  }, [value]);

  useEffect(() => {
    if (q.length < 2) { setResults([]); setOpen(false); return; }
    const r = searchNodes(q).slice(0, 8);
    setResults(r);
    setOpen(r.length > 0);
  }, [q]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input
        className="input"
        placeholder={placeholder}
        value={q}
        onChange={e => { setQ(e.target.value); if (value) onChange(null); }}
        onFocus={() => q.length >= 2 && setOpen(true)}
      />
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 card z-50 py-1 shadow-lg max-h-52 overflow-y-auto">
          {results.map(n => (
            <button
              key={n.id}
              onClick={() => { onChange(n); setQ(n.label); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs hover:bg-stone-50 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: (DOMAIN_COLOR as Record<string, string>)[n.domain] }} />
              <span className="flex-1 truncate text-stone-800">{n.label}</span>
              <span className="text-stone-400 flex-shrink-0">{n.role}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PathPage() {
  const navigate = useNavigate();
  const [fromNode, setFromNode] = useState<KGNode | null>(null);
  const [toNode,   setToNode]   = useState<KGNode | null>(null);

  const result = useMemo(() => {
    if (!fromNode || !toNode) return null;
    return findPath(fromNode.id, toNode.id);
  }, [fromNode, toNode]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-6">
        <h1 className="text-lg font-semibold text-stone-900 mb-1">Learning Path</h1>
        <p className="text-sm text-stone-500 mb-6">
          Find the shortest connection between any two concepts in the graph.
        </p>

        {/* Input row */}
        <div className="card p-5 mb-6">
          <div className="grid grid-cols-2 gap-4 items-end">
            <div>
              <label className="text-xs font-medium text-stone-600 mb-1.5 block">From</label>
              <NodeSearch
                placeholder="Starting concept…"
                value={fromNode}
                onChange={setFromNode}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-600 mb-1.5 block">To</label>
              <NodeSearch
                placeholder="Target concept…"
                value={toNode}
                onChange={setToNode}
              />
            </div>
          </div>

          {fromNode && toNode && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => { setFromNode(toNode); setToNode(fromNode); }}
                className="btn text-xs"
              >
                ⇄ Swap
              </button>
              <button
                onClick={() => { setFromNode(null); setToNode(null); }}
                className="btn text-xs"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Result */}
        {fromNode && toNode && (
          result ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium text-stone-700">
                  Path found — {result.path.length} concepts, {result.edges.length} steps
                </span>
              </div>

              <div className="card p-5">
                {result.path.map((nodeId, i) => {
                  const node = getNode(nodeId);
                  if (!node) return null;
                  const edge = result.edges[i - 1];
                  const color = (DOMAIN_COLOR as Record<string, string>)[node.domain];

                  return (
                    <div key={nodeId}>
                      {edge && (
                        <div className="flex items-center gap-2 ml-6 my-1">
                          <div className="w-px h-6 bg-stone-200 ml-1" />
                          <span
                            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                            style={{ color: EDGE_COLOR[edge.et], background: EDGE_COLOR[edge.et] + "18" }}
                          >
                            {edge.et}
                          </span>
                        </div>
                      )}
                      <div
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer
                          hover:bg-stone-50 transition-colors
                          ${i === 0 || i === result.path.length - 1
                            ? "border-2"
                            : "border border-stone-100"
                          }`}
                        style={{ borderColor: i === 0 || i === result.path.length - 1 ? color : undefined }}
                        onClick={() => navigate(`/concept/${nodeId}`)}
                      >
                        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-stone-800 truncate">{node.label}</div>
                          <div className="flex gap-2 mt-0.5">
                            <DomainBadge domain={node.domain} short />
                            <span className="text-[10px] text-stone-400">{node.role}</span>
                          </div>
                        </div>
                        {i === 0 && (
                          <span className="text-[10px] text-stone-400 flex-shrink-0">Start</span>
                        )}
                        {i === result.path.length - 1 && (
                          <span className="text-[10px] text-stone-400 flex-shrink-0">End</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="card p-8 text-center">
              <div className="text-stone-400 text-sm">
                No path found between{" "}
                <span className="font-medium text-stone-600">{fromNode.label}</span> and{" "}
                <span className="font-medium text-stone-600">{toNode.label}</span>.
              </div>
              <p className="text-xs text-stone-400 mt-2">
                They may be in disconnected parts of the graph.
              </p>
            </div>
          )
        )}

        {/* Suggested paths */}
        {!fromNode && !toNode && (
          <div className="card p-5">
            <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
              Suggested paths
            </div>
            {[
              { from: "normal_distribution",        to: "ordinary_least_squares" },
              { from: "maximum_likelihood_estimation", to: "logistic_regression_model" },
              { from: "hypothesis_testing",          to: "confidence_interval" },
              { from: "prior_probability",           to: "posterior_distribution" },
              { from: "variance",                    to: "ridge_regression" },
            ].map(({ from, to }) => {
              const fn = getNode(from), tn = getNode(to);
              if (!fn || !tn) return null;
              return (
                <button
                  key={from + to}
                  onClick={() => { setFromNode(fn); setToNode(tn); }}
                  className="flex items-center gap-2 w-full text-left px-2 py-2 rounded
                             hover:bg-stone-50 text-xs text-stone-600 hover:text-stone-900"
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: (DOMAIN_COLOR as Record<string, string>)[fn.domain] }} />
                  {fn.label}
                  <span className="text-stone-400">→</span>
                  <span className="w-2 h-2 rounded-full" style={{ background: (DOMAIN_COLOR as Record<string, string>)[tn.domain] }} />
                  {tn.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
