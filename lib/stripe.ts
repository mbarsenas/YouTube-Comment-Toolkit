import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_RESTRICTED_KEY;
  if (!key) throw new Error("Payments are not configured yet.");
  return new Stripe(key, { apiVersion: "2026-07-29.dahlia" });
}

export function getPaidSessionId(request: Request) {
  const cookies = request.headers.get("cookie") ?? "";
  return cookies.split(";").map((part) => part.trim()).find((part) => part.startsWith("commentkit_access="))?.slice("commentkit_access=".length) ?? null;
}

export async function hasPaidAccess(request: Request) {
  const sessionId = getPaidSessionId(request);
  if (!sessionId) return false;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid" && session.metadata?.product === "commentkit_lifetime";
  } catch { return false; }
}
