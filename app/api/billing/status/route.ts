import { hasPaidAccess } from "../../../../lib/stripe";
export async function GET(request: Request) { return Response.json({ paid: await hasPaidAccess(request) }); }
