import { resetPasswordController } from "@/src/interfaces/controllers/auth/resetPasswordController";
import { ResetPasswordInputType } from "@/src/interfaces/validators/auth/resetPasswordValidator";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { token, newPassword } = body as ResetPasswordInputType;
    const controller = await resetPasswordController({ token, newPassword });

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message, success: false },
      { status: e.statusCode ? e.statusCode : 500 }
    );
  }
};
