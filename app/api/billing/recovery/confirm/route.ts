import { createHash } from "node:crypto";
import { consumeRecoveryToken } from "../../../../../lib/entitlements";
import { createAccessCookie } from "../../../../../lib/stripe";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  if (!/^[a-f0-9]{64}$/.test(token)) return Response.redirect(`${url.origin}/?recovery=invalid`);
  const entitlement = await consumeRecoveryToken(createHash("sha256").update(token).digest("hex"));
  if (!entitlement) return Response.redirect(`${url.origin}/?recovery=expired`);
  return new Response(null, { status: 302, headers: { location: `${url.origin}/?recovery=success`, "set-cookie": await createAccessCookie(entitlement.id) } });
}
