import { getStripe } from "../../../lib/stripe";

export async function POST(request: Request) {
  try {
    const origin = new URL(request.url).origin;
    const suffix = crypto.randomUUID().replaceAll("-", "").slice(0, 8);
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      integration_identifier: `commentkit_${suffix}`,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: 1900,
          product_data: { name: "CommentKit Lifetime Early Access", description: "Unlimited comment imports, exports, and giveaway tools." },
        },
      }],
      metadata: { product: "commentkit_lifetime" },
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
