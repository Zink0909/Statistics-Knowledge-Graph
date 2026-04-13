import { useParams, useNavigate } from "react-router-dom";
import { getNode, getOutEdges, getInEdges, getNode as gn } from "../lib/graphUtils";
import { DOMAIN_COLOR, DOMAIN_BG, EDGE_COLOR, EDGE_DESCRIPTION, EDGE_TYPES } from "../lib/constants";
import type { EdgeType, KGEdge } from "../types";
import DomainBadge from "../components/ui/DomainBadge";
import { NODE_CONTENT } from "../data/content";
import ContentCard from "../components/ui/ContentCard";

function EdgeGroup({ et, edges, idKey }: { et: EdgeType; edges: KGEdge[]; idKey: "s" | "t" }) {
  const navigate = useNavigate();
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full" style={{ background: EDGE_COLOR[et] }} />
        <span className="text-xs font-semibold" style={{ color: EDGE_COLOR[et] }}>{et}</span>
        <span className="text-[10px] text-stone-400">{EDGE_DESCRIPTION[et]}</span>
      </div>
      <div className="space-y-1 pl-4">
        {edges.map(e => {
          const nbId = idKey === "t" ? e.t : e.s;
          const nb   = gn(nbId);
          if (!nb) return null;
          const c = (DOMAIN_COLOR as Record<string, string>)[nb.domain] ?? "#888";
          return (
            <button
              key={nbId}
              onClick={() => navigate(`/concept/${nbId}`)}
              className="flex items-center gap-2 text-sm text-stone-700 hover:text-stone-900
                         hover:bg-stone-50 rounded px-2 py-1 w-full text-left transition-colors"
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c }} />
              <span className="flex-1 truncate">{nb.label}</span>
              <span className="text-[10px] text-stone-400 flex-shrink-0">{nb.role}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ConceptPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const node = id ? getNode(id) : undefined;
  if (!node) {
    return (
      <div className="flex items-center justify-center h-full text-stone-400 text-sm">
        Concept not found.{" "}
        <button className="ml-2 underline" onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const outEdges = getOutEdges(node.id);
  const inEdges  = getInEdges(node.id);
  const domColor = (DOMAIN_COLOR as Record<string, string>)[node.domain] ?? "#888";
  const domBg    = (DOMAIN_BG   as Record<string, string>)[node.domain] ?? "#f5f5f5";

  // Group by edge type
  const outByType = EDGE_TYPES.reduce<Record<EdgeType, KGEdge[]>>(
    (acc, et) => { acc[et] = outEdges.filter(e => e.et === et); return acc; },
    {} as Record<EdgeType, KGEdge[]>
  );
  const inByType  = EDGE_TYPES.reduce<Record<EdgeType, KGEdge[]>>(
    (acc, et) => { acc[et] = inEdges.filter(e => e.et === et); return acc; },
    {} as Record<EdgeType, KGEdge[]>
  );

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-400 mb-4">
          <button onClick={() => navigate(-1)} className="hover:text-stone-700">← Back</button>
          <span>/</span>
          <button onClick={() => navigate("/explore")} className="hover:text-stone-700">Explore</button>
          <span>/</span>
          <span className="text-stone-600">{node.label}</span>
        </div>

        {/* Header */}
        <div className="card px-6 py-5 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-stone-900">{node.label}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="badge text-xs font-medium"
                  style={{ background: domBg, color: domColor }}>
                  {node.domain}
                </span>
                <span className="badge bg-stone-100 text-stone-600 text-xs">{node.role}</span>
                <span className="badge bg-stone-100 text-stone-600 text-xs">{node.type}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-bold text-stone-700">{node.deg}</div>
              <div className="text-xs text-stone-400">connections</div>
            </div>
          </div>

          <div className="text-xs text-stone-400 mt-3 font-mono">{node.id}</div>

          {/* Quick actions */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => navigate(`/graph?ego=${node.id}`)}
              className="btn text-xs"
            >
              View in graph ⬡
            </button>
            <button
              onClick={() => navigate(`/path?from=${node.id}`)}
              className="btn text-xs"
            >
              Find path →
            </button>
            <button
              onClick={() => navigate(`/compare?a=${node.id}`)}
              className="btn text-xs"
            >
              Compare ⇄
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: "Outgoing",  value: outEdges.length },
            { label: "Incoming",  value: inEdges.length  },
            { label: "Unique types", value: new Set([...outEdges, ...inEdges].map(e => e.et)).size },
            { label: "Avg confidence",
              value: (([...outEdges, ...inEdges].reduce((s, e) => s + e.c, 0) /
                Math.max([...outEdges, ...inEdges].length, 1)) * 100).toFixed(0) + "%" },
          ].map(({ label, value }) => (
            <div key={label} className="card px-4 py-3">
              <div className="text-lg font-semibold text-stone-800">{value}</div>
              <div className="text-xs text-stone-400">{label}</div>
            </div>
          ))}
        </div>

        {/* Content card */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-stone-700 mb-3">Concept overview</h2>
          <ContentCard nodeId={node.id} />
        </div>

        {/* Content card */}
        {NODE_CONTENT[node.id] && (() => {
          const c = NODE_CONTENT[node.id];
          return (
            <div className="card px-6 py-5 mb-6 space-y-4">
              {/* Definition */}
              <div>
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1">Definition</div>
                <p className="text-sm text-stone-700 leading-relaxed">{c.definition}</p>
              </div>

              {/* Formula */}
              {c.formula && (
                <div>
                  <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1">Formula</div>
                  <div className="bg-stone-50 rounded-lg px-4 py-3 font-mono text-sm text-stone-700 overflow-x-auto">
                    {c.formula}
                  </div>
                </div>
              )}

              {/* Parameters */}
              {c.parameters && c.parameters.length > 0 && (
                <div>
                  <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1">Key parameters</div>
                  <ul className="space-y-0.5">
                    {c.parameters.map((p, i) => (
                      <li key={i} className="text-sm text-stone-600 flex items-start gap-2">
                        <span className="text-stone-300 mt-1 flex-shrink-0">·</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Intuition */}
              <div>
                <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1">Intuition</div>
                <p className="text-sm text-stone-600 leading-relaxed italic">{c.intuition}</p>
              </div>

              {/* Confusion */}
              {c.common_confusion && (
                <div className="border-l-2 border-amber-300 pl-3">
                  <div className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider mb-1">Common confusion</div>
                  <p className="text-sm text-stone-600 leading-relaxed">{c.common_confusion}</p>
                </div>
              )}

              {/* Example */}
              {c.example_use && (
                <div className="border-l-2 border-stone-200 pl-3">
                  <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1">Example</div>
                  <p className="text-sm text-stone-600 leading-relaxed">{c.example_use}</p>
                </div>
              )}
            </div>
          );
        })()}

        {/* Relationships */}
        <div className="grid grid-cols-2 gap-6">
          <div className="card px-5 py-4">
            <h2 className="text-sm font-semibold text-stone-700 mb-4">
              Outgoing relationships
            </h2>
            {EDGE_TYPES.filter(et => outByType[et].length > 0).map(et => (
              <EdgeGroup key={et} et={et} edges={outByType[et]} idKey="t" />
            ))}
            {!outEdges.length && (
              <p className="text-xs text-stone-400">No outgoing relationships.</p>
            )}
          </div>

          <div className="card px-5 py-4">
            <h2 className="text-sm font-semibold text-stone-700 mb-4">
              Incoming relationships
            </h2>
            {EDGE_TYPES.filter(et => inByType[et].length > 0).map(et => (
              <EdgeGroup key={et} et={et} edges={inByType[et]} idKey="s" />
            ))}
            {!inEdges.length && (
              <p className="text-xs text-stone-400">No incoming relationships.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
