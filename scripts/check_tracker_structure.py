#!/usr/bin/env python3
"""Cross-check saved Edco part IDs against PDF extraction in reading order.

This is a repeatable extraction check, not a substitute for visual PDF review.
"""

import hashlib
import json
from pathlib import Path

from audit_tracker_papers import pdf_parts

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "easymaths-ie/content/edco-2018-2025-candidates.json"


def main():
    papers = json.loads(SOURCE.read_text())["papers"]
    failed = []
    for paper in papers:
        path = ROOT / paper["source"]
        if not path.exists() or hashlib.sha256(path.read_bytes()).hexdigest() != paper["sha256"]:
            failed.append(f"{paper['paperId']}: PDF missing or changed")
            continue
        saved = [part["code"] for part in paper["parts"]]
        _, raw_parts, _ = pdf_parts(path, layout=False)
        raw = [part["code"] for part in raw_parts]
        if saved != raw:
            failed.append(f"{paper['paperId']}: saved {saved}; raw {raw}")
    if failed:
        raise SystemExit("\n".join(failed))
    print(f"{len(papers)} PDFs match saved SHA-256 hashes and raw-reading part order; "
          f"{sum(len(paper['parts']) for paper in papers)} candidate parts. Visual review remains necessary.")


if __name__ == "__main__":
    main()
