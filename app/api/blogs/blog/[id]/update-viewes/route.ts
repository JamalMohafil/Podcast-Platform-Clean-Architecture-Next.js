import { updateBlogViewesController } from "@/src/interfaces/controllers/blog/updateBlogViewesController";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const id = (await params).id;
    console.log(id,'asdfgbn')
    const controller = await updateBlogViewesController(id);
    return NextResponse.json(
      { success: true, viewes_count: controller },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message, success: false },
      { status: e.statusCode || 500 }
    );
  }
};
