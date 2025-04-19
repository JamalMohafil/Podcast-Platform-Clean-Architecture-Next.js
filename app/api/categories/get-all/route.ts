import { getCategoriesController } from "@/src/interfaces/controllers/category/getCategoriesController";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit")) || 5;
    const page = Number(searchParams.get("page")) || 1;
    const search = (searchParams.get("search") as string) || "";
    const categories = await getCategoriesController(limit, page, search);

    return NextResponse.json(
      {
        success: true,
        data: categories,
        message: "Categories fetched successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.statusCode | 500 }
    );
  }
};
