#!/usr/bin/env python3
"""Expand Edco workbook hints to candidate leaf-part topics.

The workbook uses shorthand such as Q10d(iii),e and whole-question labels.
This script maps only references that resolve to a real extracted part. Its
output is a review queue. Catalogue approval controls student-facing statistics.
"""

import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "content/edco-2018-2025-candidates.json"
OUTPUT = ROOT / "content/edco-2018-2025-topic-review.json"
CORRECTIONS = ROOT / "content/edco-topic-corrections.json"

TOPICS = {
    "Number systems, Indices, Arithmetic, Financial maths": "p1-number",
    "Algebra": "p1-algebra",
    "Sequences, Series": "p1-sequences",
    "Complex Numbers": "p1-complex",
    "Functions, Calculus": "p1-calculus",
    "Functions, Graphs": "p1-graphs",
    "Statistics": "p2-statistics",
    "Probability": "p2-probability",
    "Geometry, Area, Volume": "p2-geometry",
    "Line": "p2-line",
    "Circle, Centroid, Circum-,In-, Orthocentres": "p2-circle",
    "Trigonometry, Sectors, Period, Range": "p2-trigonometry",
}
ROMANS = {"i", "ii", "iii", "iv", "v", "vi"}
QUESTION = re.compile(r"\bQ\s*(\d+)", re.I)


def split_references(raw):
    raw = re.sub(r"\s+", " ", raw)
    matches = list(QUESTION.finditer(raw))
    prefix = raw[:matches[0].start()] if matches else raw
    chunks = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(raw)
        chunks.append((int(match[1]), raw[match.end():end].strip(" ,")))
    return prefix, chunks


def expand_suffix(raw):
    """Return letter/roman paths; keep bare roman references as errors."""
    if not raw:
        return [""], []
    tokens = re.findall(r"\([^()]+\)|[a-h]|[^(),\s]+", raw.lower())
    paths, errors, letter = [], [], None
    for token in tokens:
        for value in (item.strip() for item in token.strip("()").split(",")):
            if not value:
                continue
            if re.fullmatch(r"[a-h]", value):
                letter = value
                paths.append(value)
            elif value in ROMANS:
                if letter is None:
                    errors.append(f"Roman numeral {value} has no letter")
                else:
                    paths.append(letter + value)
            else:
                errors.append(f"Unrecognised token {value}")
    return paths, errors


def map_paper(paper, corrections, reference_findings):
    codes = {part["code"] for part in paper["parts"]}
    matches = defaultdict(list)
    issues = []
    for topic_label, raw in paper["topicHints"].items():
        if topic_label not in TOPICS:
            issues.append({"kind": "unknown-topic", "topic": topic_label, "reference": raw})
            continue
        topic_id = TOPICS[topic_label]
        prefix, chunks = split_references(raw)
        if prefix.strip(" ,"):
            issues.append({"kind": "unparsed-text", "topic": topic_id, "reference": prefix})
        for question, suffix in chunks:
            reference = f"Q{question}{suffix}"
            paths, errors = expand_suffix(suffix)
            issues.extend({"kind": "invalid-reference", "topic": topic_id, "reference": reference, "detail": error} for error in errors)
            for path in paths:
                target = str(question) + path
                found = [code for code in codes if int(re.match(r"\d+", code)[0]) == question
                         and (code == target or len(path) <= 1 and code.startswith(target))]
                if not found:
                    issues.append({"kind": "missing-part", "topic": topic_id, "reference": reference, "target": target})
                for code in found:
                    matches[code].append((len(path), topic_id))

    mapped = {}
    conflicts = {}
    for code in sorted(matches):
        strongest = max(specificity for specificity, _ in matches[code])
        topic_ids = sorted({topic for specificity, topic in matches[code] if specificity == strongest})
        mapped[code] = topic_ids
        if len(topic_ids) > 1:
            conflicts[code] = topic_ids
    for code, correction in corrections.items():
        if code not in codes:
            raise ValueError(f"Unknown correction part: {paper['paperId']} {code}")
        topic_ids = correction["topicIds"]
        if not topic_ids or any(topic_id not in TOPICS.values() for topic_id in topic_ids):
            raise ValueError(f"Invalid correction topic: {paper['paperId']} {code}")
        mapped[code] = topic_ids
        if len(topic_ids) > 1:
            conflicts[code] = topic_ids
        else:
            conflicts.pop(code, None)
    issue_refs = {issue["reference"] for issue in issues}
    if set(reference_findings) - issue_refs:
        raise ValueError(f"Findings without source issues: {paper['paperId']} {sorted(set(reference_findings) - issue_refs)}")
    return {
        "paperId": paper["paperId"],
        "candidateTopicIdsByPart": mapped,
        "unmappedParts": sorted(codes - mapped.keys()),
        "overlappingTopicHints": conflicts,
        "unresolvedOverlappingTopicHints": {code: topics for code, topics in conflicts.items() if code not in corrections},
        "referenceIssues": issues,
        "unresolvedReferenceIssues": [issue for issue in issues if issue["reference"] not in reference_findings],
        "pdfTextCorrections": len(corrections),
    }


def main():
    source = json.loads(SOURCE.read_text())
    correction_data = json.loads(CORRECTIONS.read_text())
    corrections = correction_data["papers"]
    reference_findings = correction_data["referenceIssueFindings"]
    known_papers = {paper["paperId"] for paper in source["papers"]}
    if set(corrections) - known_papers:
        raise ValueError(f"Corrections for unknown papers: {sorted(set(corrections) - known_papers)}")
    papers = [map_paper(paper, corrections.get(paper["paperId"], {}), reference_findings.get(paper["paperId"], {})) for paper in source["papers"]]
    result = {
        "status": "paper-review-controlled-by-catalogue",
        "description": "Candidate part topics expanded from Edco workbook hints, with PDF-text-checked corrections. Only papers approved in catalogue.ts enter student topic statistics.",
        "papers": papers,
    }
    OUTPUT.write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n")
    print(f"Wrote {OUTPUT}: {len(papers)} papers, "
          f"{sum(len(p['candidateTopicIdsByPart']) for p in papers)} mapped parts, "
          f"{sum(len(p['unmappedParts']) for p in papers)} unmapped parts, "
          f"{sum(len(p['overlappingTopicHints']) for p in papers)} overlaps, "
          f"{sum(len(p['referenceIssues']) for p in papers)} source-reference issues, "
          f"{sum(len(p['unresolvedReferenceIssues']) for p in papers)} unresolved references, "
          f"{sum(p['pdfTextCorrections'] for p in papers)} PDF-text corrections")


if __name__ == "__main__":
    main()
