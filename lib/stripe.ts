import Stripe from "stripe";
import { getEntitlementById, upsertEntitlement } from "./entitlements";

export function getStripe() {
  const key = process.env.STRIPE_RESTRICTED_KEY;
  if (!key) throw new Error("Payments are not configured yet.");
  return new Stripe(key, { apiVersion: "2026-07-29.dahlia" });
}

export function getPaidSessionId(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  return cookies.split(";").map((part) => part.trim()).find((part) => part.startsWith("commentkit_access="))?.slice("commentkit_access=".length) ?? null;
}

function bytesToHex(bytes: Uint8Array) { return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join(""); }
async function hmac(value: string) {
  const secret = process.env.COMMENTKIT_SESSION_SECRET;
  if (!secret) throw new Error("Session signing is not configured.");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return bytesToHex(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value))));
}

export async function createAccessCookie(entitlementId: number) {
  const expires = Math.floor(Date.now() / 1000) + 31536000;
  const value = `${entitlementId}.${expires}`;
  return `commentkit_entitlement=${value}.${await hmac(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`;
}

async function getSignedEntitlement(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  const token = cookies.split(";").map((x) => x.trim()).find((x) => x.startsWith("commentkit_entitlement="))?.slice("commentkit_entitlement=".length);
  if (!token) return null;
  const [id, expires, signature] = token.split(".");
  if (!id || !expires || !signature || Number(expires) < Date.now() / 1000) return null;
  const expected = await hmac(`${id}.${expires}`);
  if (signature !== expected) return null;
  return getEntitlementById(Number(id));
}

export async function hasPaidAccess(request: Request) {
  try { if (await getSignedEntitlement(request)) return true; } catch {}
  const sessionId = getPaidSessionId(request);
  if (!sessionId) return false;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid" && ["commentharbor_lifetime", "commentkit_lifetime"].includes(session.metadata?.product ?? "");
    if (paid && session.customer_details?.email) await upsertEntitlement({ email: session.customer_details.email, customerId: typeof session.customer === "string" ? session.customer : null, sessionId: session.id });
    return paid;
  } catch { return false; }
}
