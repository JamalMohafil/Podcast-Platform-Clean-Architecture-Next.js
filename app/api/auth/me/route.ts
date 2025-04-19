import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { getMeController } from "@/src/interfaces/controllers/user/getMeController";
import { requireAuth } from "@/src/interfaces/middlewares/authMiddleware";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
export const GET = requireAuth(
  async (req: AuthenticatedRequest) => {
    try {
       if (!req?.user)
        return NextResponse.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );
      const userInformation = await getMeController(req.user.id);

      return NextResponse.json({
        success: true,
        user: userInformation,
        message: "User found successfully",
      });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.statusCode | 500 }
      );
    }
  }
);
