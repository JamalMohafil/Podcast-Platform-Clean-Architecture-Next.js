import {
  AuthenticatedRequest,
  JWTVerifyResult,
} from "@/src/core/domain/services/jwtServiceInterface";
import { authRepository } from "@/src/infrastructure/repositories/authRepository";
import { NextRequest, NextResponse } from "next/server";

// Optional authentication middleware - doesn't reject unauthorized requests
export const optionalAuth = (
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
) => {
  return async (request: NextRequest) => {
    try {
      const authHeader = request.headers.get("Authorization");
      let authenticatedReq = request as AuthenticatedRequest;

      // Default - no user
      authenticatedReq.user = null;

      // If auth header exists, try to verify
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        const { valid, expired, decoded } = authRepository.verifyAuthToken(
          token
        ) as JWTVerifyResult;

        // If token is valid, set the user
        if (valid && decoded && !expired) {
          authenticatedReq.user = decoded;
        }
      }

      // Call handler with either authenticated user or null user
      return await handler(authenticatedReq);
    } catch (e: any) {
      // Even on error, proceed with null user
      const authenticatedReq = request as AuthenticatedRequest;
      authenticatedReq.user = null;
      return await handler(authenticatedReq);
    }
  };
};
