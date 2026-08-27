import { neon } from "@neondatabase/serverless";

export type ProductEvent = "comment_import" | "checkout_attempt" | "purchase" | "export" | "giveaway_draw";

function database() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("Analytics database is not configured.");
  return neon(url);
}

export async function recordProductEvent(eventName: ProductEvent, input: {
  entitlementId?: number | null;
  metadata?: Record<string, string | number | boolean | null>;
} = {}) {
  await database()`INSERT INTO product_events (event_name, entitlement_id, metadata)
    VALUES (${eventName}, ${input.entitlementId ?? null}, ${JSON.stringify(input.metadata ?? {})}::jsonb)`;
}

export async function recordSystemEvent(eventName: ProductEvent, input: {
  entitlementId?: number | null;
  metadata?: Record<string, string | number | boolean | null>;
} = {}) {
  await recordProductEvent(eventName, input);
}
