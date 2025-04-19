import { NextApiRequest } from "next";
import { Role } from "../enums/Role";
import { NextRequest } from "next/server";

export interface UserPayload {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface JWTVerifyResult {
  valid: boolean;
  expired: boolean;
  decoded: UserPayload | null;
}

export interface JWTOptions {
  expiresIn?: string;
}

export interface AuthenticatedRequest extends NextRequest {
  user?: UserPayload | null;
}
