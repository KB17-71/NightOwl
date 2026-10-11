"use client";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin, ShieldCheck, UsersRound, Activity, Plus, Sparkles, LockKeyhole, Check } from "lucide-react";
import { useApp } from "@/components/AppProvider";
import { MapView } from "@/components/MapView";
import { ReportList } from "@/components/ReportList";
import { shortTime } from "@/lib/format";

export default function Dashboard() {
  const { reports, activeWalk, contacts, walks } = useApp();
  const pending = reports.filter(r => r.status === "Pending Verification").length;
  const resolved = reports.filter(r => r.status === "Resolved").length;
  const latestCompleted = walks.find(w => w.status === "completed");

  return <>
    <section className="welcome-row">
      <div><div className="eyebrow"><Sparkles size={14}/> NIGHTOWL · CAMPUS SAFETY, TOGETHER</div><h1>Your walk. Your people.<br/><span>Your peace of mind.</span></h1><p>NightOwl helps campus walks feel more supported. Make a plan, bring your people along, and check in when you arrive.</p><div className="welcome-actions"><Link className="button button-primary" href="/walk"><MapPin size={17}/>{activeWalk ? "View active walk" : "Start a Walk"}<ArrowRight size={16}/></Link><Link className="button button-quiet" href="/report"><Plus size={17}/>Report an issue</Link></div></div>
      <div className="welcome-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><span className="owl-glow"><span className="owl-face">◉ ◉<i>⌄</i></span></span><span className="art-star star-a">✦</span><span className="art-star star-b">✦</span><span className="art-caption">LOOK OUT<br/>FOR EACH OTHER</span></div>
    </section>

    <section className="stats-grid"><div className="stat-card"><span className="stat-icon purple"><Activity size={18}/></span><div><span className="stat-label">Walk status</span><strong>{activeWalk ? (activeWalk.status === "overdue" ? "Check-in due" : "In progress") : latestCompleted ? "Completed safely" : "All clear"}</strong><small>{activeWalk ? `To ${activeWalk.destination}` : latestCompleted ? `Arrived at ${latestCompleted.destination}` : "No active walk right now"}</small></div><span className={`stat-indicator ${activeWalk?.status === "overdue" ? "indicator-warn" : ""}`}/></div><div className="stat-card"><span className="stat-icon amber"><Clock3 size={18}/></span><div><span className="stat-label">Awaiting review</span><strong>{pending} {pending === 1 ? "report" : "reports"}</strong><small>Community submissions</small></div></div><div className="stat-card"><span className="stat-icon blue"><UsersRound size={18}/></span><div><span className="stat-label">Your circle</span><strong>{contacts.length} trusted {contacts.length === 1 ? "contact" : "contacts"}</strong><small>Only shared when you choose</small></div></div></section>

    <section className="panel impact-panel" aria-labelledby="community-impact-title"><div className="impact-heading"><div><div className="section-kicker">REPORT ACTIVITY</div><h2 id="community-impact-title">Community Impact</h2><p>Counts include submitted reports and labeled sample records in this current demo dataset. They are not verified campus-wide outcomes.</p></div><Link className="text-link" href="/map">View reports <ArrowRight size={15}/></Link></div><div className="impact-grid"><div className="impact-metric"><span className="impact-icon purple"><MapPin size={16}/></span><span className="impact-label">Total reports submitted</span><strong>{reports.length}</strong></div><div className="impact-metric"><span className="impact-icon amber"><Clock3 size={16}/></span><span className="impact-label">Awaiting review</span><strong>{pending}</strong></div><div className="impact-metric"><span className="impact-icon green"><Check size={16}/></span><span className="impact-label">Community-marked resolved</span><strong>{resolved}</strong></div></div></section>

    {activeWalk && <Link href="/walk" className={`active-banner ${activeWalk.status === "overdue" ? "overdue-banner" : ""}`}><span className="pulse"/><div><strong>{activeWalk.status === "overdue" ? "Your estimated arrival time has passed" : "Your walk is underway"}</strong><span>{activeWalk.start} → {activeWalk.destination}{activeWalk.status === "overdue" ? " · Please check in" : ` · Expected ${shortTime(activeWalk.expectedArrival)}`}</span></div><span className="banner-link">Open walk <ArrowRight size={16}/></span></Link>}

    <div className="dashboard-grid"><section className="panel map-panel"><div className="panel-head"><div><div className="section-kicker">CAMPUS PULSE</div><h2>Safety map</h2><p>Community-submitted reports around campus</p></div><Link className="text-link" href="/map">Explore map <ArrowRight size={15}/></Link></div><MapView reports={reports} compact/><div className="map-legend"><span><i className="legend-dot pending-dot"/>Pending review</span><span><i className="legend-dot verified-dot"/>Verified status (demo samples)</span><span><i className="legend-dot resolved-dot"/>Community-marked resolved</span><span className="legend-note">Samples are labeled</span></div></section>
    <section className="panel recent-panel"><div className="panel-head"><div><div className="section-kicker">COMMUNITY NOTES</div><h2>Recent reports</h2><p>Community submissions, not emergency alerts</p></div><Link className="text-link" href="/report" aria-label="Submit report"><Plus size={18}/></Link></div><ReportList reports={reports.slice(0, 4)}/><Link className="all-reports" href="/map">View all reports <ArrowRight size={15}/></Link></section></div>

    <section className="trust-strip"><div className="trust-lock"><LockKeyhole size={19}/></div><div><strong>Your safety, on your terms.</strong><p>Walks stay private until you choose to share with a trusted contact. Your demo data lives in this browser only.</p></div><Link href="/contacts">Manage your circle <ArrowRight size={15}/></Link></section>
    <div className="disclaimer"><ShieldCheck size={16}/><span>NightOwl is a hackathon prototype. It does not provide guaranteed monitoring or emergency dispatch. If someone faces immediate danger, contact local emergency services.</span></div>
  </>;
}
