import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { Domain, StructuralRole } from "../types";
import { allNodes } from "../lib/graphUtils";
import { DOMAINS, DOMAIN_COLOR } from "../lib/constants";
import NodeCard from "../components/ui/NodeCard";

const ROLES: StructuralRole[] = ["Core", "Branch", "Subbranch", "Leaf"];

export default function ExplorePage() {
  const navigate = useNavigate();
  const [domain, setDomain]   = useState<Domain | "">("");
  const [role,   setRole]     = useState<StructuralRole | "">("");
  const [type,   setType]     = useState("");
  const [query,  setQuery]    = useState("");
  const [sort,   setSort]     = useState<"deg" | "label">("deg");

  const results = useMemo(() => {
    let pool = allNodes;
    if (domain) pool = pool.filter(n => n.domain === domain);
    if (role)   pool = pool.filter(n => n.role   === role);
    if (type)   pool = pool.filter(n => n.type   === type);
    if (query.trim()) {
      const q = query.toLowerCase();
      pool = pool.filter(n => n.label.toLowerCase().includes(q) || n.id.includes(q));
    }
    return [...pool].sort(sort === "deg"
      ? (a, b) => b.deg - a.deg
      : (a, b) => a.label.localeCompare(b.label)
    );
  }, [domain, role, type, query, sort]);

  const types = [...new Set(allNodes.map(n => n.type))].sort();

  return (
    <div className="flex h-full">
      {/* Sidebar filters */}
      <div className="w-52 border-r border-stone-200 bg-white flex-shrink-0 overflow-y-auto py-4 px-3">
        <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-3 px-1">
          Filters
        </div>

        {/* Domain */}
        <div className="mb-4">
          <div className="text-xs font-medium text-stone-600 mb-2 px-1">Domain</div>
          <button
            onClick={() => setDomain("")}
            className={`w-full text-left text-xs px-2 py-1 rounded mb-0.5
              ${domain === "" ? "bg-stone-100 text-stone-800 font-medium" : "text-stone-500 hover:bg-stone-50"}`}
          >
            All domains
          </button>
          {DOMAINS.map(d => (
            <button
              key={d}
              onClick={() => setDomain(domain === d ? "" : d as Domain)}
              className={`w-full text-left text-xs px-2 py-1 rounded flex items-center gap-2 mb-0.5
                ${domain === d ? "bg-stone-100 text-stone-800 font-medium" : "text-stone-500 hover:bg-stone-50"}`}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: (DOMAIN_COLOR as Record<string, string>)[d] }} />
              <span className="truncate">{d}</span>
            </button>
          ))}
        </div>

        {/* Role */}
        <div className="mb-4">
          <div className="text-xs font-medium text-stone-600 mb-2 px-1">Role</div>
          {(["", ...ROLES] as (StructuralRole | "")[]).map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`w-full text-left text-xs px-2 py-1 rounded mb-0.5
                ${role === r ? "bg-stone-100 text-stone-800 font-medium" : "text-stone-500 hover:bg-stone-50"}`}
            >
              {r || "All roles"}
            </button>
          ))}
        </div>

        {/* Type */}
        <div className="mb-4">
          <div className="text-xs font-medium text-stone-600 mb-2 px-1">Node type</div>
          {(["", ...types]).map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`w-full text-left text-xs px-2 py-1 rounded mb-0.5
                ${type === t ? "bg-stone-100 text-stone-800 font-medium" : "text-stone-500 hover:bg-stone-50"}`}
            >
              {t || "All types"}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Search + sort bar */}
        <div className="border-b border-stone-200 bg-white px-4 py-2 flex items-center gap-3 flex-shrink-0">
          <input
            className="input flex-1 h-8 text-sm"
            placeholder="Search concepts…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-1 text-xs text-stone-500">
            Sort:
            <button
              onClick={() => setSort("deg")}
              className={`px-2 py-0.5 rounded ${sort === "deg" ? "bg-stone-100 font-medium text-stone-800" : "hover:bg-stone-50"}`}
            >
              Degree
            </button>
            <button
              onClick={() => setSort("label")}
              className={`px-2 py-0.5 rounded ${sort === "label" ? "bg-stone-100 font-medium text-stone-800" : "hover:bg-stone-50"}`}
            >
              A–Z
            </button>
          </div>
          <span className="text-xs text-stone-400 flex-shrink-0">{results.length} results</span>
        </div>

        {/* Node grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
            {results.map(n => (
              <NodeCard
                key={n.id}
                node={n}
                onClick={node => navigate(`/concept/${node.id}`)}
              />
            ))}
          </div>
          {!results.length && (
            <div className="text-center text-stone-400 text-sm py-16">
              No concepts match the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
