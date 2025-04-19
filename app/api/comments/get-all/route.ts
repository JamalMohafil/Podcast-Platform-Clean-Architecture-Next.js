import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { commentsController } from "@/src/interfaces/controllers/comment/commentsController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { NextResponse } from "next/server";

export const GET = requireAdminAuth(async (req: AuthenticatedRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit"));
    const page = Number(searchParams.get("page"));
    const search = (searchParams.get("search") as string) || "";
    const controller = await commentsController.getAllComments(
      limit && limit,
      page && page ,
      search
    );
    return NextResponse.json({ success: true, data: controller });
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message, success: false },
      { status: e.statusCode || 500 }
    );
  }
});
