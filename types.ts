export type WalkSession = {
  id: string; walkerName: string; start: string; destination: string;
  durationMinutes: number; contactIds: string[]; startedAt: string;
  expectedArrival: string; status: "active" | "overdue" | "completed" | "cancelled";
  completedAt?: string;
};
export type TrustedContact = { id: string; name: string; method: string; sample?: boolean };
export type ReportCategory = "Lighting" | "Obstructed walkway" | "Damaged sidewalk" | "Accessibility" | "Other";
export type ReportStatus = "Pending Verification" | "Verified infrastructure issue" | "Resolved";
export type ReportTimelineEvent = {
  event: "submitted" | "review_requested" | "community_marked_resolved" | "verification_status_recorded";
  status: ReportStatus;
  at: string;
};
export type SafetyReport = {
  id: string; category: ReportCategory; description: string;
  location: string; lat: number; lng: number; createdAt: string;
  status: ReportStatus;
  timeline?: ReportTimelineEvent[];
  sample?: boolean;
};
export type NotificationPreview = { recipientNames: string[]; message: string; status: "Simulated preview" };
