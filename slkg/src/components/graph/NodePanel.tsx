import { useNavigate } from "react-router-dom";
import type { KGNode, KGEdge, EdgeType } from "../../types";
import { DOMAIN_COLOR, DOMAIN_BG, EDGE_COLOR } from "../../lib/constants";
import { getOutEdges, getInEdges, getNode } from "../../lib/graphUtils";

interface Props {
  node: KGNode;
  isEgoMode?: boolean;
  onEnterEgo?: (id: string) => void;
  onClose?: () => void;
}

function EdgeList({
  edges,
  label,
  idKey,
}: {
  edges: KGEdge[];
  label: string;
  idKey: "s" | "t";
}) {
  const navigate = useNavigate();
  if (!edges.length) return null;

  // Group by edge type
  const groups = edges.reduce<Record<EdgeType, KGEdge[]>>(
    (acc, e) => {
      if (!acc[e.et]) acc[e.et] = [];
      acc[e.et].push(e);
      return acc;
    },
    {} as Record<EdgeType, KGEdge[]>
  );

  return (
    <div className="mb-3">
      <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
        {label} ({edges.length})
      </div>
      {(Object.entries(groups) as [EdgeType, KGEdge[]][]).map(([et, grpEdges]) => (
        <div key={et} className="mb-2">
          <div
            className="text-[10px] font-medium mb-1 px-1"
            style={{ color: EDGE_COLOR[et] }}
          >
            {et}
          </div>
          {grpEdges.slice(0, 8).map(e => {
            const neighborId = idKey === "s" ? e.s : e.t;
            const neighbor = getNode(neighborId);
            if (!neighbor) return null;
            return (
              <button
                key={neighborId}
                onClick={() => navigate(`/concept/${neighborId}`)}
                className="w-full text-left px-2 py-1 rounded text-xs text-stone-600
                           hover:bg-stone-100 hover:text-stone-900 transition-colors
                           flex items-center gap-1.5 group"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: (DOMAIN_COLOR as Record<string, string>)[neighbor.domain] }}
                />
                <span className="truncate">{neighbor.label}</span>
              </button>
            );
          })}
          {grpEdges.length > 8 && (
            <div className="text-[10px] text-stone-400 px-2">
              +{grpEdges.length - 8} more
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function NodePanel({ node, isEgoMode, onEnterEgo, onClose }: Props) {
  const navigate  = useNavigate();
  const domColor  = (DOMAIN_COLOR as Record<string, string>)[node.domain] ?? "#888";
  const domBg     = (DOMAIN_BG   as Record<string, string>)[node.domain] ?? "#f5f5f5";
  const outEdges  = getOutEdges(node.id);
  const inEdges   = getInEdges(node.id);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-stone-100 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-stone-900 leading-snug">{node.label}</h2>
          <div className="flex flex-wrap gap-1 mt-1.5">
            <span
              className="badge text-[10px] font-medium"
              style={{ background: domBg, color: domColor }}
            >
              {node.domain}
            </span>
            <span className="badge bg-stone-100 text-stone-500 text-[10px]">
              {node.role}
            </span>
            <span className="badge bg-stone-100 text-stone-500 text-[10px]">
              {node.type}
            </span>
          </div>
          <div className="text-[10px] text-stone-400 mt-1">
            {node.deg} connections
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 text-sm flex-shrink-0 mt-0.5"
          >
            ✕
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 py-2 border-b border-stone-100 flex gap-2 flex-wrap">
        <button
          onClick={() => navigate(`/concept/${node.id}`)}
          className="btn text-xs py-1 px-2"
        >
          Full details →
        </button>
        {!isEgoMode && onEnterEgo && (
          <button
            onClick={() => onEnterEgo(node.id)}
            className="btn text-xs py-1 px-2"
          >
            Ego view ◎
          </button>
        )}
        {isEgoMode && onEnterEgo && (
          <button
            onClick={() => onEnterEgo(node.id)}
            className="btn text-xs py-1 px-2"
          >
            Re-center ◎
          </button>
        )}
      </div>

      {/* Edge lists */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <EdgeList edges={outEdges} label="→ Outgoing" idKey="t" />
        <EdgeList edges={inEdges}  label="← Incoming" idKey="s" />
      </div>
    </div>
  );
}
