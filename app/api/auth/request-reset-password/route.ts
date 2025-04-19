import { requestResetPasswordController } from "@/src/interfaces/controllers/auth/requestResetPasswordController";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email } = body;
    const controller = await requestResetPasswordController(email);

    return NextResponse.json({ success: true, data: controller });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      { message: e.message, success: false },
      { status: e.statusCode ? e.statusCode : 500 }
    );
  }
};
