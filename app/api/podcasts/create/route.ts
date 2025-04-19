import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { podcastController } from "@/src/interfaces/controllers/podcast/podcastController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    return requireAdminAuth(async (authReq: AuthenticatedRequest) => {
      try {
        const formData = await authReq.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const audio_url = formData.get("audio_url") as string;
        const cover_image = formData.get("cover_image") as File;
        const guestName = formData.get("guestName") as string;
    const isFeatured = formData.get("isFeatured") === "true";
        const video_url = formData.get("video_url") as string;
        const category_id = formData.get("category_id") as string;
        const toSendData = {
          title: title!!,
          ...(description && { description }),
          ...(audio_url && { audio_url }),
          ...(cover_image && { cover_image }),
          ...(guestName && { guestName }),
          ...(isFeatured && { isFeatured: isFeatured as boolean }),
          ...(video_url && { video_url }),
          ...(category_id && { category_id: category_id as string }), // ensure category_id is a string (not a number)
        };
        const result = await podcastController.createPodcast(toSendData);
        return NextResponse.json(
          { success: true, data: result },
          { status: 201 }
        );
      } catch (e: any) {
        console.error(e);
        return NextResponse.json(
          { message: e.message || "Failed to create podcast", success: false },
          { status: e.statusCode || 500 }
        );
      }
    })(req as AuthenticatedRequest);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create podcast", success: false },
      { status: error.statusCode || 500 }
    );
  }
}
