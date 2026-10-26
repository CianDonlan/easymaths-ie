import { papers, parts, topics } from "../../../tracker/catalogue";
import { attemptsFor, canRead, jsonError, member } from "../../../tracker/server";
import { methodScale } from "../../../tracker/model";

export const dynamic = "force-dynamic";
function csvCell(value: unknown) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}
export async function GET(request: Request) {
  const user = await member();
  if (!user || user.role !== "tutor") return jsonError("Tutor access required.", 403);
  const student = new URL(request.url).searchParams.get("student");
  if (!student || !await canRead(user, student)) return jsonError("Access denied.", 403);
  const attempts = await attemptsFor(student);
  const format = new URL(request.url).searchParams.get("format");
  if (format === "csv") {
    const columns = ["id","studentId","partId","attemptedAt","methodScore","scaleVersion","earnedMarks","maximumMarks","note","createdAt","updatedAt"] as const;
    const content = [columns.join(","), ...attempts.map(attempt => columns.map(key => csvCell(attempt[key])).join(","))].join("\r\n");
    return new Response(content, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="tracker-${student}.csv"`, "Cache-Control": "no-store" } });
  }
  return new Response(JSON.stringify({ schemaVersion: 1, exportedAt: new Date().toISOString(), studentId: student, methodScale, papers, parts, topics, attempts }, null, 2), { headers: { "Content-Type": "application/json; charset=utf-8", "Content-Disposition": `attachment; filename="tracker-${student}.json"`, "Cache-Control": "no-store" } });
}
