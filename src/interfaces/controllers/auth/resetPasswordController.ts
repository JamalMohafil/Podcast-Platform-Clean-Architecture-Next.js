import { BaseError } from "@/src/core/domain/errors/commonErrors";
import { resetPasswordUseCase } from "@/src/core/useCases/auth/ResetPasswordUseCase";
import {
  resetPasswordInputSchema,
  ResetPasswordInputType,
} from "../../validators/auth/resetPasswordValidator";
import { InvalidPasswordError } from "@/src/core/domain/errors/PasswordErrors";

export const resetPasswordController = async ({
  token,
  newPassword,
}: ResetPasswordInputType) => {
  const parsed = resetPasswordInputSchema.safeParse({ token, newPassword });
  if (!parsed.success) {
    throw new InvalidPasswordError(
      "Invalid Password",
      parsed.error.issues[0].message
    );
  }
  const result = await resetPasswordUseCase(token, newPassword);
  if (!result) {
    throw new BaseError(
      "Error",
      "Reset password link is invalid or expired",
      401
    );
  }
  return result;
};
