"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../tracker.css";
import "./login.css";

export default function LoginPage() {
  const [needsSetup, setNeedsSetup] = useState(false);
  const [setupKeyRequired, setSetupKeyRequired] = useState(false);
  const [setupKey, setSetupKey] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  useEffect(() => { const timer = window.setTimeout(() => setPasswordChanged(new URLSearchParams(window.location.search).get("passwordChanged") === "1"), 0); void fetch("/api/tracker/bootstrap", { cache:"no-store" }).then(r => r.json()).then(body => { const result = body as { needsSetup?:boolean; setupKeyRequired?:boolean }; const setup = Boolean(result.needsSetup); setNeedsSetup(setup); setSetupKeyRequired(Boolean(result.setupKeyRequired)); if (setup) setUsername("admin"); }).catch(() => undefined); return () => window.clearTimeout(timer); }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch(needsSetup ? "/api/tracker/bootstrap" : "/api/tracker/session", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ username, password, displayName, setupKey }) });
      const body = await response.json() as { error?:string };
      if (!response.ok) throw new Error(body.error || "Sign in failed.");
      window.location.assign("/tracker");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Sign in failed."); setBusy(false); }
  }
  return <main className="tracker-shell"><header className="tracker-header"><Link href="/" className="tracker-brand">EASY MATHS<span>.IE</span></Link></header><div className="tracker-wrap"><section className="tracker-card" style={{maxWidth:480,margin:"48px auto"}}><p className="eyebrow">STUDY TRACKER</p><h1>{needsSetup ? "Create your tutor account" : "Sign in to your tracker"}</h1><p>{needsSetup ? "Choose your own details to start testing the tracker." : "Use the username and password your tutor gave you. Your practice stays saved to your account."}</p>{passwordChanged && <p role="status" className="tracker-login-success">Password changed. Sign in with your new one.</p>}{error && <p role="alert" className="tracker-alert">{error}</p>}<form onSubmit={submit}><label>Username<input autoComplete="username" required minLength={3} maxLength={32} value={username} onChange={event=>setUsername(event.target.value)}/></label>{needsSetup && <label>Your name<input required maxLength={80} value={displayName} onChange={event=>setDisplayName(event.target.value)}/></label>}<label>Password<input type="password" autoComplete={needsSetup ? "new-password" : "current-password"} required minLength={needsSetup ? 12 : undefined} value={password} onChange={event=>setPassword(event.target.value)}/></label>{needsSetup && setupKeyRequired && <label>Setup key<input type="password" autoComplete="off" required value={setupKey} onChange={event=>setSetupKey(event.target.value)}/></label>}<button className="primary" disabled={busy}>{busy ? "Please wait…" : needsSetup ? "Create account" : "Sign in"}</button></form>{!needsSetup && <p className="helper">Need a new password? Ask your tutor to reset it. You can change it after signing in.</p>}</section></div></main>;
}
