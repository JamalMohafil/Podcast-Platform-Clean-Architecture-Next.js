import { Role } from "@/src/core/domain/enums/Role";
import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { podcastController } from "@/src/interfaces/controllers/podcast/podcastController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { UpdatePodcastInputType } from "@/src/interfaces/validators/podcast/updatePodcastValidator";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    const controller = await podcastController.getPodcast(id);

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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // تعطيل middleware مؤقتاً للتحقق من أن params تعمل
  const id = (await params).id;

  // استدعاء middleware بشكل منفصل
  return requireAdminAuth(async (authReq: AuthenticatedRequest) => {
    try {
      // استخدام الـ id الذي تم استخراجه سابقاً
      const controller = await podcastController.deletePodcast(id);
      return NextResponse.json({ success: true, data: controller });
    } catch (e: any) {
      return NextResponse.json(
        { message: e.message, success: false },
        { status: e.statusCode || 500 }
      );
    }
  })(req as AuthenticatedRequest);
};
export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const id = (await params).id;
  const body = await req.formData();

  // قراءة الحقول الصحيحة حسب سكيمّا التحديث
  const title = body.get("title") as string;
  const description = body.get("description") as string;
  const cover_image = body.get("cover_image") as File | null;
  const audio_url = body.get("audio_url") as string;
  const video_url = body.get("video_url") as string;
  const isFeatured = body.get("isFeatured") === "true";
  const category_id = body.get("category_id") as string;
  const guestName = body.get("guestName") as string;

  const result: UpdatePodcastInputType = {
    ...(title && { title }),
    ...(description && { description }),
    ...(cover_image && { cover_image }),
    ...(audio_url && { audio_url }),
    ...(video_url && { video_url }),
    ...(typeof isFeatured === "boolean" && { isFeatured }),
    ...(category_id && { category_id }),
    ...(guestName && { guestName }),
  };

  return requireAdminAuth(async (authReq: AuthenticatedRequest) => {
    try {
      const controller = await podcastController.updatePodcast(id, result);
      return NextResponse.json({ success: true, data: controller });
    } catch (e: any) {
      return NextResponse.json(
        { message: e.message, success: false },
        { status: e.statusCode || 500 }
      );
    }
  })(req as AuthenticatedRequest);
};
