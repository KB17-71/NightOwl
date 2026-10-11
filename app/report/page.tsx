"use client";
import { FormEvent, useState } from "react";
import { AlertTriangle, Check, MapPin, ShieldCheck, X, Camera } from "lucide-react";
import { useApp } from "@/components/AppProvider";
import type { ReportCategory } from "@/types";
import { dateTime, reportEventLabel, reportStatusLabel, reportTimeline } from "@/lib/format";

const locations = [{name:"Library Plaza",lat:33.7532,lng:-84.3858},{name:"Student Center",lat:33.7524,lng:-84.3868},{name:"Aderhold Learning Center",lat:33.7551,lng:-84.3891},{name:"Courtland Street entrance",lat:33.7538,lng:-84.3879},{name:"Other campus location",lat:33.7542,lng:-84.3842}];

export default function ReportPage() {
  const { reports, addReport, updateReport } = useApp();
  const [category, setCategory] = useState<ReportCategory>("Lighting");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(locations[0].name);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const mine = reports.filter(r => !r.sample);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (description.trim().length < 8) { setError("Please add a few more details (at least 8 characters)."); return; }
    const point = locations.find(l => l.name === location) ?? locations[0];
    addReport({ category, description: description.trim(), location: point.name, lat: point.lat, lng: point.lng });
    setDescription(""); setError(""); setSuccess("Your community report was added as Pending Verification.");
  };

  const markResolved = (id: string) => { updateReport(id, "Resolved", "community_marked_resolved"); setSuccess("The report was marked resolved by the community in this demo."); };
  const requestReview = (id: string) => { updateReport(id, "Pending Verification", "review_requested"); setSuccess("Review request recorded in this browser only; nobody was notified."); };

  return <>
    <div className="page-heading"><div className="eyebrow"><MapPin size={14}/> COMMUNITY CARE</div><h1>Report an issue</h1><p>Share an environmental condition that could help the campus community.</p></div>
    {success && <div className="toast"><Check size={16}/>{success}<button onClick={() => setSuccess("")} aria-label="Dismiss"><X size={16}/></button></div>}
    <div className="report-page-grid"><section className="panel issue-form-card"><div className="section-kicker">NEW COMMUNITY REPORT</div><h2>What did you notice?</h2><p>Describe observable conditions. Reports are community submissions and are not independently verified.</p><form onSubmit={submit} className="stack-form">
      <label>Issue category<select value={category} onChange={e => setCategory(e.target.value as ReportCategory)}><option>Lighting</option><option>Obstructed walkway</option><option>Damaged sidewalk</option><option>Accessibility</option><option>Other</option></select></label>
      <label>Description<textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the environmental condition (avoid names or personal accusations)." rows={4} required minLength={8} maxLength={300}/><small className="field-help">{description.length}/300 characters</small></label>
      <label>Location<select value={location} onChange={e => setLocation(e.target.value)}>{locations.map(l => <option key={l.name}>{l.name}</option>)}</select><small className="field-help">Choose an approximate campus point. Your device location is not accessed.</small></label>
      <div className="attachment-placeholder"><Camera size={18}/><span><strong>Photo attachment</strong><small>Not included in this demo. Please avoid uploading identifiable people.</small></span><span className="optional-label">Optional</span></div>
      {error && <div className="inline-error" role="alert">{error}</div>}<button className="button button-primary button-full" type="submit">Submit community report <MapPin size={16}/></button>
    </form></section><aside className="report-side">
      <div className="panel report-safety"><span className="safety-icon"><AlertTriangle/></span><h3>When someone is in immediate danger</h3><p>Contact local emergency services directly. NightOwl does not provide emergency response, monitoring, or dispatch.</p></div>
      <div className="panel report-privacy"><ShieldCheck/><div><strong>Community submitted · demo only</strong><p>Reports are saved in this browser. No report or review request is sent to university staff or emergency services. Pending Verification does not mean a report was received or reviewed by staff.</p></div></div>
      <section className="panel my-reports"><div className="panel-head"><div><div className="section-kicker">YOUR CONTRIBUTIONS</div><h2>My reports</h2></div><span className="count-circle">{mine.length}</span></div>
        {mine.length ? <div className="report-list">{mine.map(r => <article className="report-row" key={r.id}><span className={`report-icon ${r.status === "Resolved" ? "ri-green" : r.status === "Verified infrastructure issue" ? "ri-blue" : "ri-amber"}`}><MapPin size={17}/></span><div className="report-body">
          <div className="report-title-line"><strong>{r.category}</strong><span className={`status-badge ${r.status === "Resolved" ? "badge-green" : r.status === "Verified infrastructure issue" ? "badge-blue" : "badge-amber"}`}>{reportStatusLabel(r.status)}</span></div>
          <p>{r.description}</p><small className="report-meta">{r.location} · Submitted {dateTime(r.createdAt)}</small>
          <ol className="report-timeline" aria-label={`Timeline for ${r.category} report`}>{reportTimeline(r).map((item, index) => <li key={`${item.at}-${index}`}><span className="timeline-dot"/><span><strong>{reportEventLabel(item.event)}</strong><small>{dateTime(item.at)} · {reportStatusLabel(item.status)}</small></span></li>)}</ol>
          <div className="report-actions"><button onClick={() => markResolved(r.id)} disabled={r.status === "Resolved"}>Mark condition resolved</button><button onClick={() => requestReview(r.id)}>Request review (local)</button></div>
        </div></article>)}</div> : <div className="empty-state"><MapPin/><strong>No reports submitted</strong><p>Your reports will be listed here.</p></div>}
      </section>
    </aside></div>
  </>;
}
