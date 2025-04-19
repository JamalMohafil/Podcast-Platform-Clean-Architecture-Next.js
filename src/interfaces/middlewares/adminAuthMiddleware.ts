import {
  AuthenticatedRequest,
  JWTVerifyResult,
} from "@/src/core/domain/services/jwtServiceInterface";
import { authRepository } from "@/src/infrastructure/repositories/authRepository";
import { userRepository } from "@/src/infrastructure/repositories/userRepository";
import { NextRequest, NextResponse } from "next/server";

// This middleware function conforms to Next.js App Router requirements
export function requireAdminAuth(
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
) {
  return async function (request: NextRequest) {
    try {
      const authHeader = request.headers.get("Authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
          { success: false, message: "User Not Authenticated" },
          { status: 401 }
        );
      }

      const token = authHeader.split(" ")[1];
      const { valid, expired, decoded } = authRepository.verifyAuthToken(
        token
      ) as JWTVerifyResult;

      if (!valid || !decoded) {
        return NextResponse.json(
          {
            success: false,
            message: expired ? "Token Expired" : "Invalid Token",
          },
          { status: 401 }
        );
      }

      const user = await userRepository.findByEmail(decoded.email);
      if (!user || user.role !== "ADMIN") {
        return NextResponse.json(
          { success: false, message: "Access Denied: Not Admin" },
          { status: 403 }
        );
      }

      // Create authenticated request
      const authenticatedReq = request as AuthenticatedRequest;
      authenticatedReq.user = decoded;

      // Call the original handler with the authenticated request
      return await handler(authenticatedReq);
    } catch (e: any) {
      console.log("Error in adminAuthMiddleware:", e);
      return NextResponse.json(
        { success: false, message: "Authentication Error" },
        { status: 500 }
      );
    }
  };
}
