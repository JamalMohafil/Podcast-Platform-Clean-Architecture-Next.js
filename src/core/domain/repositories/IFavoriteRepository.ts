import { Favorite } from "../entities/Favorite";

export interface IFavoriteRepository {
  create: (userId: string, podcastId: string) => Promise<Favorite>;
  delete: (userId: string, podcastId: string) => Promise<boolean>;
  findByUserIdAndPodcastId: (
    userId: string,
    podcastId: string
  ) => Promise<Favorite | null>;
  getUserFavorites: (userId: string) => Promise<Favorite[] | null>;
  getPodcastFavoritesCount: (podcastId: string) => Promise<number | null>;
}
