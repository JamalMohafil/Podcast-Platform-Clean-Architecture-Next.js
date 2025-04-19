import { z } from "zod";

// Schema for validating blog creation
export const createBlogInputSchema = z.object({
  title: z.string().min(1, "Title is required"), // Ensure title is a non-empty string
  content: z.string().optional(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"), // Ensure slug is valid
  image: z.instanceof(File).optional(), // Image URL is optional and must be a valid URL
  category_id: z.string().optional(), // Category ID should be a valid string
  user_id: z.string().min(1, "User ID is required"), // User ID should be a valid string
  isFeatured: z.boolean().optional(), // isFeatured is optional
});

// Type derived from schema
export type CreateBlogInputType = z.infer<typeof createBlogInputSchema>;
