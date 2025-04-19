import { createBlogController } from "@/src/interfaces/controllers/blog/createBlogController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { NextRequest, NextResponse } from "next/server";

export const POST = requireAdminAuth(async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    // Get title , content , isFeatured , image as file , category_id as string , user_id as string
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const isFeatured = formData.get("isFeatured") === "true";

    const image = formData.get("image") as File;
    const category_id = formData.get("category_id") as string;
    const user_id = formData.get("user_id") as string;
    const slug = formData.get("slug") as string;
    const controller = await createBlogController({
      title,
      ...(content && { content }),
      slug,
      isFeatured: isFeatured === true ? true : false,
      ...(image && { image: image as File }),
      ...(category_id && { category_id }),
      user_id,
    });

    return NextResponse.json(
      { success: true, data: controller },
      { status: 201 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message, success: false },
      { status: e.statusCode || 500 }
    );
  }
});
