import { getPodcastFavoritesCountController } from "@/src/interfaces/controllers/favorite/getPodcastFavoritesCountController";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ podcastId: string }> }
) => {
  try {
    const podcastId = (await params).podcastId;
    const controller = await getPodcastFavoritesCountController(podcastId);
    return NextResponse.json({ success: true, data: controller });
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message, success: false },
      { status: e.statusCode || 500 }
    );
  }
};
