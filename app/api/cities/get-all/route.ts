import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { getCitiesController } from "@/src/interfaces/controllers/city/getCitiesController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { NextResponse } from "next/server";

export const GET = async (req: AuthenticatedRequest) => {
  try {
    const cities = await getCitiesController();

    return NextResponse.json(
      {
        success: true,
        data: cities,
        message: "Cities fetched successfully",
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
