import { UserPayload } from "@/src/core/domain/services/jwtServiceInterface";
import {
  loginInputSchema,
  LoginInputType,
} from "../../validators/auth/loginValidator";
import { loginUserUseCase } from "@/src/core/useCases/auth/LoginUserUseCase";
import { InputParseError } from "@/src/core/domain/errors/commonErrors";
import { User } from "@/src/core/domain/entities/User";

export const loginController = async (
  input: LoginInputType
): Promise<{ user: User; token: string }> => {
  const parsed = loginInputSchema.safeParse(input);

  if (!parsed.success) {
    throw new InputParseError("Invalid data", parsed.error.issues[0].message);
  }
  const user = await loginUserUseCase({
    email: input.email,
    password: input.password,
  });

  return { user: user.user, token: user.token };
};
