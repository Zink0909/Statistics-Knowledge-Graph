// ── Graph data types ──────────────────────────────────────────────────────────

export type Domain =
  | "Probability Theory"
  | "Probability Distributions"
  | "Statistical Inference"
  | "Regression and Linear Models"
  | "Generalized Linear Models"
  | "Model Evaluation and Selection";

export type StructuralRole = "Core" | "Branch" | "Subbranch" | "Leaf";
export type NodeType = "Concept" | "Method" | "Model" | "Conceptual Organizer";

export type EdgeType =
  | "instance_of"
  | "requires"
  | "assumes"
  | "uses_distribution"
  | "measures"
  | "produces"
  | "corresponds_to"
  | "implemented_by";

export interface KGNode {
  id: string;
  label: string;
  domain: Domain;
  role: StructuralRole;
  type: NodeType;
  deg: number;
}

export interface KGEdge {
  s: string; // source id
  t: string; // target id
  et: EdgeType;
  c: number; // confidence
}

export interface GraphData {
  nodes: KGNode[];
  edges: KGEdge[];
}

// ── Sim node (D3 mutates these) ────────────────────────────────────────────────

export interface SimNode extends KGNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: number | null;
  fy?: number | null;
}

export interface SimLink {
  source: SimNode | string;
  target: SimNode | string;
  et: EdgeType;
}
