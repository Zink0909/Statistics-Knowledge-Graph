#!/usr/bin/env python3
"""
update_site.py
==============
Syncs the latest graph data from kg-project into the slkg React app.

Usage:
    python update_site.py              # use default paths
    python update_site.py --help

Run this after every `python build.py` to keep the site up to date.
Then cd into slkg/ and run:
    npm run build    # production build
    npm run dev      # local dev server
"""

import json
import sys
import os
from pathlib import Path

ROOT       = Path(__file__).parent
GRAPH_JSON = ROOT / "output" / "statistical_learning_kg.json"
SLKG_DIR   = ROOT.parent / "slkg"          # assumes slkg/ sits next to kg-project/
GRAPH_TS   = SLKG_DIR / "src" / "data" / "graph.ts"


def main():
    if "--help" in sys.argv:
        print(__doc__)
        return

    # ── Check inputs ──────────────────────────────────────────────────────────
    if not GRAPH_JSON.exists():
        print(f"ERROR: {GRAPH_JSON} not found.")
        print("       Run `python build.py` first.")
        sys.exit(1)

    if not SLKG_DIR.exists():
        print(f"ERROR: slkg directory not found at {SLKG_DIR}")
        print("       Make sure kg-project/ and slkg/ are in the same parent folder.")
        sys.exit(1)

    if not GRAPH_TS.parent.exists():
        print(f"ERROR: {GRAPH_TS.parent} does not exist.")
        print("       Is slkg/ fully set up? Run `npm install` inside slkg/ first.")
        sys.exit(1)

    # ── Load graph ────────────────────────────────────────────────────────────
    print(f"Reading {GRAPH_JSON} ...")
    graph = json.loads(GRAPH_JSON.read_text(encoding="utf-8"))

    nodes = [
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

    edges = [
        {
            "s":  e["source"],
            "t":  e["target"],
            "et": e["edge_type"],
            "c":  round(e.get("confidence", 1.0), 2),
        }
        for e in graph["edges"]
    ]

    # ── Write graph.ts ────────────────────────────────────────────────────────
    nodes_json = json.dumps(nodes, ensure_ascii=False)
    edges_json = json.dumps(edges, ensure_ascii=False)

    ts_content = (
        'import type { GraphData } from "../types";\n\n'
        f"export const GRAPH_DATA: GraphData = {json.dumps({'nodes': nodes, 'edges': edges}, ensure_ascii=False)};\n"
    )

    GRAPH_TS.write_text(ts_content, encoding="utf-8")

    size_kb = GRAPH_TS.stat().st_size // 1024
    print(f"Written {GRAPH_TS}  ({size_kb}KB)")
    print(f"  {len(nodes)} nodes · {len(edges)} edges")
    print()
    print("Next steps:")
    print("  cd ../slkg")
    print("  npm run dev      # test locally")
    print("  npm run build    # then push to GitHub → Vercel auto-deploys")


if __name__ == "__main__":
    main()
