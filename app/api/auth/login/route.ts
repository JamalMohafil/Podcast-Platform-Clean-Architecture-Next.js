import { LoginUserInput } from "@/src/core/dtos/auth/loginUserInput";
import { loginController } from "@/src/interfaces/controllers/auth/loginController";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LoginUserInput;
    const { email, password } = body;

    const controller = await loginController({ email, password });

    const result = { user: controller.user, token: controller.token };
    return NextResponse.json(
      { success: true, data: result, message: "User logged in successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.statusCode | 500 }
    );
  }
}
