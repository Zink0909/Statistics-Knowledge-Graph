import type { Domain, EdgeType, StructuralRole } from "../types";

export const DOMAIN_COLOR: Record<Domain, string> = {
  "Probability Theory":            "#7B74C8",
  "Probability Distributions":     "#2E9E6E",
  "Statistical Inference":         "#3A82C4",
  "Regression and Linear Models":  "#C85A28",
  "Generalized Linear Models":     "#B84070",
  "Model Evaluation and Selection":"#A86C14",
};

export const DOMAIN_BG: Record<Domain, string> = {
  "Probability Theory":            "#EEEDFE",
  "Probability Distributions":     "#E1F5EE",
  "Statistical Inference":         "#E6F1FB",
  "Regression and Linear Models":  "#FAECE7",
  "Generalized Linear Models":     "#FBEAF0",
  "Model Evaluation and Selection":"#FAEEDA",
};

export const DOMAIN_SHORT: Record<Domain, string> = {
  "Probability Theory":            "Prob. Theory",
  "Probability Distributions":     "Prob. Distributions",
  "Statistical Inference":         "Statistical Inference",
  "Regression and Linear Models":  "Regression",
  "Generalized Linear Models":     "GLM",
  "Model Evaluation and Selection":"Model Eval.",
};

export const EDGE_COLOR: Record<EdgeType, string> = {
  instance_of:       "#A8A5A0",
  requires:          "#D04040",
  assumes:           "#C47800",
  uses_distribution: "#2E9E6E",
  measures:          "#3A82C4",
  produces:          "#7B74C8",
  corresponds_to:    "#B84070",
  implemented_by:    "#888884",
};

export const EDGE_DESCRIPTION: Record<EdgeType, string> = {
  instance_of:       "A is a specific case or member of B",
  requires:          "A cannot be defined without B (hard dependency)",
  assumes:           "A is optimal only when B holds; violating B weakens A",
  uses_distribution: "A operates under or derives from distribution B",
  measures:          "A quantifies or diagnoses B",
  produces:          "Executing A yields B as direct output",
  corresponds_to:    "A and B are structurally dual or symmetric",
  implemented_by:    "Abstract concept A is realized by concrete method B",
};

export const ROLE_SIZE: Record<StructuralRole, number> = {
  Core:      18,
  Branch:    13,
  Subbranch: 9,
  Leaf:      6,
};

export const DOMAINS = Object.keys(DOMAIN_COLOR) as Domain[];
export const EDGE_TYPES = Object.keys(EDGE_COLOR) as EdgeType[];
