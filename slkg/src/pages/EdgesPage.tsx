import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { EdgeType } from "../types";
import { allEdges, getNode } from "../lib/graphUtils";
import { EDGE_TYPES, EDGE_COLOR, EDGE_DESCRIPTION, DOMAIN_COLOR } from "../lib/constants";

export default function EdgesPage() {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState<EdgeType>("requires");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"confidence" | "source" | "target">("confidence");

  const edges = useMemo(() => {
    let pool = allEdges.filter(e => e.et === activeType);
    if (query.trim()) {
      const q = query.toLowerCase();
      pool = pool.filter(e => {
        const s = getNode(e.s), t = getNode(e.t);
        return (
          s?.label.toLowerCase().includes(q) ||
          t?.label.toLowerCase().includes(q) ||
          e.s.includes(q) || e.t.includes(q)
        );
      });
    }
    return [...pool].sort((a, b) => {
      if (sortBy === "confidence") return b.c - a.c;
      if (sortBy === "source") return (getNode(a.s)?.label ?? "").localeCompare(getNode(b.s)?.label ?? "");
      return (getNode(a.t)?.label ?? "").localeCompare(getNode(b.t)?.label ?? "");
    });
  }, [activeType, query, sortBy]);

  const color = EDGE_COLOR[activeType];

  return (
    <div className="flex h-full">
      {/* Sidebar — edge type list */}
      <div className="w-52 border-r border-stone-200 bg-white flex-shrink-0 overflow-y-auto py-4 px-2">
        <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-3 px-2">
          Edge types
        </div>
        {EDGE_TYPES.map(et => {
          const count = allEdges.filter(e => e.et === et).length;
          return (
            <button
              key={et}
              onClick={() => { setActiveType(et); setQuery(""); }}
              className={`w-full text-left px-3 py-2 rounded-lg mb-0.5 flex items-center gap-2 transition-colors
                ${activeType === et
                  ? "bg-stone-100 text-stone-900"
                  : "text-stone-500 hover:bg-stone-50 hover:text-stone-700"
                }`}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: EDGE_COLOR[et] }} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">{et}</div>
              </div>
              <span className="text-[10px] text-stone-400 flex-shrink-0">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Header */}
        <div className="bg-white border-b border-stone-200 px-5 py-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full" style={{ background: color }} />
            <div>
              <h2 className="text-sm font-semibold text-stone-900">{activeType}</h2>
              <p className="text-xs text-stone-500">{EDGE_DESCRIPTION[activeType]}</p>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white border-b border-stone-100 px-5 py-2 flex items-center gap-3 flex-shrink-0">
          <input
            className="input h-7 flex-1 text-xs"
            placeholder="Filter by concept name…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-1 text-xs text-stone-500">
            Sort:
            {(["confidence", "source", "target"] as const).map(s => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-2 py-0.5 rounded capitalize ${
                  sortBy === s ? "bg-stone-100 font-medium text-stone-800" : "hover:bg-stone-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <span className="text-xs text-stone-400 flex-shrink-0">{edges.length} edges</span>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="text-left text-[10px] font-semibold text-stone-400 uppercase tracking-wider
                               px-5 py-2 w-2/5">
                  Source
                </th>
                <th className="text-center text-[10px] font-semibold text-stone-400 uppercase tracking-wider
                               px-3 py-2 w-16">
                  Type
                </th>
                <th className="text-left text-[10px] font-semibold text-stone-400 uppercase tracking-wider
                               px-5 py-2 w-2/5">
                  Target
                </th>
                <th className="text-right text-[10px] font-semibold text-stone-400 uppercase tracking-wider
                               px-5 py-2 w-16">
                  Conf.
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {edges.map((e, i) => {
                const src = getNode(e.s);
                const tgt = getNode(e.t);
                const sc  = src ? (DOMAIN_COLOR as Record<string, string>)[src.domain] : "#aaa";
                const tc  = tgt ? (DOMAIN_COLOR as Record<string, string>)[tgt.domain] : "#aaa";
                return (
                  <tr key={`${e.s}-${e.t}-${i}`} className="hover:bg-stone-50 transition-colors">
                    <td className="px-5 py-2">
                      <button
                        onClick={() => navigate(`/concept/${e.s}`)}
                        className="flex items-center gap-2 text-xs text-stone-700 hover:text-stone-900 text-left"
                      >
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: sc }} />
                        <span className="truncate max-w-[180px]">{src?.label ?? e.s}</span>
                      </button>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span
                        className="text-[10px] font-medium"
                        style={{ color }}
                      >
                        →
                      </span>
                    </td>
                    <td className="px-5 py-2">
                      <button
                        onClick={() => navigate(`/concept/${e.t}`)}
                        className="flex items-center gap-2 text-xs text-stone-700 hover:text-stone-900 text-left"
                      >
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: tc }} />
                        <span className="truncate max-w-[180px]">{tgt?.label ?? e.t}</span>
                      </button>
                    </td>
                    <td className="px-5 py-2 text-right">
                      <span className={`text-[10px] font-medium ${
                        e.c >= 0.95 ? "text-stone-500" : e.c >= 0.85 ? "text-amber-600" : "text-red-500"
                      }`}>
                        {(e.c * 100).toFixed(0)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {!edges.length && (
            <div className="text-center text-stone-400 text-sm py-16">
              No edges match the current filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
