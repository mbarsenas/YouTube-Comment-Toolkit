import { recordProductEvent, type ProductEvent } from "../../../lib/analytics";

const browserEvents = new Set<ProductEvent>(["export", "giveaway_draw"]);

export async function POST(request: Request) {
  try {
    const body = await request.json() as { event?: ProductEvent; metadata?: Record<string, unknown> };
    if (!body.event || !browserEvents.has(body.event)) return Response.json({ error: "Unsupported event." }, { status: 400 });
    const metadata = Object.fromEntries(Object.entries(body.metadata ?? {})
      .filter(([, value]) => ["string", "number", "boolean"].includes(typeof value))
      .slice(0, 8)) as Record<string, string | number | boolean>;
    await recordProductEvent(body.event, { metadata });
    return Response.json({ recorded: true });
  } catch {
    return Response.json({ recorded: false }, { status: 202 });
  }
}
