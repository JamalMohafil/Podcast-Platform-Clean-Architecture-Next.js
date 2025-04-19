import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { CreateCityDto } from "@/src/core/dtos/city/createCityDto";
import { CreateUserDto } from "@/src/core/dtos/user/CreateUserDto";
import { createCityController } from "@/src/interfaces/controllers/city/createCityController";
import { commentsController } from "@/src/interfaces/controllers/comment/commentsController";
import { createUserController } from "@/src/interfaces/controllers/user/createUserController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { requireAuth } from "@/src/interfaces/middlewares/authMiddleware";
import { optionalAuth } from "@/src/interfaces/middlewares/optionalAuthMiddleware";
import { NextResponse } from "next/server";

export const POST = optionalAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json();
    const { comment, blogId } = body;
    const commentTe = await commentsController.createComment(
      req?.user || null,
      {
        comment,
        blogId,
      }
    );
    console.log(commentTe);
    return NextResponse.json({
      success: true,
      data: commentTe,
      message: "Comment created successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.statusCode | 500 }
    );
  }
});
