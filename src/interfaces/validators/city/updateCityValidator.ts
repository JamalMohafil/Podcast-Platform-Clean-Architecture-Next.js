import { z } from "zod";

export const updateCityInputSchema = z.object({
  name: z.string(),
});
export type UpdateCityInputType = z.infer<typeof updateCityInputSchema>;
