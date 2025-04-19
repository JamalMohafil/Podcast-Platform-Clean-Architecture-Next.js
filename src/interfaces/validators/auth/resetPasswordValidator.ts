import { z } from "zod";

export const resetPasswordInputSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  token: z.string(),
});
export type ResetPasswordInputType = z.infer<typeof resetPasswordInputSchema>;
