import { getStripe } from "../../../../lib/stripe";

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId || !sessionId.startsWith("cs_")) return Response.json({ paid: false }, { status: 400 });
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid" && session.metadata?.product === "commentkit_lifetime";
    const headers = new Headers({ "content-type": "application/json" });
    if (paid) headers.append("set-cookie", `commentkit_access=${session.id}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`);
    return new Response(JSON.stringify({ paid, email: paid ? session.customer_details?.email : null }), { status: paid ? 200 : 402, headers });
  } catch { return Response.json({ paid: false }, { status: 400 }); }
}
