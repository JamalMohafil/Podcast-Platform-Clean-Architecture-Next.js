import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { CreateCityDto } from "@/src/core/dtos/city/createCityDto";
import { CreateUserDto } from "@/src/core/dtos/user/CreateUserDto";
import { createCityController } from "@/src/interfaces/controllers/city/createCityController";
import { createUserController } from "@/src/interfaces/controllers/user/createUserController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { requireAuth } from "@/src/interfaces/middlewares/authMiddleware";
import { NextResponse } from "next/server";

export const POST = requireAdminAuth(
  async (req: AuthenticatedRequest) => {
    try {
      const body = (await req.json()) as CreateCityDto;

      const city = await createCityController(body);

      return NextResponse.json({
        success: true,
        data: city,
        message: "User created successfully",
      });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.statusCode | 500 }
      );
    }
  }
);
