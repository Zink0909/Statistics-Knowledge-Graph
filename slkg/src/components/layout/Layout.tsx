import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { searchNodes } from "../../lib/graphUtils";
import type { KGNode } from "../../types";

const NAV = [
  { to: "/graph",   label: "Graph",          icon: "⬡" },
  { to: "/explore", label: "Explore",         icon: "◎" },
  { to: "/domains", label: "Domains",         icon: "▦" },
  { to: "/path",    label: "Learning Path",   icon: "→" },
  { to: "/compare", label: "Compare",         icon: "⇄" },
  { to: "/edges",   label: "Edge Explorer",   icon: "∿" },
];

export default function Layout() {
  const navigate = useNavigate();
  const [query, setQuery]       = useState("");
  const [results, setResults]   = useState<KGNode[]>([]);
  const [open, setOpen]         = useState(false);
  const searchRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) { setResults([]); setOpen(false); return; }
    const r = searchNodes(query).slice(0, 8);
    setResults(r);
    setOpen(r.length > 0);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const go = (id: string) => {
    setQuery(""); setOpen(false);
    navigate(`/concept/${id}`);
  };

  return (
    <div className="flex h-full w-full">
      {/* ── Sidebar ── */}
      <aside className="w-52 flex-shrink-0 border-r border-stone-200 bg-white flex flex-col">
        {/* Logo */}
        <div className="px-4 py-4 border-b border-stone-100">
          <div className="text-sm font-semibold text-stone-900 leading-tight">
            Statistical Learning
          </div>
          <div className="text-xs text-stone-400 mt-0.5">Knowledge Graph</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {NAV.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive ? "nav-link-active flex items-center gap-2" : "nav-link flex items-center gap-2"
              }
            >
              <span className="text-base w-5 text-center leading-none">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer stats */}
        <div className="px-4 py-3 border-t border-stone-100 text-xs text-stone-400 space-y-0.5">
          <div>307 concepts</div>
          <div>497 relationships</div>
          <div>6 domains</div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Top bar */}
        <header className="h-12 flex-shrink-0 border-b border-stone-200 bg-white flex items-center px-4 gap-3">
          {/* Global search */}
          <div ref={searchRef} className="relative w-72">
            <input
              className="input h-8 pl-8 text-xs"
              placeholder="Search any concept..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => query.length >= 2 && setOpen(true)}
            />
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs">⌕</span>

            {open && (
              <div className="absolute top-full left-0 right-0 mt-1 card z-50 py-1 shadow-lg max-h-64 overflow-y-auto">
                {results.map(n => (
                  <button
                    key={n.id}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-stone-50 flex items-center gap-2"
                    onClick={() => go(n.id)}
                  >
                    <span className="text-stone-400 truncate text-[10px] w-20 flex-shrink-0">{n.domain.split(" ")[0]}</span>
                    <span className="text-stone-800 truncate">{n.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="ml-auto text-xs text-stone-400">
            Statistical Learning · v1.0
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 min-h-0 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
