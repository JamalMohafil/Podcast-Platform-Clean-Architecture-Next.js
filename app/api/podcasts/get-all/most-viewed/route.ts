import { podcastController } from "@/src/interfaces/controllers/podcast/podcastController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";
    const categoryId = searchParams.get("categoryId") || "";

    const result = await podcastController.getMostViewedPodcasts(
      limit,
      page,
      search,
      categoryId
    );
    return NextResponse.json({ success: true, data: result  },{ status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch podcasts" },
      { status: error.statusCode || 500 }
    );
  }
}
