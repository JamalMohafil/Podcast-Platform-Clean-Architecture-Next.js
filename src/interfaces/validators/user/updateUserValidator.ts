import { z } from "zod";

export const updateUserInputSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  role: z.enum(["ADMIN", "USER"]).optional(),
  city_id: z.string().optional(),
  image: z.instanceof(File).optional(), // Image URL is optional and must be a valid URL
  password: z.string().optional(),

  date_of_birth: z.date().optional(),
  bio: z.string().optional(),
});
export type UpdateUserInputType = z.infer<typeof updateUserInputSchema>;
