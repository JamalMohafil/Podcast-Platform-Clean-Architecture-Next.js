import { podcastController } from "@/src/interfaces/controllers/podcast/podcastController";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    const controller = await podcastController.updatePodcastViewesCount(id);

    return NextResponse.json(
      { success: true, data: controller },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 500 }
    );
  }
};
