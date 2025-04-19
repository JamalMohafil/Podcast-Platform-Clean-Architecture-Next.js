import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { deleteBlogController } from "@/src/interfaces/controllers/blog/deleteBlogController";
import { getBlogController } from "@/src/interfaces/controllers/blog/getBlogController";
import { updateBlogController } from "@/src/interfaces/controllers/blog/updateBlogController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const id = (await params).id;

    const controller = await getBlogController(id);
    return NextResponse.json(
      { success: true, data: controller },
      { status: 200 }
    );
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
  // تعطيل middleware مؤقتاً للتحقق من أن params تعمل
  const id = (await params).id;
  const formData = await req.formData();

  // Get title , content , isFeatured , image as file , category_id as string , user_id as string
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const isFeatured = formData.get("isFeatured") === "true";

  const image = formData.get("image") as File;
  const category_id = formData.get("category_id") as string;
  const user_id = formData.get("user_id") as string;
  const slug = formData.get("slug") as string;

  // استدعاء middleware بشكل منفصل
  return requireAdminAuth(async (authReq: AuthenticatedRequest) => {
    try {
      // استخدام الـ id الذي تم استخراجه سابقاً
      const controller = await updateBlogController(id, {
        ...(title && { title }),
        ...(content && { content }),
        ...(slug && { slug }),
        isFeatured: isFeatured === true ? true : false,
        ...(image && { image: image as File }),
        ...(category_id && { category_id }),
        ...(user_id && { user_id }),
      });
      return NextResponse.json({ success: true, data: controller });
    } catch (e: any) {
      return NextResponse.json(
        { message: e.message, success: false },
        { status: e.statusCode || 500 }
      );
    }
  })(req as AuthenticatedRequest);
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
      const controller = await deleteBlogController(id);
      return NextResponse.json({ success: true, data: controller });
    } catch (e: any) {
      return NextResponse.json(
        { message: e.message, success: false },
        { status: e.statusCode || 500 }
      );
    }
  })(req as AuthenticatedRequest);
};
