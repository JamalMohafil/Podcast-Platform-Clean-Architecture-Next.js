 
import * as jwt from "jsonwebtoken";
import crypto from "crypto";
import { JWTOptions, JWTVerifyResult, UserPayload } from "@/src/core/domain/services/jwtServiceInterface";



export function signJWT(payload: UserPayload, options?: JWTOptions): string {
  const secret = process.env.JWT_SECRET!! as string;
  const expiresIn =
    (options && options.expiresIn) || process.env.JWT_EXPIRES_IN || "30d";

  return jwt.sign(payload, secret, {
    expiresIn: expiresIn as any,
    algorithm: "HS256", // أسرع من الخيارات الأخرى
  });
}

export function verifyJWT(token: string): JWTVerifyResult {
  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as UserPayload;
    return { valid: true, expired: false, decoded };
  } catch (error) {
    const err = error as Error;
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
}

export function decodeJWT(token: string): UserPayload | null {
  try {
    const secret = process.env.JWT_SECRET as string;
    return jwt.decode(token) as UserPayload;
  } catch (error) {
    return null;
  }
}

export function generateRandomToken(): string {
  return crypto.randomBytes(32).toString("hex"); // توليد 32 بايت وتحويله إلى نص عشري
}
