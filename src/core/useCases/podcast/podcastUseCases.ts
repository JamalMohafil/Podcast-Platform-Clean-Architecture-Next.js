import { Category } from "@/src/core/domain/entities/Category";
import { Podcast } from "@/src/core/domain/entities/Podcast";
import { NotFoundError } from "@/src/core/domain/errors/commonErrors";
import { IPodcastRepository } from "@/src/core/domain/repositories/IPodcastRepository";
import { podcastRepository } from "@/src/infrastructure/repositories/podcastRepository";

export interface PodcastFilterOptions {
  limit?: number;
  page?: number;
  search?: string;
  categoryId?: string;
}

export const podcastUseCases = {
  // Create a new podcast
  createPodcast: async (
    podcastData: Partial<Podcast>
  ): Promise<Podcast | null> => {
    return await podcastRepository.create(podcastData);
  },

  // Get podcasts with pagination, search, and category filter
  getAllPodcasts: async (options: PodcastFilterOptions) => {
    const limit = options.limit || 10;
    const page = options.page || 1;
    const search = options.search || "";
    const categoryId = options.categoryId || "";

    return await podcastRepository.getPodcasts(limit, page, search, categoryId);
  },

  // Get a podcast by ID
  getPodcastById: async (id: string): Promise<Podcast | null> => {
    const podcast = await podcastRepository.getPodcast(id);
    if (!podcast) {
      throw new NotFoundError("Podcast not found");
    }
    return podcast;
  },

  // Update a podcast
  updatePodcast: async (
    id: string,
    podcastData: Partial<Podcast>
  ): Promise<Podcast | null> => {
    const podcast = await podcastRepository.getPodcast(id);
    if (!podcast) {
      throw new NotFoundError("Podcast not found");
    }

    return await podcastRepository.update(podcastData, id);
  },

  // Delete a podcast
  deletePodcast: async (id: string): Promise<boolean> => {
    const podcast = await podcastRepository.getPodcast(id);
    if (!podcast) {
      throw new NotFoundError("Podcast not found");
    }

    return await podcastRepository.delete(id);
  },

  // Update podcast views count
  updateViewsCount: async (id: string) => {
    const podcast = await podcastRepository.getPodcast(id);
    if (!podcast) {
      throw new NotFoundError("Podcast not found");
    }

    return await podcastRepository.updateViewsCount(id);
  },

  // Get most viewed podcasts
  getMostViewedPodcasts: async (
    limit: number = 10,
    page: number = 1,
    search?: string,
    categoryId?: string
  ) => {
    return await podcastRepository.getMostViewed(
      limit,
      page,
      search,
      categoryId
    );
  },
};
