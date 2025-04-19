import { z } from "zod";

export const createCityInputSchema = z.object({
  name: z.string(),
});
export type CreateCityInputType = z.infer<typeof createCityInputSchema>;
