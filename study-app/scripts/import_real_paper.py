#!/usr/bin/env python3
"""Copy a reviewed real-paper catalogue from tracker exports into this app.

This imports IDs and metadata only. Question text and solutions are authored
separately after checking the matching source PDF.
"""

import argparse
import hashlib
import json
from pathlib import Path


# Corrections reviewed against the printed paper; keep tracker IDs unchanged.
TOPIC_CORRECTIONS = {
    ("lc-hl-2023-normal-p2", "5b"): ["p2-geometry"],
}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("paper_id")
    parser.add_argument("pdf", type=Path)
    parser.add_argument("candidates", type=Path)
    parser.add_argument("topic_review", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()

    candidates = json.loads(args.candidates.read_text())
    topic_review = json.loads(args.topic_review.read_text())
    paper = next(item for item in candidates["papers"] if item["paperId"] == args.paper_id)
    review = next(item for item in topic_review["papers"] if item["paperId"] == args.paper_id)
    digest = hashlib.sha256(args.pdf.read_bytes()).hexdigest()
    if digest != paper["sha256"]:
        raise ValueError("Local PDF does not match the reviewed tracker source")
    topics = review["candidateTopicIdsByPart"]
    if paper["issues"] or review["unmappedParts"] or review["unresolvedReferenceIssues"]:
        raise ValueError("Unresolved source or topic issues")
    if len(topics) != len(paper["parts"]):
        raise ValueError("Topic mapping does not cover every part")
    parts = []
    for part in paper["parts"]:
        code = part["code"]
        if code not in topics:
            raise ValueError(f"Missing topics for {code}")
        parts.append({
            "id": f"{args.paper_id}-{code}",
            "label": part["label"],
            "order": part["order"],
            "sourcePage": part["sourcePage"],
            "topicIds": TOPIC_CORRECTIONS.get((args.paper_id, code), topics[code]),
            "maximumMarks": None,
        })

    year = int(args.paper_id.split("-")[2])
    number = int(args.paper_id.rsplit("p", 1)[1])
    output = {
        "id": args.paper_id,
        "year": year,
        "number": number,
        "sitting": "normal" if "-normal-" in args.paper_id else "deferred",
        "level": "HL",
        "sourceSha256": digest,
        "questions": paper["questions"],
        "parts": parts,
    }
    args.output.write_text(json.dumps(output, indent=2) + "\n")
    print(f"Wrote {args.output} with {len(parts)} leaf parts")


if __name__ == "__main__":
    main()
