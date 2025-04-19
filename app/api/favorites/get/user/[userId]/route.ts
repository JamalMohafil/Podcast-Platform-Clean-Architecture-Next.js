import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { getAllUserFavoritesController } from "@/src/interfaces/controllers/favorite/getAllUserFavoritesController";
import { requireAuth } from "@/src/interfaces/middlewares/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) => {
  try {
    const userId = (await params).userId;
    if (!userId) throw new Error("User ID is required" as never);
    return requireAuth(async (authReq: AuthenticatedRequest) => {
      try {
        const favorites = await getAllUserFavoritesController(
          userId,
          authReq?.user!!
        );
        return NextResponse.json({ success: true, data: favorites });
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
