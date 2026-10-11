"use client";
import { useMemo, useState } from "react";
import { MapView } from "@/components/MapView";
import { ReportList } from "@/components/ReportList";
import { useApp } from "@/components/AppProvider";
import { reportStatusLabel } from "@/lib/format";
import type { ReportStatus } from "@/types";
import { List, Map as MapIcon, SlidersHorizontal } from "lucide-react";

const statuses: ReportStatus[] = ["Pending Verification", "Verified infrastructure issue", "Resolved"];

export default function MapPage() {
  const { reports } = useApp();
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState("All statuses");
  const [view, setView] = useState<"map" | "list">("map");
  const filtered = useMemo(() => reports.filter(r => (category === "All categories" || r.category === category) && (status === "All statuses" || r.status === status)), [reports, category, status]);

  return <><div className="page-heading"><div className="eyebrow"><MapIcon size={14}/> COMMUNITY MAP</div><h1>Safety map</h1><p>Browse community-submitted campus conditions. Markers are not emergency alerts.</p></div><section className="panel full-map-panel">
    <div className="map-toolbar"><div className="map-count"><span className="section-kicker">CAMPUS REPORTS</span><strong>{filtered.length} {filtered.length === 1 ? "report" : "reports"}</strong></div><div className="map-filters"><SlidersHorizontal size={16}/><select aria-label="Filter by category" value={category} onChange={e => setCategory(e.target.value)}><option>All categories</option>{["Lighting", "Obstructed walkway", "Damaged sidewalk", "Accessibility", "Other"].map(x => <option key={x}>{x}</option>)}</select><select aria-label="Filter by status" value={status} onChange={e => setStatus(e.target.value)}><option>All statuses</option>{statuses.map(x => <option key={x} value={x}>{reportStatusLabel(x)}</option>)}</select><div className="view-toggle"><button className={view === "map" ? "toggle-active" : ""} aria-label="Map view" onClick={() => setView("map")}><MapIcon size={16}/></button><button className={view === "list" ? "toggle-active" : ""} aria-label="List view" onClick={() => setView("list")}><List size={16}/></button></div></div></div>
    <div className="map-legend full-legend"><span><i className="legend-dot pending-dot"/>Pending verification</span><span><i className="legend-dot verified-dot"/>Verified issue status (demo sample)</span><span><i className="legend-dot resolved-dot"/>Community-marked resolved</span><span className="legend-note">Sample reports are labeled</span></div>{view === "map" ? <MapView reports={filtered}/> : <div className="map-list-view"><ReportList reports={filtered}/></div>}<div className="map-footnote">Locations marked “Demo location” and reports labeled “Demo sample” are demonstration records, not verified hazards. “Community-marked resolved” is a community status, and review requests stay in this browser; they are not sent to staff. Map tiles require an internet connection.</div>
  </section></>;
}
