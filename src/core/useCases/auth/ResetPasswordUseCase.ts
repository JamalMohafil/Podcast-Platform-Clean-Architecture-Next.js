import { authRepository } from "@/src/infrastructure/repositories/authRepository";

export const resetPasswordUseCase = async (
  token: string,
  newPassword: string
) => {
  const result = await authRepository.resetPassword(token, newPassword);
  return result;
};
