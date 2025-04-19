import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { UpdateUserDto } from "@/src/core/dtos/user/UpdateUserDto";
import { deleteCityController } from "@/src/interfaces/controllers/city/deleteCityController";
import { getCityController } from "@/src/interfaces/controllers/city/getCityController";
import { updateCityController } from "@/src/interfaces/controllers/city/updateCityController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { requireAuth } from "@/src/interfaces/middlewares/authMiddleware";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const id = (await params).id;

    return requireAdminAuth(async (authReq: AuthenticatedRequest) => {
      try {
        const controller = await getCityController(id);

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
      { status: e.statusCode || 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const id = (await params).id;
    const body = (await req.json()) as UpdateUserDto;
    const { name } = body;
    return requireAuth(async (authReq: AuthenticatedRequest) => {
      try {
        const controller = await updateCityController(
          id,
          { name: name!! },
          authReq.user!!
        );

        return NextResponse.json({ success: true, data: controller });
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
      const controller = await deleteCityController(id);
      return NextResponse.json({ success: true, data: controller });
    } catch (e: any) {
      return NextResponse.json(
        { message: e.message, success: false },
        { status: e.statusCode || 500 }
      );
    }
  })(req as AuthenticatedRequest);
};
