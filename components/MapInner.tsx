"use client";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import type { SafetyReport } from "@/types";
import { campusCenter } from "@/lib/data";
import { dateTime, reportStatusLabel } from "@/lib/format";

function Fit({ reports }: { reports: SafetyReport[] }) { const map = useMap(); useEffect(() => { if (reports.length > 0) map.setView(campusCenter, 16); }, [map, reports.length]); return null; }
const marker = (status: string) => L.divIcon({ className: "", html: `<span class="map-marker ${status === "Resolved" ? "marker-resolved" : status === "Verified infrastructure issue" ? "marker-verified" : "marker-pending"}"></span>`, iconSize: [18, 18], iconAnchor: [9, 9] });

export default function MapInner({ reports }: { reports: SafetyReport[] }) {
  return <MapContainer center={campusCenter} zoom={16} scrollWheelZoom={false} className="leaflet-map"><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/><Fit reports={reports}/>{reports.map(r => <Marker key={r.id} position={[r.lat, r.lng]} icon={marker(r.status)}><Popup><div className="popup-title">{r.category}</div><div>{r.description}</div><small>{r.location}</small><small>Submitted {dateTime(r.createdAt)}</small><span className="status-text">{reportStatusLabel(r.status)}{r.sample ? " · demo sample" : " · community submission"}</span></Popup></Marker>)}</MapContainer>;
}
