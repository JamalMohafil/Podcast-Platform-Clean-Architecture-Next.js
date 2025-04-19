import { authRepository } from "@/src/infrastructure/repositories/authRepository";
import { EmailService } from "@/src/infrastructure/services/nodemailerService";

export const requestResetPasswordUseCase = async (email: string) => {
  const token = await authRepository.requestResetPassword(email);
  if (token) {
    await EmailService.sendEmail({
      to: email,
      subject: "Reset Password",
      body: `Please click on the following link to reset your password: ${process.env.FRONT_END_URL}/reset-password/${token}`,
    });
    return token;
  }
  return null;
};
