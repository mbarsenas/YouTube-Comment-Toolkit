import { neon } from "@neondatabase/serverless";

function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Entitlement database is not configured.");
  return neon(url);
}

export type Entitlement = { id: number; email: string; status: string };

export async function upsertEntitlement(input: { email: string; customerId?: string | null; sessionId: string }) {
  const email = input.email.trim().toLowerCase();
  const rows = await db()`INSERT INTO entitlements (email, stripe_customer_id, stripe_checkout_session_id, status, updated_at)
    VALUES (${email}, ${input.customerId ?? null}, ${input.sessionId}, 'active', now())
    ON CONFLICT (email) DO UPDATE SET stripe_customer_id = COALESCE(EXCLUDED.stripe_customer_id, entitlements.stripe_customer_id), stripe_checkout_session_id = EXCLUDED.stripe_checkout_session_id, status = 'active', updated_at = now()
    RETURNING id, email, status`;
  return rows[0] as Entitlement;
}

export async function getEntitlementById(id: number) {
  const rows = await db()`SELECT id, email, status FROM entitlements WHERE id = ${id} AND status = 'active' LIMIT 1`;
  return (rows[0] as Entitlement | undefined) ?? null;
}

export async function getEntitlementByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  const rows = await db()`SELECT id, email, status FROM entitlements WHERE email = ${normalized} AND status = 'active' LIMIT 1`;
  return (rows[0] as Entitlement | undefined) ?? null;
}

export async function recordWebhook(eventId: string, eventType: string) {
  const rows = await db()`INSERT INTO stripe_webhook_events (stripe_event_id, event_type) VALUES (${eventId}, ${eventType}) ON CONFLICT DO NOTHING RETURNING stripe_event_id`;
  return rows.length > 0;
}

export async function createRecoveryToken(email: string, tokenHash: string) {
  await db()`DELETE FROM recovery_tokens WHERE email = ${email} OR expires_at < now()`;
  await db()`INSERT INTO recovery_tokens (token_hash, email, expires_at) VALUES (${tokenHash}, ${email}, now() + interval '15 minutes')`;
}

export async function consumeRecoveryToken(tokenHash: string) {
  const rows = await db()`UPDATE recovery_tokens SET used_at = now() WHERE token_hash = ${tokenHash} AND used_at IS NULL AND expires_at > now() RETURNING email`;
  if (!rows[0]?.email) return null;
  return getEntitlementByEmail(String(rows[0].email));
}
