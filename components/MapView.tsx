"use client";
import dynamic from "next/dynamic"; import type { SafetyReport } from "@/types";
const InteractiveMap = dynamic(() => import("./MapInner"), { ssr: false, loading: () => <div className="map-loading">Loading campus map…</div> });
export function MapView({ reports, compact = false }: { reports: SafetyReport[]; compact?: boolean }) { return <div className={`map-wrap ${compact ? "map-compact" : ""}`}><InteractiveMap reports={reports}/><div className="map-credit">© OpenStreetMap contributors</div></div>; }
