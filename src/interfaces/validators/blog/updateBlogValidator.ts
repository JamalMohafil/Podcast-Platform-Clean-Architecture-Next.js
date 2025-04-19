import { z } from "zod";

// Schema for validating blog creation
export const updateBlogInputSchema = z.object({
  title: z.string().optional(), // Ensure title is a non-empty string
  content: z.string().optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format")
    .optional(), // Ensure slug is valid
  image: z.instanceof(File).optional(), // Image URL is optional and must be a valid URL
  category_id: z.string().optional(), // Category ID should be a valid string
  user_id: z.string().optional(), // User ID should be a valid string
  isFeatured: z.boolean().optional(), // isFeatured is optional
});

// Type derived from schema
export type UpdateBlogInputType = z.infer<typeof updateBlogInputSchema>;
