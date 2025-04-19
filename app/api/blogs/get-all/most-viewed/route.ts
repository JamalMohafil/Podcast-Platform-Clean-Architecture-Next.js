import { getBlogsController } from "@/src/interfaces/controllers/blog/getBlogsController";
import { getMostViewedBlogsController } from "@/src/interfaces/controllers/blog/getMostViewedBlogsController";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = Number(searchParams.get("limit")) || 5;
    const page = Number(searchParams.get("page")) || 1;
    const categoryId = searchParams.get("categoryId") as string;
    const search = (searchParams.get("search") as string) || "";
    const blogs = await getMostViewedBlogsController(limit, page, search, categoryId);

    return NextResponse.json(
      {
        success: true,
        data: blogs,
        message: "Blogs fetched successfully",
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
