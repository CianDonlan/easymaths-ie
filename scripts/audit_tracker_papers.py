#!/usr/bin/env python3
"""Inventory Edco candidate papers and extract question-part *candidates* for review.

This produces candidates only. Catalogue review decisions are separate. Run from
any directory: python3 scripts/audit_tracker_papers.py [--root TUTORING_DIR].
"""

import argparse
import hashlib
import json
import re
import subprocess
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

NS = {"x": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
QUESTION = re.compile(r"^\s*Question\s+(\d+)\b.*?\((\d+)\s+marks\)", re.I)
ALPHA = re.compile(r"^\s*\(([a-h])\)(?:\s+|$)")
ROMAN = re.compile(r"^\s*\((vi|iv|v|iii|ii|i)\)\s+")


def workbook_rows(path):
    with zipfile.ZipFile(path) as archive:
        strings = []
        if "xl/sharedStrings.xml" in archive.namelist():
            root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
            strings = ["".join(item.itertext()) for item in root.findall("x:si", NS)]
        root = ET.fromstring(archive.read("xl/worksheets/sheet1.xml"))
        rows = []
        for row in root.findall("x:sheetData/x:row", NS):
            cells = {}
            for cell in row.findall("x:c", NS):
                value = cell.find("x:v", NS)
                inline = cell.find("x:is", NS)
                if value is not None:
                    text = strings[int(value.text)] if cell.get("t") == "s" else value.text
                else:
                    text = "".join(inline.itertext()) if inline is not None else ""
                cells[re.match(r"[A-Z]+", cell.get("r")).group()] = text
            rows.append(cells)
        return rows


def pdf_parts(path, layout=True):
    text = subprocess.run(["pdftotext", "-layout" if layout else "-raw", str(path), "-"], check=True, capture_output=True, text=True).stdout
    questions = []
    current = None
    active_alpha = None
    ordinal = 0
    for page_number, page in enumerate(text.split("\f"), 1):
        for line in page.splitlines():
            heading = QUESTION.match(line)
            if heading:
                current = {"number": int(heading[1]), "totalMarks": int(heading[2]), "sourcePage": page_number, "headings": []}
                questions.append(current)
                active_alpha = None
                continue
            if current is None:
                continue
            alpha = ALPHA.match(line)
            if alpha:
                active_alpha = alpha[1]
                ordinal += 1
                current["headings"].append({"code": f"{current['number']}{active_alpha}", "page": page_number, "order": ordinal})
                line = line[alpha.end():]
            roman = ROMAN.match(line)
            if roman and active_alpha:
                ordinal += 1
                current["headings"].append({"code": f"{current['number']}{active_alpha}{roman[1]}", "page": page_number, "order": ordinal})
    parts = []
    issues = []
    numbers = [q["number"] for q in questions]
    if numbers != list(range(1, max(numbers, default=0) + 1)):
        issues.append(f"Question heading sequence: {numbers}")
    for question in questions:
        headings = question["headings"]
        if not headings:
            issues.append(f"Q{question['number']} has no extracted part headings")
            continue
        codes = [h["code"] for h in headings]
        for code in set(codes):
            if codes.count(code) > 1:
                issues.append(f"Repeated extracted heading: {code}")
        for heading in headings:
            code = heading["code"]
            suffix = code[len(str(question["number"])):]
            match = re.fullmatch(r"([a-h])(?:(vi|iv|v|iii|ii|i))?", suffix)
            if not match:
                issues.append(f"Unrecognised part code: {code}")
                continue
            if not match[2] and any(other != code and other.startswith(code) for other in codes):
                continue  # An alphabetic parent heading, never a second trackable row.
            if any(part["code"] == code for part in parts):
                continue  # Keep the first source position, but flag the duplicate above.
            label = f"Q{question['number']}({match[1]})" + (f"({match[2]})" if match[2] else "")
            parts.append({"code": code, "label": label, "order": heading["order"], "sourcePage": heading["page"], "maximumMarks": None, "reviewStatus": "needs-review"})
    return questions, parts, sorted(set(issues))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[2], help="Tutoring workspace directory")
    args = parser.parse_args()
    root = args.root.resolve()
    paper_dir = root / "study_app/lc-maths-study-app/data/papers"
    workbooks = {1: next(root.glob("drive-download-*/Paper 1 Topics.xlsx")), 2: next(root.glob("drive-download-*/Paper 2 Topics.xlsx"))}
    results = []
    for paper_number, workbook in workbooks.items():
        rows = workbook_rows(workbook)
        headers = rows[0]
        for column, header in headers.items():
            if column == "A" or not re.search(r"20\d\d", header):
                continue
            year = int(re.search(r"20\d\d", header).group())
            sitting = "deferred" if re.search(r"def+er", header, re.I) else "normal"
            paper_id = f"lc-hl-{year}-{sitting}-p{paper_number}"
            path = paper_dir / f"{year}_{sitting}_lc_maths_hl_english_paper_{paper_number}.pdf"
            topic_hints = {row["A"].replace("\n", " ").strip(): row.get(column, "").strip() for row in rows[1:] if row.get("A") and row.get(column, "").strip()}
            # The owner's photographed Edco HL contents pages (25 Oct 2026)
            # list this exact 2018–2025 paper set. This verifies the contents
            # entries only, not the extracted subparts or topic hints.
            item = {"paperId": paper_id, "year": year, "sitting": sitting, "level": "HL", "paperNumber": paper_number,
                    "workbook": str(workbook.relative_to(root)), "bookMatch": "contents-confirmed", "topicHints": topic_hints,
                    "source": str(path.relative_to(root)), "sourcePresent": path.exists()}
            if path.exists():
                item["sha256"] = hashlib.sha256(path.read_bytes()).hexdigest()
                questions, parts, issues = pdf_parts(path)
                item["questions"] = [{key: q[key] for key in ("number", "totalMarks", "sourcePage")} for q in questions]
                item["parts"] = parts
                item["issues"] = issues
                actual_numbers = {question["number"] for question in questions}
                referenced_numbers = {int(number) for raw in topic_hints.values() for number in re.findall(r"\bQ\s*(\d+)", raw, re.I)}
                item["topicHintIssues"] = {
                    "referencesMissingQuestions": sorted(referenced_numbers - actual_numbers),
                    "questionsWithoutExplicitTopicReference": sorted(actual_numbers - referenced_numbers),
                }
            results.append(item)
    results.sort(key=lambda item: (item["year"], item["sitting"] != "normal", item["paperNumber"]))
    out = root / "easymaths-ie/content/edco-2018-2025-candidates.json"
    out.write_text(json.dumps({"description": "Extracted structure and raw topic hints. Review against PDFs and Edco contents before use.", "papers": results}, indent=2, ensure_ascii=False) + "\n")
    print(f"Wrote {out}: {len(results)} papers, {sum(len(x.get('parts', [])) for x in results)} candidate leaf parts")
    for item in results:
        expected = 9 if item["year"] <= 2020 else 10
        if not item["sourcePresent"] or len(item.get("questions", [])) != expected or item.get("issues") or any(item.get("topicHintIssues", {}).values()):
            print(item["paperId"], "questions", len(item.get("questions", [])), "expected", expected, "issues", item.get("issues", ["source missing"]), "topic hints", item.get("topicHintIssues"))


if __name__ == "__main__":
    main()
