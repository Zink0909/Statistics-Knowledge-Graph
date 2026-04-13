import { useMemo } from "react";
import type { KGNode, KGEdge, EdgeType } from "../types";
import { egoNetwork } from "../lib/graphUtils";
import { allNodes } from "../lib/graphUtils";

export function useEgoLayout(rootId: string | null, etypeFilter?: EdgeType) {
  return useMemo(() => {
    if (!rootId) return null;
    return egoNetwork(rootId, etypeFilter);
  }, [rootId, etypeFilter]);
}

export function useTopNodes(count = 20, domainFilter?: string, etypeFilter?: EdgeType) {
  return useMemo(() => {
    let pool = allNodes;
    if (domainFilter) pool = pool.filter(n => n.domain === domainFilter);
    const sorted = [...pool].sort((a, b) => b.deg - a.deg).slice(0, count);
    return sorted;
  }, [count, domainFilter]);
}
