import { z } from "zod";

export const createUserInputSchema = z.object({
  email: z.string(),
  name: z.string(),
  role: z.enum(["ADMIN", "USER"]),
  password: z.string(),
  city_id: z.string().optional(),
  date_of_birth: z.date().optional(),
  image: z.instanceof(File).optional(), // Image URL is optional and must be a valid URL
  bio: z.string().optional(),
});
export type CreateUserInputType = z.infer<typeof createUserInputSchema>;
