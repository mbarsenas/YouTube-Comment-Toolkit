import { createHash, randomBytes } from "node:crypto";
import { createRecoveryToken, getEntitlementByEmail } from "../../../../../lib/entitlements";

export async function POST(request: Request) {
  const { email = "" } = await request.json() as { email?: string };
  const normalized = email.trim().toLowerCase();
  const generic = { message: "If that email has a purchase, a recovery link is on its way." };
  if (!/^\S+@\S+\.\S+$/.test(normalized)) return Response.json(generic);
  const entitlement = await getEntitlementByEmail(normalized);
  if (!entitlement) return Response.json(generic);
  const token = randomBytes(32).toString("hex");
  await createRecoveryToken(normalized, createHash("sha256").update(token).digest("hex"));
  const origin = new URL(request.url).origin;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return Response.json({ error: "Recovery email is not configured." }, { status: 503 });
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" }, body: JSON.stringify({ from: "CommentHarbor <commentharbor@tenantiq365.com>", to: [normalized], subject: "Restore your CommentHarbor purchase", html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto"><h2>Restore CommentHarbor Pro</h2><p>Use the secure link below to restore lifetime access on this browser. It expires in 15 minutes and works once.</p><p><a href="${origin}/api/billing/recovery/confirm?token=${token}" style="display:inline-block;background:#17392f;color:white;padding:13px 18px;border-radius:8px;text-decoration:none">Restore purchase</a></p><p>If you did not request this, you can ignore this email.</p></div>` }) });
  if (!response.ok) return Response.json({ error: "Recovery email could not be sent." }, { status: 502 });
  return Response.json(generic);
}
