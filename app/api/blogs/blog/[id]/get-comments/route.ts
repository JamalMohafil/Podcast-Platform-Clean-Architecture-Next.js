import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { getBlogController } from "@/src/interfaces/controllers/blog/getBlogController";
import { commentsController } from "@/src/interfaces/controllers/comment/commentsController";
import { optionalAuth } from "@/src/interfaces/middlewares/optionalAuthMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const searchParams = req.nextUrl.searchParams;

    const limit = Number(searchParams.get("limit")) || 5;
    const page = Number(searchParams.get("page")) || 1;
    const search = (searchParams.get("search") as string) || "";
    return optionalAuth(async (req: AuthenticatedRequest) => {
      try {
        const controller = await commentsController.getCommentsByBlogId(
          id,
          limit,
          page,
          search,
          req?.user || null
        );
        return NextResponse.json(
          {
            message: "Comments Fetched Successfully",
            success: true,
            data: controller,
          },
          { status: 200 }
        );
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
