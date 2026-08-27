import { getStripe, isLiveStripeMode } from "../../../lib/stripe";
import { recordProductEvent } from "../../../lib/analytics";

export async function POST(request: Request) {
  try {
    const origin = new URL(request.url).origin;
    await recordProductEvent("checkout_attempt").catch(() => {});
    const suffix = crypto.randomUUID().replaceAll("-", "").slice(0, 8);
    const priceId = isLiveStripeMode() ? process.env.STRIPE_LIVE_PRICE_ID : process.env.STRIPE_PRICE_ID;
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      integration_identifier: `commentharbor_${suffix}`,
      line_items: [{
        quantity: 1,
        ...(priceId ? { price: priceId } : { price_data: {
          currency: "usd",
          unit_amount: 1900,
          product_data: { name: "CommentHarbor Lifetime Access", description: "Advanced public comment imports, CSV exports, and giveaway tools." },
        }}),
      }],
      metadata: { product: "commentharbor_lifetime" },
      customer_creation: "always",
      allow_promotion_codes: true,
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancelled#pricing`,
    });
    return Response.json({ url: session.url });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Checkout could not be started." }, { status: 500 });
  }
}
