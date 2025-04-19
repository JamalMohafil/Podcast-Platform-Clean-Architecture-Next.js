import { InputParseError } from "@/src/core/domain/errors/commonErrors";
import { UserPayload } from "@/src/core/domain/services/jwtServiceInterface";
import { registerUserUseCase } from "@/src/core/useCases/auth/RegisterUserUseCase";
import { z } from "zod";
import {
  registerInputSchema,
  RegisterInputType,
} from "../../validators/auth/registerValidator";
import { User } from "@/src/core/domain/entities/User";

export const registerController = async (
  input: RegisterInputType
): Promise<{ user: User; token: string }> => {
  const parsed = registerInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new InputParseError("Invalid data", parsed.error.issues[0].message);
  }

  const user = await registerUserUseCase({
    name: input.name,
    email: input.email,
    password: input.password,
  });

  return { user: user.user, token: user.token };
};
