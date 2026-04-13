#!/usr/bin/env python3
"""
Statistical Learning KG — build script
=======================================
Usage:
    python build.py            # full rebuild
    python build.py --validate # validate only, no output files written
    python build.py --help

What it does:
    1. Reads all domain .txt files from domains/
    2. Reads all edge .json files from edges/
    3. Runs Layer 1 + 2 validation (same checks as agent6_audit.py)
    4. Builds output/statistical_learning_kg.json
    5. Updates output/kg_visualization.html with fresh data
    6. Prints a summary report
"""

import json
import os
import re
import sys
import copy
from pathlib import Path
from collections import defaultdict

# ── Paths ──────────────────────────────────────────────────────────────────────
ROOT       = Path(__file__).parent
DOMAINS_DIR = ROOT / "domains"
EDGES_DIR   = ROOT / "edges"
OUTPUT_DIR  = ROOT / "output"
VIZ_TEMPLATE = ROOT / "viz_template.html"   # generated once, kept as template
VIZ_OUTPUT   = OUTPUT_DIR / "kg_visualization.html"
GRAPH_OUTPUT = OUTPUT_DIR / "statistical_learning_kg.json"

VALID_DOMAINS = [
    "Probability Theory",
    "Probability Distributions",
    "Statistical Inference",
    "Regression and Linear Models",
    "Generalized Linear Models",
    "Model Evaluation and Selection",
]

VALID_EDGE_TYPES = [
    "instance_of", "requires", "assumes", "uses_distribution",
    "measures", "produces", "corresponds_to", "implemented_by",
]

VALID_GENERATED_BY = {"auto", "llm", "human"}


# ══════════════════════════════════════════════════════════════════════════════
# STEP 1 — Load nodes from domains/
# ══════════════════════════════════════════════════════════════════════════════

def load_nodes():
    nodes = {}
    errors = []

    for txt_file in sorted(DOMAINS_DIR.glob("*.txt")):
        with open(txt_file, encoding="utf-8") as f:
            lines = f.readlines()

        current_domain = None
        for lineno, raw in enumerate(lines, 1):
            line = raw.strip()
            if not line or line.startswith("#"):
                # Pick up domain name from comment header
                m = re.search(r"Domain:\s*(.+)", line)
                if m:
                    current_domain = m.group(1).strip()
                continue

            parts = [p.strip() for p in line.split("|")]
            if len(parts) < 4:
                errors.append(f"{txt_file.name}:{lineno} — expected 4 fields, got {len(parts)}: {line!r}")
                continue

            node_id, canonical_name, node_type, structural_role = parts[:4]

            if not re.match(r'^[a-z][a-z0-9_]*$', node_id):
                errors.append(f"{txt_file.name}:{lineno} — invalid id format: {node_id!r}")
                continue

            if current_domain not in VALID_DOMAINS:
                errors.append(f"{txt_file.name}:{lineno} — unknown domain {current_domain!r} for node {node_id}")
                continue

            if node_id in nodes:
                errors.append(f"{txt_file.name}:{lineno} — duplicate node id: {node_id}")
                continue

            nodes[node_id] = {
                "id":             node_id,
                "canonical_name": canonical_name,
                "domain":         current_domain,
                "node_type":      node_type,
                "structural_role": structural_role,
            }

    return nodes, errors


# ══════════════════════════════════════════════════════════════════════════════
# STEP 2 — Load edges from edges/
# ══════════════════════════════════════════════════════════════════════════════

def load_edges():
    all_edges = []
    errors = []
    edge_counts = {}

    for etype in VALID_EDGE_TYPES:
        fpath = EDGES_DIR / f"{etype}.json"
        if not fpath.exists():
            errors.append(f"Missing edge file: edges/{etype}.json")
            continue

        try:
            data = json.loads(fpath.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            errors.append(f"edges/{etype}.json — JSON parse error: {e}")
            continue

        edges = data.get("edges", [])
        edge_counts[etype] = len(edges)
        for i, e in enumerate(edges):
            e["_file"]  = etype
            e["_index"] = i
            all_edges.append(e)

    return all_edges, edge_counts, errors


# ══════════════════════════════════════════════════════════════════════════════
# STEP 3 — Validate
# ══════════════════════════════════════════════════════════════════════════════

def validate(nodes, all_edges):
    errors   = []
    warnings = []
    fixed    = []   # auto-fixable issues

    seen_triples = defaultdict(list)   # (src, tgt, etype) -> list of files
    seen_pairs   = defaultdict(list)   # (src, tgt) -> list of etypes

    for e in all_edges:
        etype  = e.get("edge_type", "")
        src_id = e.get("source", {}).get("id", "")
        tgt_id = e.get("target", {}).get("id", "")
        conf   = e.get("confidence")
        genby  = e.get("generated_by", "")
        notes  = e.get("notes", "")
        fname  = e.get("_file", "?")
        idx    = e.get("_index", "?")
        loc    = f"edges/{fname}.json[{idx}]"

        # L1-01 Self-loop
        if src_id == tgt_id:
            errors.append(f"L1-01 Self-loop: {loc} {src_id}")

        # L1-02 Unknown domain
        for role, node in [("source", e.get("source", {})), ("target", e.get("target", {}))]:
            d = node.get("domain", "")
            if d not in VALID_DOMAINS:
                errors.append(f"L1-02 Invalid domain in {role}: {loc} domain={d!r}")

        # L1-03 Node not in domain list
        if src_id and src_id not in nodes:
            errors.append(f"L1-03 Unknown source node: {loc} id={src_id!r}")
        if tgt_id and tgt_id not in nodes:
            errors.append(f"L1-03 Unknown target node: {loc} id={tgt_id!r}")

        # L1-04 Confidence range
        if conf is None:
            errors.append(f"L1-04 Missing confidence: {loc}")
        elif not (0.0 <= float(conf) <= 1.0):
            errors.append(f"L1-04 Confidence out of range: {loc} conf={conf}")

        # L1-05 Low confidence without notes
        if conf is not None and float(conf) < 0.85 and not notes.strip():
            warnings.append(f"L1-05 Low confidence ({conf}) with empty notes: {loc}")

        # L1-06 Invalid generated_by
        if genby not in VALID_GENERATED_BY:
            errors.append(f"L1-06 Invalid generated_by={genby!r}: {loc}")

        # L1-07 edge_type mismatch with file name
        if etype != fname:
            errors.append(f"L1-07 edge_type={etype!r} in file edges/{fname}.json: {loc}")

        # L1-08 instance_of: auto or human only; confidence must be 1.0
        if fname == "instance_of":
            if genby not in ("auto", "human"):
                warnings.append(f"L1-08 instance_of with generated_by={genby!r} (expected auto or human): {loc}")
            if conf is not None and float(conf) != 1.0:
                warnings.append(f"L1-08 instance_of with confidence={conf} (expected 1.0): {loc}")

        # L1-09 uses_distribution target must be in Probability Distributions
        if fname == "uses_distribution":
            tgt_domain = e.get("target", {}).get("domain", "")
            if tgt_domain != "Probability Distributions":
                errors.append(f"L1-09 uses_distribution target not in Probability Distributions: {loc} tgt_domain={tgt_domain!r}")

        # L1-10 Cross-file duplicate triples
        triple = (src_id, tgt_id, etype)
        seen_triples[triple].append(loc)

        # L1-11 Same pair in both requires and assumes
        pair = (src_id, tgt_id)
        seen_pairs[pair].append(fname)

    # Check duplicates
    for triple, locs in seen_triples.items():
        if len(locs) > 1:
            errors.append(f"L1-10 Duplicate triple {triple}: {locs}")

    for pair, etypes in seen_pairs.items():
        if "requires" in etypes and "assumes" in etypes:
            errors.append(f"L1-11 Same pair in requires+assumes: {pair[0]} → {pair[1]}")

    # L2-01 corresponds_to direction (alphabetical)
    for e in all_edges:
        if e.get("_file") != "corresponds_to":
            continue
        src_id = e.get("source", {}).get("id", "")
        tgt_id = e.get("target", {}).get("id", "")
        if src_id and tgt_id and src_id > tgt_id:
            warnings.append(
                f"L2-01 corresponds_to direction: source={src_id!r} should be < target={tgt_id!r} "
                f"[edges/corresponds_to.json[{e['_index']}]] — auto-fixable"
            )
            fixed.append(("swap_corresponds_to", e["_index"]))

    return errors, warnings, fixed


# ══════════════════════════════════════════════════════════════════════════════
# STEP 4 — Build graph JSON
# ══════════════════════════════════════════════════════════════════════════════

def build_graph(nodes, all_edges):
    degree = defaultdict(lambda: {"in": 0, "out": 0, "total": 0})
    for e in all_edges:
        src = e.get("source", {}).get("id", "")
        tgt = e.get("target", {}).get("id", "")
        degree[src]["out"]   += 1
        degree[src]["total"] += 1
        degree[tgt]["in"]    += 1
        degree[tgt]["total"] += 1

    isolated = [nid for nid in nodes if degree[nid]["total"] == 0]

    node_list = []
    for n in nodes.values():
        entry = dict(n)
        entry["degree"] = degree[n["id"]]
        node_list.append(entry)

    clean_edges = []
    for e in all_edges:
        ce = {k: v for k, v in e.items() if not k.startswith("_")}
        clean_edges.append(ce)

    graph = {
        "meta": {
            "name":           "Statistical Learning Knowledge Graph",
            "version":        "1.0",
            "node_count":     len(nodes),
            "edge_count":     len(all_edges),
            "domains":        VALID_DOMAINS,
            "edge_types":     VALID_EDGE_TYPES,
            "isolated_nodes": isolated,
        },
        "nodes": node_list,
        "edges": clean_edges,
    }
    return graph


# ══════════════════════════════════════════════════════════════════════════════
# STEP 5 — Update visualization HTML
# ══════════════════════════════════════════════════════════════════════════════

def update_viz(graph):
    # The visualization HTML has a known marker pattern we can replace
    VIZ_MARKER_NODES = "ALL_NODES_JSON"
    VIZ_MARKER_EDGES = "ALL_EDGES_JSON"

    # Build compact node/edge lists for embedding
    viz_nodes = [
        {
            "id":    n["id"],
            "label": n["canonical_name"],
            "domain": n["domain"],
            "role":  n["structural_role"],
            "type":  n["node_type"],
            "deg":   n["degree"]["total"],
        }
        for n in graph["nodes"]
    ]
    viz_edges = [
        {"s": e["source"]["id"], "t": e["target"]["id"], "et": e["edge_type"]}
        for e in graph["edges"]
        if e.get("confidence", 1.0) >= 0.88
    ]

    nodes_js = json.dumps(viz_nodes, ensure_ascii=False)
    edges_js = json.dumps(viz_edges, ensure_ascii=False)

    # Check if template exists, otherwise use current output as base
    base_path = VIZ_TEMPLATE if VIZ_TEMPLATE.exists() else VIZ_OUTPUT

    if not base_path.exists():
        return False, f"No visualization base file found at {base_path}"

    html = base_path.read_text(encoding="utf-8")

    if VIZ_MARKER_NODES not in html or VIZ_MARKER_EDGES not in html:
        return False, (
            f"Markers {VIZ_MARKER_NODES!r} and {VIZ_MARKER_EDGES!r} not found in HTML. "
            "Run build.py --init-viz to regenerate the template."
        )

    html = html.replace(VIZ_MARKER_NODES, nodes_js)
    html = html.replace(VIZ_MARKER_EDGES, edges_js)

    OUTPUT_DIR.mkdir(exist_ok=True)
    VIZ_OUTPUT.write_text(html, encoding="utf-8")
    return True, f"{len(viz_nodes)} nodes, {len(viz_edges)} edges embedded"


# ══════════════════════════════════════════════════════════════════════════════
# STEP 6 — Generate viz_template.html (run once, or with --init-viz)
# ══════════════════════════════════════════════════════════════════════════════

def generate_template():
    """
    Writes viz_template.html with ALL_NODES_JSON and ALL_EDGES_JSON as
    placeholder strings. build.py replaces these on every rebuild.
    Source code is the same as kg_visualization.html but with data stripped.
    """
    if not VIZ_OUTPUT.exists():
        return False, "No existing kg_visualization.html found in output/ to use as source"

    html = VIZ_OUTPUT.read_text(encoding="utf-8")

    # Strip existing embedded data — replace JSON arrays with markers
    import re

    # Replace node data
    html = re.sub(
        r'var ALL_NODES\s*=\s*\[.*?\];',
        'var ALL_NODES = ALL_NODES_JSON;',
        html, flags=re.DOTALL
    )
    # Replace edge data
    html = re.sub(
        r'var ALL_EDGES\s*=\s*\[.*?\];',
        'var ALL_EDGES = ALL_EDGES_JSON;',
        html, flags=re.DOTALL
    )

    VIZ_TEMPLATE.write_text(html, encoding="utf-8")
    return True, f"Template written to {VIZ_TEMPLATE}"


# ══════════════════════════════════════════════════════════════════════════════
# Main
# ══════════════════════════════════════════════════════════════════════════════

def main():
    args = sys.argv[1:]
    validate_only = "--validate" in args
    init_viz      = "--init-viz" in args

    if "--help" in args:
        print(__doc__)
        return

    print("=" * 60)
    print("  Statistical Learning KG — build")
    print("=" * 60)

    # ── Load ──────────────────────────────────────────────────────────────────
    print("\n[1/5] Loading nodes from domains/ ...")
    nodes, node_errors = load_nodes()
    print(f"      {len(nodes)} nodes loaded")
    for d in VALID_DOMAINS:
        count = sum(1 for n in nodes.values() if n["domain"] == d)
        print(f"        {d}: {count}")
    if node_errors:
        print(f"      {len(node_errors)} errors:")
        for e in node_errors: print(f"        ERROR: {e}")

    print("\n[2/5] Loading edges from edges/ ...")
    all_edges, edge_counts, edge_errors = load_edges()
    total_edges = len(all_edges)
    print(f"      {total_edges} edges loaded")
    for et, c in edge_counts.items():
        print(f"        {et}: {c}")
    if edge_errors:
        for e in edge_errors: print(f"        ERROR: {e}")

    # ── Validate ──────────────────────────────────────────────────────────────
    print("\n[3/5] Validating ...")
    errors, warnings, fixed = validate(nodes, all_edges)
    all_errors = node_errors + edge_errors + errors

    for w in warnings: print(f"      WARNING: {w}")
    for e in all_errors: print(f"      ERROR:   {e}")
    if not all_errors and not warnings:
        print("      All checks passed.")
    print(f"      {len(all_errors)} errors · {len(warnings)} warnings · {len(fixed)} auto-fixable")

    if all_errors:
        print("\n  Build aborted — fix errors before rebuilding.")
        sys.exit(1)

    if validate_only:
        print("\n  --validate mode: skipping output generation.")
        return

    # ── Auto-fix corresponds_to direction ─────────────────────────────────────
    if fixed:
        print(f"\n      Auto-fixing {len(fixed)} direction issue(s) ...")
        ct_path = EDGES_DIR / "corresponds_to.json"
        ct_data = json.loads(ct_path.read_text(encoding="utf-8"))
        for action, idx in fixed:
            if action == "swap_corresponds_to":
                e = ct_data["edges"][idx]
                e["source"], e["target"] = e["target"], e["source"]
                if "notes" not in e or not e["notes"]:
                    e["notes"] = "Direction auto-corrected by build.py (alphabetical convention)."
        ct_path.write_text(json.dumps(ct_data, indent=2, ensure_ascii=False), encoding="utf-8")
        # Reload after fix
        all_edges, edge_counts, _ = load_edges()
        print(f"      Fixed and saved edges/corresponds_to.json")

    # ── Build graph ───────────────────────────────────────────────────────────
    print("\n[4/5] Building graph ...")
    graph = build_graph(nodes, all_edges)

    OUTPUT_DIR.mkdir(exist_ok=True)
    GRAPH_OUTPUT.write_text(
        json.dumps(graph, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    size_kb = GRAPH_OUTPUT.stat().st_size // 1024
    isolated = graph["meta"]["isolated_nodes"]
    print(f"      output/statistical_learning_kg.json ({size_kb}KB)")
    print(f"      {graph['meta']['node_count']} nodes · {graph['meta']['edge_count']} edges")
    if isolated:
        print(f"      {len(isolated)} isolated nodes: {isolated[:5]}{'…' if len(isolated)>5 else ''}")

    # ── Update visualization ──────────────────────────────────────────────────
    print("\n[5/5] Updating visualization ...")

    # Generate template on first run or if requested
    if init_viz or not VIZ_TEMPLATE.exists():
        ok, msg = generate_template()
        if ok:
            print(f"      Template generated: {msg}")
        else:
            print(f"      WARNING: {msg}")
            print("      Skipping visualization update.")
            print("\n" + "=" * 60)
            print("  Build complete (visualization not updated)")
            print("=" * 60)
            return

    ok, msg = update_viz(graph)
    if ok:
        viz_kb = VIZ_OUTPUT.stat().st_size // 1024
        print(f"      output/kg_visualization.html ({viz_kb}KB) — {msg}")
    else:
        print(f"      WARNING: {msg}")

    print("\n" + "=" * 60)
    print("  Build complete.")
    print(f"  Open output/kg_visualization.html in your browser.")
    print("=" * 60)


if __name__ == "__main__":
    main()
