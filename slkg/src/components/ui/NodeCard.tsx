import { useNavigate } from "react-router-dom";
import type { KGNode } from "../../types";
import { DOMAIN_COLOR } from "../../lib/constants";
import DomainBadge from "./DomainBadge";

interface Props {
  node: KGNode;
  onClick?: (node: KGNode) => void;
  selected?: boolean;
  showDomain?: boolean;
}

export default function NodeCard({ node, onClick, selected = false, showDomain = true }: Props) {
  const navigate = useNavigate();
  const color    = (DOMAIN_COLOR as Record<string, string>)[node.domain] ?? "#888";

  const handleClick = () => {
    if (onClick) onClick(node);
    else navigate(`/concept/${node.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left px-3 py-2 rounded-lg border transition-all
        flex items-start gap-2.5 group
        ${selected
          ? "border-stone-400 bg-stone-50"
          : "border-stone-100 bg-white hover:border-stone-300 hover:shadow-sm"
        }`}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
        style={{ background: color }}
      />
      <div className="min-w-0 flex-1">
        <div className="text-sm text-stone-800 font-medium truncate group-hover:text-stone-900">
          {node.label}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          {showDomain && <DomainBadge domain={node.domain} short />}
          <span className="text-[10px] text-stone-400">{node.role}</span>
          <span className="text-[10px] text-stone-300">·</span>
          <span className="text-[10px] text-stone-400">{node.deg} links</span>
        </div>
      </div>
    </button>
  );
}
