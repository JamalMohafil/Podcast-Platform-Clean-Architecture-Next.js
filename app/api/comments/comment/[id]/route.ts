import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { commentsController } from "@/src/interfaces/controllers/comment/commentsController";
import { requireAuth } from "@/src/interfaces/middlewares/authMiddleware";
import { optionalAuth } from "@/src/interfaces/middlewares/optionalAuthMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const commentId = (await params).id;

    return optionalAuth(async (authReq: AuthenticatedRequest) => {
      try {
        const controller = await commentsController.getComment(
          authReq.user || null,
          commentId
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
    })(req as AuthenticatedRequest);
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message, success: false },
      { status: e.statusCode | 500 }
    );
  }
};
export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const body = await req.json();
    return requireAuth(async (authReq: AuthenticatedRequest) => {
      try {
        const controller = await commentsController.updateComment(
          id,
          authReq.user || null,
          { comment: body.comment }
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
    })(req as AuthenticatedRequest);
  } catch (e: any) {
    return NextResponse.json({ message: e.message, success: false });
  }
};
export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    return requireAuth(async (authReq: AuthenticatedRequest) => {
      try {
        const controller = await commentsController.deleteComment(
          id,
          authReq.user || null
        );
        console.log(controller);
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
    })(req as AuthenticatedRequest);
  } catch (e: any) {
    return NextResponse.json({ message: e.message, success: false });
  }
};
