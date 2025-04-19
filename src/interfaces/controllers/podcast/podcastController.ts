import {
  UnauthenticatedError,
  UnauthorizedError,
} from "@/src/core/domain/errors/AuthErrors";
import {
  BaseError,
  InputParseError,
  NotFoundError,
} from "@/src/core/domain/errors/commonErrors";
import {
  AuthenticatedRequest,
  UserPayload,
} from "@/src/core/domain/services/jwtServiceInterface";
import { podcastUseCases } from "@/src/core/useCases/podcast/podcastUseCases";
import { NextResponse } from "next/server";
import {
  createPodcastSchema,
  CreatePodcastInputType,
} from "@/src/interfaces/validators/podcast/createPodcastValidator";
import {
  updatePodcastSchema,
  UpdatePodcastInputType,
} from "@/src/interfaces/validators/podcast/updatePodcastValidator";
import { podcastMapper } from "@/src/infrastructure/mappers/podcastMapper";
import { uploadImage } from "@/src/infrastructure/services/fileUploader";
import { Podcast } from "@/src/core/domain/entities/Podcast";

// Podcast Controllers
export const podcastController = {
  // Create a podcast
  createPodcast: async (data: any) => {
    const validation = createPodcastSchema.safeParse(data);
    let cover_image;
    if (validation.success && validation.data.cover_image) {
      cover_image = await uploadImage(validation.data.cover_image);
    }
    if (!validation.success) {
      throw new InputParseError(
        "Invalid data",
        validation.error.issues[0].message
      );
    }

    const podcastData = validation.data;
    const result: Partial<Podcast> = {
      title: podcastData.title!!,
      ...(podcastData.description && { description: podcastData.description }),
      ...(cover_image && { cover_image }),
      ...(podcastData.video_url && { video_url: podcastData.video_url }),
      ...(podcastData.isFeatured && { is_featured: podcastData.isFeatured }),
      ...(podcastData.category_id && { category_id: podcastData.category_id }),

      ...(podcastData.audio_url && { audio_url: podcastData.audio_url }),
      ...(podcastData.guestName && { guest_name: podcastData.guestName }),
    };

    const createdPodcast = await podcastUseCases.createPodcast(result);

    return createdPodcast;
  },

  // Get all podcasts with pagination, search and category filter
  getAllPodcasts: async (
    limit: number,
    page: number,
    search: string,
    categoryId: string
  ) => {
    const options = {
      limit: limit === 0 ? undefined : limit,
      page: page === 0 ? undefined : page,
      search: search,
      categoryId: categoryId,
    };

    const podcasts = await podcastUseCases.getAllPodcasts(options);
    return podcasts;
  },

  // Get a podcast by ID
  getPodcast: async (podcastId: string) => {
    const podcast = await podcastUseCases.getPodcastById(podcastId);

    if (!podcast) {
      throw new NotFoundError("Podcast not found");
    }

    return podcast;
  },
  updatePodcastViewesCount: async (podcastId: string) => {
    const updatedPodcast = await podcastUseCases.updateViewsCount(podcastId);
    return updatedPodcast;
  },
  // Update a podcast
  updatePodcast: async (
    podcastId: string,

    data: UpdatePodcastInputType
  ) => {
    const validation = updatePodcastSchema.safeParse(data);

    if (!validation.success) {
      throw new InputParseError(
        "Invalid data",
        validation.error.issues[0].message
      );
    }
    let cover_image;
    if (validation.success && validation.data.cover_image) {
      cover_image = await uploadImage(validation.data.cover_image);
    }

    const podcastData = validation.data;
    const result: Partial<Podcast> = {
      title: podcastData.title!!,
      ...(podcastData.description && { description: podcastData.description }),
      ...(cover_image && { cover_image }),
      ...(podcastData.video_url && { video_url: podcastData.video_url }),
      ...(podcastData.isFeatured && { is_featured: podcastData.isFeatured }),
      ...(podcastData.category_id && { category_id: podcastData.category_id }),

      ...(podcastData.audio_url && { audio_url: podcastData.audio_url }),
      ...(podcastData.guestName && { guest_name: podcastData.guestName }),
    };
    const updatedPodcast = await podcastUseCases.updatePodcast(
      podcastId,
      result
    );

    return updatedPodcast;
  },

  // Delete a podcast
  deletePodcast: async (podcastId: string,) => {
    const deleted = await podcastUseCases.deletePodcast(podcastId);

    if (!deleted) {
      throw new BaseError("Error", "Failed to delete podcast");
    }

    return true;
  },

  // Get most viewed podcasts
  getMostViewedPodcasts: async (
    limit: number,
    page: number = 1,
    search: string = "",
    categoryId: string = ""
  ) => {
    const podcasts = await podcastUseCases.getMostViewedPodcasts(
      limit,
      page,
      search,
      categoryId
    );
    return podcasts;
  },
};
