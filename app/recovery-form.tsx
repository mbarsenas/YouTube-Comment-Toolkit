"use client";
import { useState } from "react";

export function RecoveryForm({ paid }: { paid: boolean }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(() => {
    if (typeof window === "undefined") return "";
    const value = new URLSearchParams(window.location.search).get("recovery");
    if (value === "success") return "Purchase restored on this browser.";
    if (value === "expired") return "That recovery link expired or was already used.";
    if (value === "invalid") return "That recovery link is invalid.";
    return "";
  });
  const [sending, setSending] = useState(false);
  async function requestRecovery(event: React.FormEvent) {
    event.preventDefault(); setSending(true); setMessage("");
    try {
      const response = await fetch("/api/billing/recovery/request", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await response.json(); setMessage(data.message ?? data.error ?? "Recovery could not be started.");
    } catch { setMessage("Recovery could not be started."); }
    finally { setSending(false); }
  }
  if (paid) return null;
  return <div className="recovery-card"><div><span className="label">PURCHASE RECOVERY</span><h3>Already purchased?</h3><p>Enter the email used at checkout. We’ll send a secure, one-time link that restores Pro access on this browser.</p></div><form onSubmit={requestRecovery}><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-label="Purchase email"/><button disabled={sending}>{sending ? "Sending…" : "Email recovery link"}</button>{message && <small>{message}</small>}</form></div>;
}
