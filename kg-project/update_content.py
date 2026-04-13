#!/usr/bin/env python3
"""
update_content.py
=================
Merges all content JSON files from kg-project/content/ into slkg/src/data/content.ts.

Usage:
    python update_content.py

Run this whenever new content JSON files are added (e.g. after each batch from Claude).
"""
import json, sys
from pathlib import Path

ROOT       = Path(__file__).parent
CONTENT_DIR = ROOT / "content"
SLKG_DIR   = ROOT.parent / "slkg"
OUTPUT_TS  = SLKG_DIR / "src" / "data" / "content.ts"

def main():
    if not CONTENT_DIR.exists():
        print(f"ERROR: {CONTENT_DIR} not found. Create it and add content JSON files.")
        sys.exit(1)

    files = sorted(CONTENT_DIR.glob("content_*.json"))
    if not files:
        print(f"No content_*.json files found in {CONTENT_DIR}")
        sys.exit(1)

    merged = {}
    for f in files:
        data = json.loads(f.read_text(encoding="utf-8"))
        count = len(data.get("nodes", {}))
        merged.update(data.get("nodes", {}))
        print(f"  {f.name}: {count} nodes")

    ts = (
        "export interface NodeContent {\n"
        "  definition: string;\n"
        "  formula: string | null;\n"
        "  parameters: string[] | null;\n"
        "  intuition: string;\n"
        "  common_confusion: string | null;\n"
        "  example_use: string;\n"
        "}\n\n"
        "export const NODE_CONTENT: Record<string, NodeContent> = "
        + json.dumps(merged, indent=2, ensure_ascii=False)
        + ";\n"
    )

    OUTPUT_TS.write_text(ts, encoding="utf-8")
    size_kb = OUTPUT_TS.stat().st_size // 1024
    print(f"\nWritten {OUTPUT_TS} ({size_kb}KB)")
    print(f"Total: {len(merged)} nodes with content")

if __name__ == "__main__":
    main()
