import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { getUsersController } from "@/src/interfaces/controllers/user/getUsersController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const GET = requireAdminAuth(
  async (req: AuthenticatedRequest,  ) => {
    try {
      const searchParams = req.nextUrl.searchParams;
      const limit = Number(searchParams.get("limit")) || 5;
      const page = Number(searchParams.get("page")) || 1;
      const search = (searchParams.get("search") as string) || "";
      const controller = await getUsersController(limit, page, search);

      return NextResponse.json({ success: true, data: controller });
    } catch (e: any) {
      console.log(e);
      return NextResponse.json(
        { message: e.message, success: false },
        { status: e.statusCode | 500 }
      );
    }
  }
);
