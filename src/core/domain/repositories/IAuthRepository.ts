import { NextApiResponse } from "next";
import { User } from "../entities/User";
import { AuthenticatedRequest, JWTVerifyResult, UserPayload } from "../services/jwtServiceInterface";
 
export interface IAuthRepository {
  // Authentication
  validate: (email: string, password: string) => Promise<User | null>;

  // Password Management
  requestResetPassword: (email: string) => Promise<string | null>;
  resetPassword: (
    token: string,
    newPassword: string
  ) => Promise<boolean | null>;
  // Token
  verifyAuthToken: (token: string) => JWTVerifyResult | null;
  generateAuthToken: (payload: UserPayload) => Promise<string>;
}
