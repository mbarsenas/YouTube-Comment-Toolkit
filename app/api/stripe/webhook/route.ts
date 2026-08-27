import Stripe from "stripe";
import { getStripe } from "../../../../lib/stripe";
import { recordWebhook, upsertEntitlement } from "../../../../lib/entitlements";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) return new Response("Webhook not configured", { status: 400 });
  try {
    const event = await getStripe().webhooks.constructEventAsync(await request.text(), signature, secret);
    if (!(await recordWebhook(event.id, event.type))) return Response.json({ received: true, duplicate: true });
    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email;
      if (session.payment_status === "paid" && session.metadata?.product === "commentkit_lifetime" && email) {
        await upsertEntitlement({ email, customerId: typeof session.customer === "string" ? session.customer : null, sessionId: session.id });
      }
    }
    return Response.json({ received: true });
  } catch { return new Response("Invalid webhook signature", { status: 400 }); }
}
