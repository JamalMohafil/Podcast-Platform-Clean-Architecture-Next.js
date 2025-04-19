import { NotFoundUser } from "@/src/core/domain/errors/AuthErrors";
import { BaseError } from "@/src/core/domain/errors/commonErrors";
import { requestResetPasswordUseCase } from "@/src/core/useCases/auth/RequestResetPasswordUseCase";
import { userRepository } from "@/src/infrastructure/repositories/userRepository";

export const requestResetPasswordController = async (email: string) => {
    const user = await userRepository.findByEmail(email);
    if(!user) throw new NotFoundUser();
  const token = await requestResetPasswordUseCase(email);
  if (!token) {
    throw new BaseError("Error", "Something went wrong", 400);
  }
  return token;
};
