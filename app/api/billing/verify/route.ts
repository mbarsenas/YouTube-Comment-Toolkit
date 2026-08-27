import { getStripe } from "../../../../lib/stripe";
import { createAccessCookie } from "../../../../lib/stripe";
import { upsertEntitlement } from "../../../../lib/entitlements";

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId || !sessionId.startsWith("cs_")) return Response.json({ paid: false }, { status: 400 });
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid" && ["commentharbor_lifetime", "commentkit_lifetime"].includes(session.metadata?.product ?? "");
    const headers = new Headers({ "content-type": "application/json" });
    if (paid && session.customer_details?.email) {
      const entitlement = await upsertEntitlement({ email: session.customer_details.email, customerId: typeof session.customer === "string" ? session.customer : null, sessionId: session.id });
      headers.append("set-cookie", await createAccessCookie(entitlement.id));
      headers.append("set-cookie", `commentkit_access=${session.id}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`);
    }
    return new Response(JSON.stringify({ paid, email: paid ? session.customer_details?.email : null }), { status: paid ? 200 : 402, headers });
  } catch { return Response.json({ paid: false }, { status: 400 }); }
}
