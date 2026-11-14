#!/usr/bin/env python3
"""Refresh the reviewed 2025 Paper 1 companion catalogue from tracker exports.

Run from this repo with paths to the sibling tracker JSON files. This copies
metadata only; it does not extract or publish question text from the PDF.
"""

import argparse
import hashlib
import json
from pathlib import Path


PAPER_ID = "lc-hl-2025-normal-p1"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("candidates", type=Path)
    parser.add_argument("topic_review", type=Path)
    args = parser.parse_args()
    candidates = json.loads(args.candidates.read_text())
    topic_review = json.loads(args.topic_review.read_text())
    paper = next(item for item in candidates["papers"] if item["paperId"] == PAPER_ID)
    review = next(item for item in topic_review["papers"] if item["paperId"] == PAPER_ID)
    pdf = Path(__file__).resolve().parents[1] / "data/papers/2025_normal_lc_maths_hl_english_paper_1.pdf"
    if hashlib.sha256(pdf.read_bytes()).hexdigest() != paper["sha256"]:
        raise ValueError("Local PDF does not match the reviewed tracker source")
    topics = review["candidateTopicIdsByPart"]
    if len(paper["questions"]) != 10 or len(paper["parts"]) != 51 or len(topics) != 51:
        raise ValueError("Unexpected paper structure; review the source before updating")
    if paper["issues"] or review["unmappedParts"] or review["unresolvedReferenceIssues"]:
        raise ValueError("Unresolved source or topic issues")
    parts = []
    for part in paper["parts"]:
        code = part["code"]
        if code not in topics:
            raise ValueError(f"Missing topics for {code}")
        parts.append({
            "id": f"{PAPER_ID}-{code}",
            "label": part["label"],
            "order": part["order"],
            "sourcePage": part["sourcePage"],
            "topicIds": topics[code],
            "maximumMarks": None,
        })
    output = {
        "id": PAPER_ID,
        "year": 2025,
        "number": 1,
        "sitting": "normal",
        "level": "HL",
        "sourceSha256": paper["sha256"],
        "questions": paper["questions"],
        "parts": parts,
    }
    destination = Path(__file__).resolve().parents[1] / "src/data/book2025p1.json"
    destination.write_text(json.dumps(output, indent=2) + "\n")
    print(f"Wrote {destination} with {len(parts)} leaf parts")


if __name__ == "__main__":
    main()
