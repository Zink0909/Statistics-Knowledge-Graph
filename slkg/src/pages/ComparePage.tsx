import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { KGNode, EdgeType } from "../types";
import { getNode, getOutEdges, getInEdges, searchNodes } from "../lib/graphUtils";
import { DOMAIN_COLOR, DOMAIN_BG, EDGE_COLOR, EDGE_TYPES } from "../lib/constants";
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
  const [q, setQ]           = useState(value?.label ?? "");
  const [results, setResults] = useState<KGNode[]>([]);
  const [open, setOpen]       = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { if (value) setQ(value.label); }, [value]);
  useEffect(() => {
    if (q.length < 2) { setResults([]); setOpen(false); return; }
    const r = searchNodes(q).slice(0, 8);
    setResults(r); setOpen(r.length > 0);
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
        className="input text-sm"
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
              <span className="w-2 h-2 rounded-full" style={{ background: (DOMAIN_COLOR as Record<string, string>)[n.domain] }} />
              <span className="flex-1 truncate text-stone-800">{n.label}</span>
              <span className="text-stone-400">{n.role}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MetaRow({ label, a, b, highlight }: { label: string; a: string; b: string; highlight?: boolean }) {
  const same = a === b;
  return (
    <tr className={highlight ? "bg-stone-50" : ""}>
      <td className="py-2 pr-3 text-xs font-medium text-stone-500 whitespace-nowrap">{label}</td>
      <td className={`py-2 px-3 text-xs rounded ${!same ? "font-medium text-stone-800" : "text-stone-600"}`}>{a}</td>
      <td className="py-2 px-1 text-xs text-stone-300 text-center">{same ? "=" : "≠"}</td>
      <td className={`py-2 pl-3 text-xs rounded ${!same ? "font-medium text-stone-800" : "text-stone-600"}`}>{b}</td>
    </tr>
  );
}

export default function ComparePage() {
  const navigate  = useNavigate();
  const [a, setA] = useState<KGNode | null>(null);
  const [b, setB] = useState<KGNode | null>(null);

  const outA  = a ? getOutEdges(a.id) : [];
  const inA   = a ? getInEdges(a.id)  : [];
  const outB  = b ? getOutEdges(b.id) : [];
  const inB   = b ? getInEdges(b.id)  : [];

  // Shared neighbors
  const neighborsA = new Set([...outA.map(e => e.t), ...inA.map(e => e.s)]);
  const neighborsB = new Set([...outB.map(e => e.t), ...inB.map(e => e.s)]);
  const shared = [...neighborsA].filter(id => neighborsB.has(id));

  // Shared edge types
  const etA = new Set([...outA, ...inA].map(e => e.et));
  const etB = new Set([...outB, ...inB].map(e => e.et));
  const sharedEt = [...etA].filter(et => etB.has(et));

  const canCompare = a && b;

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <h1 className="text-lg font-semibold text-stone-900 mb-1">Compare Concepts</h1>
        <p className="text-sm text-stone-500 mb-6">
          Side-by-side structural comparison of any two concepts.
        </p>

        {/* Pickers */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="card p-4">
            <label className="text-xs font-medium text-stone-500 mb-2 block">Concept A</label>
            <NodeSearch placeholder="Search concept A…" value={a} onChange={setA} />
            {a && (
              <div className="mt-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full"
                  style={{ background: (DOMAIN_COLOR as Record<string, string>)[a.domain] }} />
                <span className="text-sm font-medium text-stone-800">{a.label}</span>
              </div>
            )}
          </div>
          <div className="card p-4">
            <label className="text-xs font-medium text-stone-500 mb-2 block">Concept B</label>
            <NodeSearch placeholder="Search concept B…" value={b} onChange={setB} />
            {b && (
              <div className="mt-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full"
                  style={{ background: (DOMAIN_COLOR as Record<string, string>)[b.domain] }} />
                <span className="text-sm font-medium text-stone-800">{b.label}</span>
              </div>
            )}
          </div>
        </div>

        {canCompare && (
          <>
            {/* Metadata comparison */}
            <div className="card p-5 mb-5">
              <h2 className="text-sm font-semibold text-stone-700 mb-3">Structural properties</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-xs text-stone-400 font-medium text-left py-1 pr-3 w-28">Property</th>
                    <th className="text-xs text-stone-600 font-semibold text-left py-1 px-3">{a!.label}</th>
                    <th className="w-6" />
                    <th className="text-xs text-stone-600 font-semibold text-left py-1 pl-3">{b!.label}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <MetaRow label="Domain"  a={a!.domain} b={b!.domain} />
                  <MetaRow label="Role"    a={a!.role}   b={b!.role}   highlight />
                  <MetaRow label="Type"    a={a!.type}   b={b!.type}   />
                  <MetaRow label="Degree"  a={String(a!.deg)} b={String(b!.deg)} highlight />
                  <MetaRow label="Outgoing" a={String(outA.length)} b={String(outB.length)} />
                  <MetaRow label="Incoming" a={String(inA.length)}  b={String(inB.length)} highlight />
                </tbody>
              </table>
            </div>

            {/* Shared */}
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div className="card p-4">
                <h3 className="text-xs font-semibold text-stone-600 mb-2">
                  Shared neighbors ({shared.length})
                </h3>
                {shared.length > 0 ? (
                  <div className="space-y-1">
                    {shared.slice(0, 10).map(id => {
                      const n = getNode(id);
                      if (!n) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => navigate(`/concept/${id}`)}
                          className="flex items-center gap-2 text-xs text-stone-600 hover:text-stone-900
                                     w-full text-left px-1 py-0.5 rounded hover:bg-stone-50"
                        >
                          <span className="w-1.5 h-1.5 rounded-full"
                            style={{ background: (DOMAIN_COLOR as Record<string, string>)[n.domain] }} />
                          {n.label}
                        </button>
                      );
                    })}
                    {shared.length > 10 && (
                      <div className="text-[10px] text-stone-400">+{shared.length - 10} more</div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-stone-400">No shared neighbors.</p>
                )}
              </div>

              <div className="card p-4">
                <h3 className="text-xs font-semibold text-stone-600 mb-2">
                  Shared edge types ({sharedEt.length})
                </h3>
                {sharedEt.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {sharedEt.map(et => (
                      <span
                        key={et}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ color: EDGE_COLOR[et as EdgeType], background: EDGE_COLOR[et as EdgeType] + "18" }}
                      >
                        {et}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-stone-400">No shared edge types.</p>
                )}
              </div>
            </div>

            {/* Unique to each */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { node: a!, out: outA, inE: inA, other: b! },
                { node: b!, out: outB, inE: inB, other: a! },
              ].map(({ node, out, inE, other }) => {
                const neighborsOther = new Set([
                  ...getOutEdges(other.id).map(e => e.t),
                  ...getInEdges(other.id).map(e => e.s),
                ]);
                const unique = [...new Set([...out.map(e => e.t), ...inE.map(e => e.s)])]
                  .filter(id => !neighborsOther.has(id));

                return (
                  <div key={node.id} className="card p-4">
                    <h3 className="text-xs font-semibold text-stone-600 mb-2">
                      Unique to {node.label} ({unique.length})
                    </h3>
                    {unique.length > 0 ? (
                      <div className="space-y-1">
                        {unique.slice(0, 8).map(id => {
                          const n = getNode(id);
                          if (!n) return null;
                          return (
                            <button
                              key={id}
                              onClick={() => navigate(`/concept/${id}`)}
                              className="flex items-center gap-2 text-xs text-stone-600 hover:text-stone-900
                                         w-full text-left px-1 py-0.5 rounded hover:bg-stone-50"
                            >
                              <span className="w-1.5 h-1.5 rounded-full"
                                style={{ background: (DOMAIN_COLOR as Record<string, string>)[n.domain] }} />
                              {n.label}
                            </button>
                          );
                        })}
                        {unique.length > 8 && (
                          <div className="text-[10px] text-stone-400">+{unique.length - 8} more</div>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-stone-400">All neighbors are shared.</p>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Default state */}
        {!canCompare && (
          <div className="card p-8 text-center text-stone-400 text-sm">
            Select two concepts above to compare their structure.
          </div>
        )}
      </div>
    </div>
  );
}
