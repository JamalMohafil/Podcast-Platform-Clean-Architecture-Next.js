import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { deleteCategoryController } from "@/src/interfaces/controllers/category/deleteCategoryController";
import { getCategoryController } from "@/src/interfaces/controllers/category/getCategoryController";
import { updateCategoryController } from "@/src/interfaces/controllers/category/updateCategoryController";
import { getCityController } from "@/src/interfaces/controllers/city/getCityController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { NextRequest, NextResponse } from "next/server";

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
      const controller = await deleteCategoryController(id);
      return NextResponse.json({ success: true, data: controller });
    } catch (e: any) {
      return NextResponse.json(
        { message: e.message, success: false },
        { status: e.statusCode || 500 }
      );
    }
  })(req as AuthenticatedRequest );
};
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const id = (await params).id;

    const controller = await getCategoryController(id);

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
};
export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // تعطيل middleware مؤقتاً للتحقق من أن params تعمل
  const id = (await params).id;
  const body = await req.formData();
  const image = body.get("image") as File;
  const name = body.get("name") as string;
  // استدعاء middleware بشكل منفصل
  return requireAdminAuth(async (authReq: AuthenticatedRequest) => {
    try {
      // استخدام الـ id الذي تم استخراجه سابقاً
      const controller = await updateCategoryController(id, { image, name });
      return NextResponse.json({ success: true, data: controller });
    } catch (e: any) {
      return NextResponse.json(
        { message: e.message, success: false },
        { status: e.statusCode || 500 }
      );
    }
  })(req as AuthenticatedRequest );
};
