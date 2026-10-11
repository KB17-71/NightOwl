import type { SafetyReport } from "@/types";
import { dateTime, reportStatusLabel } from "@/lib/format";
import { Check, Clock3, MapPin } from "lucide-react";

export function ReportList({ reports }: { reports: SafetyReport[] }) {
  if (!reports.length) return <div className="empty-state"><span className="empty-icon"><MapPin/></span><strong>No reports yet</strong><p>Community reports will appear here once submitted.</p></div>;

  return <div className="report-list">{reports.map(r => <article className="report-row" key={r.id}>
    <span className={`report-icon ${r.status === "Resolved" ? "ri-green" : r.status === "Verified infrastructure issue" ? "ri-blue" : "ri-amber"}`}>{r.status === "Resolved" ? <Check size={17}/> : <Clock3 size={17}/>}</span>
    <div className="report-body">
      <div className="report-title-line"><strong>{r.category}</strong><span className={`status-badge ${r.status === "Resolved" ? "badge-green" : r.status === "Verified infrastructure issue" ? "badge-blue" : "badge-amber"}`}>{reportStatusLabel(r.status)}</span></div>
      <p>{r.description}</p>
      <div className="report-meta"><MapPin size={13}/>{r.location}<span>·</span><span>Submitted {dateTime(r.createdAt)}</span>{r.sample && <span className="sample-label">Demo sample</span>}</div>
    </div>
  </article>)}</div>;
}
