import { Role } from "@/src/core/domain/enums/Role";
import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { UpdateUserDto } from "@/src/core/dtos/user/UpdateUserDto";
import { deleteUserController } from "@/src/interfaces/controllers/user/deleteUserController";
import { getUserController } from "@/src/interfaces/controllers/user/getUserController";
import { updateUserController } from "@/src/interfaces/controllers/user/updateUserController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { requireAuth } from "@/src/interfaces/middlewares/authMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const id = (await params).id;

    const controller = await getUserController(id);
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
      const controller = await deleteUserController(id);
      return NextResponse.json({ success: true, data: controller });
    } catch (e: any) {
      return NextResponse.json(
        { message: e.message, success: false },
        { status: e.statusCode || 500 }
      );
    }
  })(req as AuthenticatedRequest);
};
export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  // تعطيل middleware مؤقتاً للتحقق من أن params تعمل
  const id = (await params).id;
  const body = await req.formData();
  // We should get name , image, bio , password , email , role, city_id, date_of_birth
  const name = body.get("name") as string;
  const image = body.get("image") as File;
  const bio = body.get("bio") as string;
  const password = body.get("password") as string;
  const email = body.get("email") as string;
  const role = body.get("role") as string as Role;
  const city_id = body.get("city_id") as string;
  const date_of_birth = body.get("date_of_birth") as unknown as Date;
  const result = {
    ...(name && { name }),
    ...(email && { email }),
    ...(password && { password }),
    ...(role && { role: role as Role }),
    ...(city_id && { city_id }),
    ...(date_of_birth && { date_of_birth: date_of_birth as Date }),
    ...(bio && { bio }),
    ...(image && { image: image as File }),
  };
  // استدعاء middleware بشكل منفصل
  return requireAuth(async (authReq: AuthenticatedRequest) => {
    try {
      // استخدام الـ id الذي تم استخراجه سابقاً
      const controller = await updateUserController(
        id,
        result,
        authReq?.user!!
      );
      return NextResponse.json({ success: true, data: controller });
    } catch (e: any) {
      return NextResponse.json(
        { message: e.message, success: false },
        { status: e.statusCode || 500 }
      );
    }
  })(req as AuthenticatedRequest);
};
