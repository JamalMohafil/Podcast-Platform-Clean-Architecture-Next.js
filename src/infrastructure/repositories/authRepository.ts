import { IAuthRepository } from "@/src/core/domain/repositories/IAuthRepository";
import prisma from "../database/prisma";
import { userRepository } from "./userRepository";
import {
  generateRandomToken,
  signJWT,
  verifyJWT,
} from "../services/jwtService";
import { hashPassword } from "../services/passwordService";
import { UserPayload } from "@/src/core/domain/services/jwtServiceInterface";

export const authRepository: IAuthRepository = {
  async validate(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) return null;
    
    const checkPassword = await user.verifyPassword(password);
    return checkPassword ? user : null;
  },

  async generateAuthToken(payload: UserPayload) {
    const token = await signJWT(payload);
    return token;
  },

  async requestResetPassword(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) return null;

    const token = generateRandomToken();
    const resetTokenExpiryMinutes = parseInt(
      process.env.RESET_TOKEN_EXPIRY_MINUTES || "10"
    );
    const resetTokenExpiry = new Date(
      Date.now() + resetTokenExpiryMinutes * 60 * 1000
    );

    await userRepository.updateResetToken(user.id, token, resetTokenExpiry);
    return token;
  },

  async resetPassword(token: string, newPassword: string) {
    const user = await userRepository.findByResetToken(token);
    const expiry = user?.isResetTokenValid(token);
    if (!user || !expiry) return null;

    const hashedPassword = await hashPassword(newPassword);
    user.changePassword(hashedPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return true;
  },

  verifyAuthToken(token: string) {
    const JWT = verifyJWT(token);
    return JWT;
  },
};
