import { hasPaidAccess } from "../../../../lib/stripe";
import { recordProductEvent } from "../../../../lib/analytics";

function videoId(input: string) {
  try {
    const url = new URL(input);
    if (url.hostname === "youtu.be") return url.pathname.slice(1).split("/")[0];
    if (url.pathname.startsWith("/shorts/")) return url.pathname.split("/")[2];
    return url.searchParams.get("v");
  } catch { return /^[\w-]{11}$/.test(input) ? input : null; }
}

export async function POST(request: Request) {
  try {
    const key = process.env.YOUTUBE_API_KEY;
    if (!key) return Response.json({ error: "Live YouTube access is not configured yet." }, { status: 503 });
    const body = await request.json() as { url?: string };
    const id = videoId(body.url?.trim() ?? "");
    if (!id) return Response.json({ error: "Enter a valid YouTube video or Shorts URL." }, { status: 400 });
    const paid = await hasPaidAccess(request);
    const limit = paid ? 1000 : 100;
    const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${key}`);
    const videoJson = await videoResponse.json() as any;
    if (!videoResponse.ok) return Response.json({ error: videoJson.error?.message ?? "YouTube rejected this request." }, { status: videoResponse.status });
    const video = videoJson.items?.[0];
    if (!video) return Response.json({ error: "That video is private, deleted, or unavailable." }, { status: 404 });
    const comments: any[] = [];
    let pageToken = "";
    do {
      const endpoint = new URL("https://www.googleapis.com/youtube/v3/commentThreads");
      endpoint.searchParams.set("part", "snippet"); endpoint.searchParams.set("videoId", id); endpoint.searchParams.set("maxResults", "100"); endpoint.searchParams.set("order", "relevance"); endpoint.searchParams.set("textFormat", "plainText"); endpoint.searchParams.set("key", key);
      if (pageToken) endpoint.searchParams.set("pageToken", pageToken);
      const response = await fetch(endpoint);
      const json = await response.json() as any;
      if (!response.ok) return Response.json({ error: json.error?.errors?.[0]?.reason === "commentsDisabled" ? "Comments are disabled for this video." : json.error?.message ?? "Comments could not be loaded." }, { status: response.status });
      for (const item of json.items ?? []) {
        const c = item.snippet.topLevelComment.snippet;
        comments.push({ id: item.id, authorId: c.authorChannelId?.value ?? `unknown-${item.id}`, author: c.authorDisplayName, avatarUrl: c.authorProfileImageUrl, avatar: c.authorDisplayName?.split(/\s+/).map((x:string)=>x[0]).join("").slice(0,2).toUpperCase() || "YT", text: c.textDisplay, likes: c.likeCount ?? 0, age: c.publishedAt, owner: c.authorChannelId?.value === video.snippet.channelId });
        if (comments.length >= limit) break;
      }
      pageToken = json.nextPageToken ?? "";
    } while (pageToken && comments.length < limit);
    await recordProductEvent("comment_import", { metadata: { paid, comment_count: comments.length, truncated: Boolean(pageToken) } }).catch(() => {});
    return Response.json({ paid, limit, truncated: Boolean(pageToken), video: { id, title: video.snippet.title, channel: video.snippet.channelTitle, thumbnail: video.snippet.thumbnails?.medium?.url, totalComments: Number(video.statistics.commentCount ?? comments.length) }, comments });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : "Comments could not be loaded." }, { status: 500 }); }
}
