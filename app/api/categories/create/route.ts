import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { createCategoryController } from "@/src/interfaces/controllers/category/createCategoryController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { NextResponse } from "next/server";

export const POST = requireAdminAuth(
  async (authReq: AuthenticatedRequest) => {
    try {
      // Get Form Data
      const formData = await authReq.formData();

      const name = formData.get("name") as string;
      const imageFile = formData.get("image") as File;

      const controller = await createCategoryController({
        name,
        image: imageFile,
      });

      return NextResponse.json({ success: true, data: controller });
    } catch (e: any) {
      return NextResponse.json(
        { message: e.message, success: false },
        { status: e.statusCode || 500 }
      );
    }
  }
);
