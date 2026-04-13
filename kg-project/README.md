# Statistical Learning Knowledge Graph

## Project structure

```
kg-project/
├── domains/                    ← source of truth for all nodes
│   ├── probability_theory.txt
│   ├── probability_distributions.txt
│   ├── statistical_inference.txt
│   ├── regression_and_linear_models.txt
│   ├── generalized_linear_models.txt
│   └── model_evaluation_and_selection.txt
│
├── edges/                      ← one JSON file per edge type
│   ├── instance_of.json
│   ├── requires.json
│   ├── assumes.json
│   ├── uses_distribution.json
│   ├── measures.json
│   ├── produces.json
│   ├── corresponds_to.json
│   └── implemented_by.json
│
├── output/                     ← auto-generated, do not edit by hand
│   ├── statistical_learning_kg.json
│   └── kg_visualization.html
│
├── build.py                    ← main build script
├── viz_template.html           ← auto-generated on first build
└── README.md
```

---

## Quick start

```bash
# First run — builds everything and generates viz_template.html
python build.py

# Open the visualization
open output/kg_visualization.html
```

---

## Commands

```bash
python build.py               # full rebuild
python build.py --validate    # validate only, no files written
python build.py --init-viz    # regenerate viz_template.html from current output
python build.py --help        # show help
```

---

## Quarterly update workflow

### Step 1 — Add new nodes

Open the relevant domain file in `domains/` and append new lines.

Format:
```
id | Canonical Name | node_type | structural_role
```

Where:
- `id` — snake_case, lowercase, unique across all domains
- `node_type` — one of: `Concept`, `Method`, `Model`, `Conceptual Organizer`
- `structural_role` — one of: `Core`, `Branch`, `Subbranch`, `Leaf`

Example (`domains/statistical_inference.txt`):
```
variational_inference | Variational Inference | Method | Subbranch
elbo | Evidence Lower Bound | Concept | Leaf
mean_field_approximation | Mean Field Approximation | Method | Leaf
```

### Step 2 — Validate new nodes

```bash
python build.py --validate
```

Fix any id format errors or duplicate ids before proceeding.

### Step 3 — Generate edges with Claude

Send the following to Claude in a new conversation:

```
Here are new nodes I've added to the Statistical Learning KG.
Please generate edges for them using the edge schema.

New nodes:
[paste the new lines from your domain .txt file]

Existing nodes they might connect to:
[paste relevant existing nodes if known, or ask Claude to infer]

Schema reference: [attach KG_Edge_Schema_Reference.docx]
Domain list: [attach the relevant domain .txt files]
```

Claude will run Agent 1–5 for the new nodes and return edge JSON.
Then send the output to Agent 6 for semantic review.

### Step 4 — Merge new edges

For each edge type that has new edges, open the corresponding file in
`edges/` and append the new edge objects to the `"edges"` array.

Example — adding to `edges/requires.json`:
```json
{
  "edge_type": "requires",
  "edges": [
    ... existing edges ...
    {
      "source": {"id": "variational_inference", "canonical_name": "Variational Inference", "domain": "Statistical Inference"},
      "target": {"id": "posterior_distribution", "canonical_name": "Posterior Distribution", "domain": "Statistical Inference"},
      "edge_type": "requires",
      "confidence": 0.95,
      "generated_by": "llm",
      "notes": "Variational inference approximates the posterior distribution."
    }
  ]
}
```

### Step 5 — Rebuild

```bash
python build.py
```

The script will:
- Validate all nodes and edges
- Auto-fix any `corresponds_to` direction issues
- Write `output/statistical_learning_kg.json`
- Update `output/kg_visualization.html` with new data

---

## Edge type reference

| edge_type | Direction | Semantics |
|---|---|---|
| `instance_of` | A → B | A is a specific case or member of B |
| `requires` | A → B | A cannot be defined without B (hard dependency) |
| `assumes` | A → B | A is optimal only when B holds; violating B weakens A |
| `uses_distribution` | A → B | A operates under or derives from distribution B |
| `measures` | A → B | A quantifies or diagnoses B |
| `produces` | A → B | Executing A yields B as direct output |
| `corresponds_to` | A ↔ B | A and B are structurally dual or symmetric |
| `implemented_by` | A → B | Abstract concept A is realized by concrete method B |

**Key distinction — `requires` vs `assumes`:**
- `requires`: removing B makes A undefined or incoherent
- `assumes`: violating B makes A suboptimal but still computable

---

## Validation rules

`build.py --validate` checks:

| Code | Check |
|---|---|
| L1-01 | No self-loops |
| L1-02 | All domain names are valid |
| L1-03 | All node ids exist in domain list |
| L1-04 | Confidence in [0.0, 1.0] |
| L1-05 | Low confidence (< 0.85) edges have notes |
| L1-06 | `generated_by` is auto / llm / human |
| L1-07 | `edge_type` field matches filename |
| L1-08 | `instance_of` edges are auto / confidence 1.0 |
| L1-09 | `uses_distribution` targets are in Probability Distributions |
| L1-10 | No duplicate (source, target, edge_type) triples |
| L1-11 | Same node pair not in both requires and assumes |
| L2-01 | `corresponds_to` follows alphabetical source < target convention |
