import type { KGNode, KGEdge, Domain, EdgeType } from "../types";
import { GRAPH_DATA } from "../data/graph";

export const allNodes = GRAPH_DATA.nodes;
export const allEdges = GRAPH_DATA.edges;

// ── Index structures (built once) ─────────────────────────────────────────────

const nodeById = new Map<string, KGNode>(allNodes.map(n => [n.id, n]));

const outEdges = new Map<string, KGEdge[]>();
const inEdges  = new Map<string, KGEdge[]>();

for (const e of allEdges) {
  if (!outEdges.has(e.s)) outEdges.set(e.s, []);
  if (!inEdges.has(e.t))  inEdges.set(e.t, []);
  outEdges.get(e.s)!.push(e);
  inEdges.get(e.t)!.push(e);
}

// ── Node lookups ──────────────────────────────────────────────────────────────

export function getNode(id: string): KGNode | undefined {
  return nodeById.get(id);
}

export function getOutEdges(id: string): KGEdge[] {
  return outEdges.get(id) ?? [];
}

export function getInEdges(id: string): KGEdge[] {
  return inEdges.get(id) ?? [];
}

export function getAllEdgesFor(id: string): KGEdge[] {
  return [...getOutEdges(id), ...getInEdges(id)];
}

export function getNeighborIds(id: string): Set<string> {
  const s = new Set<string>();
  getOutEdges(id).forEach(e => s.add(e.t));
  getInEdges(id).forEach(e => s.add(e.s));
  return s;
}

// ── Filtered subsets ──────────────────────────────────────────────────────────

export function nodesByDomain(domain: Domain): KGNode[] {
  return allNodes.filter(n => n.domain === domain);
}

export function topNodesByDegree(n = 20, domain?: Domain): KGNode[] {
  const pool = domain ? nodesByDomain(domain) : allNodes;
  return [...pool].sort((a, b) => b.deg - a.deg).slice(0, n);
}

export function searchNodes(query: string): KGNode[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return allNodes.filter(
    n => n.label.toLowerCase().includes(q) || n.id.includes(q)
  );
}

// ── Ego network ───────────────────────────────────────────────────────────────

export function egoNetwork(
  rootId: string,
  etypeFilter?: EdgeType
): { nodes: KGNode[]; edges: KGEdge[]; depth1: string[]; depth2: string[] } {
  const fedges = etypeFilter
    ? allEdges.filter(e => e.et === etypeFilter)
    : allEdges;

  const d1 = new Set<string>();
  const d2 = new Set<string>();

  for (const e of fedges) {
    if (e.s === rootId) d1.add(e.t);
    if (e.t === rootId) d1.add(e.s);
  }
  d1.delete(rootId);

  for (const e of fedges) {
    if (d1.has(e.s) && e.t !== rootId && !d1.has(e.t)) d2.add(e.t);
    if (d1.has(e.t) && e.s !== rootId && !d1.has(e.s)) d2.add(e.s);
  }

  const allIds = new Set([rootId, ...d1, ...d2]);
  const nodes  = allNodes.filter(n => allIds.has(n.id));
  const edges  = fedges.filter(e => allIds.has(e.s) && allIds.has(e.t));

  return { nodes, edges, depth1: [...d1], depth2: [...d2] };
}

// ── Learning path (BFS shortest path) ─────────────────────────────────────────

export function findPath(
  fromId: string,
  toId: string,
  etypeFilter?: EdgeType
): { path: string[]; edges: KGEdge[] } | null {
  if (fromId === toId) return { path: [fromId], edges: [] };

  const fedges = etypeFilter
    ? allEdges.filter(e => e.et === etypeFilter)
    : allEdges;

  // Build adjacency (undirected for path finding)
  const adj = new Map<string, Array<{ id: string; edge: KGEdge }>>();
  for (const e of fedges) {
    if (!adj.has(e.s)) adj.set(e.s, []);
    if (!adj.has(e.t)) adj.set(e.t, []);
    adj.get(e.s)!.push({ id: e.t, edge: e });
    adj.get(e.t)!.push({ id: e.s, edge: e });
  }

  const visited = new Set<string>([fromId]);
  const prev = new Map<string, { from: string; edge: KGEdge }>();
  const queue = [fromId];

  while (queue.length) {
    const cur = queue.shift()!;
    for (const { id, edge } of adj.get(cur) ?? []) {
      if (!visited.has(id)) {
        visited.add(id);
        prev.set(id, { from: cur, edge });
        if (id === toId) {
          // Reconstruct
          const path: string[] = [];
          const edges: KGEdge[] = [];
          let node = toId;
          while (node !== fromId) {
            path.unshift(node);
            const p = prev.get(node)!;
            edges.unshift(p.edge);
            node = p.from;
          }
          path.unshift(fromId);
          return { path, edges };
        }
        queue.push(id);
      }
    }
  }
  return null;
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export function graphStats() {
  const edgeTypeCounts: Record<string, number> = {};
  for (const e of allEdges) {
    edgeTypeCounts[e.et] = (edgeTypeCounts[e.et] ?? 0) + 1;
  }
  return {
    nodeCount:      allNodes.length,
    edgeCount:      allEdges.length,
    domainCounts:   Object.fromEntries(
      ([...new Set(allNodes.map(n => n.domain))]).map(d => [
        d,
        allNodes.filter(n => n.domain === d).length,
      ])
    ),
    edgeTypeCounts,
  };
}
