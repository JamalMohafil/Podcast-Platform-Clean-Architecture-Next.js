import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { removeFromFavoriteController } from "@/src/interfaces/controllers/favorite/removeFromFavoriteController";
import { requireAuth } from "@/src/interfaces/middlewares/authMiddleware";
import { NextResponse } from "next/server";

export const DELETE = requireAuth(async (req: AuthenticatedRequest) => {
  try {
    const { podcastId } = await req.json();
    const controller = await removeFromFavoriteController(
      req.user?.id!!,
      podcastId
    );

    return NextResponse.json(
      { success: true, data: controller },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message, success: false },
      { status: e.statusCode || 500 }
    );
  }
});
