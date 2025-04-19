// src/interfaces/validators/podcast/updatePodcastValidator.ts
import { z } from "zod";

export const updatePodcastSchema = z.object({
  title: z
    .string()
    .min(1, "Title can't be empty")
    .max(200, "Title is too long")
    .optional(),
  description: z
    .string()
    .min(1, "Description can't be empty")
    .max(5000, "Description is too long")
    .optional(),
  cover_image: z.instanceof(File).optional(), // Image URL is optional and must be a valid URL

  audio_url: z.string().optional(),
  video_url: z.string().optional(),
  isFeatured: z.boolean().optional(),
  category_id: z.string().optional(),
  guestName: z.string().optional(),
});

export type UpdatePodcastInputType = z.infer<typeof updatePodcastSchema>;
