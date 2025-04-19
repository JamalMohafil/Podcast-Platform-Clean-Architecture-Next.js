import { getAdminCategoriesController } from "@/src/interfaces/controllers/category/getAdminCategoriesController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const GET = requireAdminAuth(async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit")) || 5;
    const page = Number(searchParams.get("page")) || 1;
    const search = (searchParams.get("search") as string) || "";
    const controller = await getAdminCategoriesController(limit, page, search);
    return NextResponse.json({ success: true, data: controller });
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message, success: false },
      { status: e.statusCode || 500 }
    );
  }
});
