import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { LikeController } from "@/src/interfaces/controllers/like/likeController";
import { requireAuth } from "@/src/interfaces/middlewares/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) => {
  try {
    const { commentId } = await params;
    return requireAuth(async (req: AuthenticatedRequest) => {
      try {
        const controller = await LikeController.toggleLike(
          req.user!!,
          commentId
        );

        return NextResponse.json({
          success: true,
          message: "Liked Successfully",
          data: controller,
        });
      } catch (e: any) {
        return NextResponse.json(
          { message: e.message, success: false },
          { status: e.statusCode || 500 }
        );
      }
    })(req as AuthenticatedRequest);
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message, success: false },
      { status: e.statusCode || 500 }
    );
  }
};
