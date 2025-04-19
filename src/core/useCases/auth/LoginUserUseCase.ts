import { hashPassword } from "@/src/infrastructure/services/passwordService";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import {
  AlreadyExistsError,
  InvalidCredentialsError,
  NotFoundUser,
} from "../../domain/errors/AuthErrors";
import { User } from "../../domain/entities/User";
import { BaseError } from "../../domain/errors/commonErrors";
import { userRepository } from "@/src/infrastructure/repositories/userRepository";
import { authRepository } from "@/src/infrastructure/repositories/authRepository";
import { LoginUserInput } from "../../dtos/auth/loginUserInput";

export const loginUserUseCase = async ({
  email,
  password,
}: LoginUserInput): Promise<{ token: string; user: User }> => {
  try {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundUser();
    }
    const checkPassword = await user.verifyPassword(password);
    if (!checkPassword) {
      throw new InvalidCredentialsError();
    }

    const token = await authRepository.generateAuthToken(user!!.toPayload());

    return { user: user!!, token };
  } catch (e: any) {
    console.log(e);
    throw new BaseError(e.name, e.message, 400);
  }
};
