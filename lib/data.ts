import type { SafetyReport, TrustedContact } from "@/types";
export const sampleReports: SafetyReport[] = [
  { id: "sample-light-1", category: "Lighting", description: "Demo marker: lighting report location", location: "Library Plaza · Demo location", lat: 33.7532, lng: -84.3858, createdAt: "2026-10-08T22:15:00-04:00", status: "Pending Verification", sample: true },
  { id: "sample-walk-1", category: "Obstructed walkway", description: "Demo marker: walkway report location", location: "Student Center · Demo location", lat: 33.7524, lng: -84.3868, createdAt: "2026-10-07T18:40:00-04:00", status: "Pending Verification", sample: true },
  { id: "sample-access-1", category: "Accessibility", description: "Demo marker: accessibility report location", location: "Aderhold Learning Center · Demo location", lat: 33.7551, lng: -84.3891, createdAt: "2026-10-05T13:00:00-04:00", status: "Verified infrastructure issue", sample: true }
];
export const defaultContacts: TrustedContact[] = [
  { id: "contact-maya", name: "Maya Chen", method: "maya@example.com", sample: true },
  { id: "contact-jordan", name: "Jordan Lee", method: "(404) 555-0182", sample: true }
];
export const campusCenter: [number, number] = [33.7537, -84.3859];
