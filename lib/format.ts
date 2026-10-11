import type { ReportStatus, ReportTimelineEvent, SafetyReport } from "@/types";
export const dateTime = (value: string) => new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
export const shortTime = (value: string) => new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date(value));
export const remaining = (value: string, now = Date.now()) => Math.max(0, Math.ceil((new Date(value).getTime() - now) / 60000));
export const reportStatusLabel = (status: ReportStatus) => status === "Resolved" ? "Community-marked resolved" : status;
export function reportTimeline(report: SafetyReport): ReportTimelineEvent[] {
  if (report.timeline?.length) return report.timeline;
  return [{ event: "submitted", status: "Pending Verification", at: report.createdAt }];
}
export const reportEventLabel = (event: ReportTimelineEvent["event"]) => ({
  submitted: "Report submitted",
  review_requested: "Review requested locally · nobody was notified",
  community_marked_resolved: "Marked resolved by the community",
  verification_status_recorded: "Independent verification status recorded",
}[event]);
