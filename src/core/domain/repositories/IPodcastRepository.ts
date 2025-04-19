import { Podcast } from "../entities/Podcast";

export interface IPodcastRepository {
  getPodcasts(
    limit: number,
    page: number,
    search?: string,
    categoryId?: string
  ): Promise<{
    podcasts: Podcast[];
    pagination: {
      total: number;
      hasPrevious: boolean;
      hasMore: boolean;
      currentPage: number;
      limit: number;
      pages: number;
    };
  } | null>;
  delete(id: string): Promise<boolean>;
  create(podcast: Partial<Podcast>): Promise<Podcast | null>;
  update(podcast: Partial<Podcast>, podcastId: string): Promise<Podcast | null>;
  getPodcast(id: string): Promise<Podcast | null>;
  updateViewsCount(id: string): Promise<number | null>;
  getMostViewed(
    limit: number,
    page: number,
    search?: string,
    categoryId?: string
  ): Promise<{
    podcasts: Podcast[];
    pagination: {
      total: number;
      hasPrevious: boolean;
      hasMore: boolean;
      currentPage: number;
      limit: number;
      pages: number;
    };
  } | null>;
}
