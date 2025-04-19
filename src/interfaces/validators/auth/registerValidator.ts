import { z } from "zod";

export const registerInputSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  name: z.string(),
});
export type RegisterInputType = z.infer<typeof registerInputSchema>;