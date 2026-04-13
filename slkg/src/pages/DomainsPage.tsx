import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Domain, StructuralRole } from "../types";
import { allNodes, allEdges, nodesByDomain } from "../lib/graphUtils";
import { DOMAINS, DOMAIN_COLOR, DOMAIN_BG } from "../lib/constants";
import NodeCard from "../components/ui/NodeCard";

const ROLES: StructuralRole[] = ["Core", "Branch", "Subbranch", "Leaf"];

function DomainCard({ domain }: { domain: Domain }) {
  const navigate = useNavigate();
  const nodes    = nodesByDomain(domain);
  const color    = (DOMAIN_COLOR as Record<string, string>)[domain];
  const bg       = (DOMAIN_BG   as Record<string, string>)[domain];
  const crossOut = allEdges.filter(
    e => allNodes.find(n => n.id === e.s)?.domain === domain &&
         allNodes.find(n => n.id === e.t)?.domain !== domain
  ).length;
  const roleCounts = ROLES.map(r => ({
    role: r,
    count: nodes.filter(n => n.role === r).length,
  })).filter(r => r.count > 0);

  return (
    <div
      className="card p-5 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => navigate(`/explore?domain=${encodeURIComponent(domain)}`)}
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-stone-900">{domain}</h3>
          <div className="text-2xl font-bold mt-1" style={{ color }}>{nodes.length}</div>
          <div className="text-xs text-stone-400">concepts</div>
        </div>
        <div className="text-right text-xs text-stone-400 space-y-1 mt-1">
          <div>{crossOut} cross-domain edges</div>
          <div>{nodes.filter(n => n.role === "Leaf").length} leaf nodes</div>
        </div>
      </div>

      {/* Role breakdown bar */}
      <div className="mt-3 flex h-1.5 rounded-full overflow-hidden gap-px">
        {roleCounts.map(({ role, count }) => (
          <div
            key={role}
            style={{
              flex: count,
              background: color,
              opacity: role === "Core" ? 1 : role === "Branch" ? 0.7 : role === "Subbranch" ? 0.45 : 0.25,
            }}
          />
        ))}
      </div>
      <div className="flex gap-3 mt-1.5">
        {roleCounts.map(({ role, count }) => (
          <div key={role} className="text-[10px] text-stone-400">
            <span className="font-medium text-stone-600">{count}</span> {role}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DomainsPage() {
  const navigate = useNavigate();
  const [activeDomain, setActiveDomain] = useState<Domain | null>(null);

  const domainNodes = activeDomain ? nodesByDomain(activeDomain) : [];
  const sorted      = [...domainNodes].sort((a, b) => b.deg - a.deg);

  return (
    <div className="flex h-full">
      {/* Overview grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-lg font-semibold text-stone-900 mb-1">Domains</h1>
          <p className="text-sm text-stone-500 mb-6">
            Six domains covering all of statistical learning.
          </p>

          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            {DOMAINS.map(d => (
              <div key={d} onClick={() => setActiveDomain(activeDomain === d ? null : d as Domain)}>
                <DomainCard domain={d as Domain} />
              </div>
            ))}
          </div>

          {/* Summary stats */}
          <div className="card px-5 py-4">
            <h2 className="text-sm font-semibold text-stone-700 mb-3">Graph overview</h2>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Total concepts", value: allNodes.length },
                { label: "Total edges",    value: allEdges.length },
                { label: "Domains",        value: DOMAINS.length  },
                { label: "Edge types",     value: 8               },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-xl font-bold text-stone-800">{value}</div>
                  <div className="text-xs text-stone-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Domain detail panel */}
      {activeDomain && (
        <div className="w-72 border-l border-stone-200 bg-white flex flex-col flex-shrink-0">
          <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-stone-900">{activeDomain}</div>
              <div className="text-xs text-stone-400">{domainNodes.length} concepts</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/explore?domain=${encodeURIComponent(activeDomain)}`)}
                className="btn text-xs py-1"
              >
                Browse all
              </button>
              <button
                onClick={() => setActiveDomain(null)}
                className="text-stone-400 hover:text-stone-600 text-sm"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {sorted.slice(0, 30).map(n => (
              <NodeCard key={n.id} node={n} showDomain={false} />
            ))}
            {sorted.length > 30 && (
              <div className="text-xs text-center text-stone-400 py-2">
                +{sorted.length - 30} more —{" "}
                <button
                  className="underline"
                  onClick={() => navigate(`/explore?domain=${encodeURIComponent(activeDomain)}`)}
                >
                  view all
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
