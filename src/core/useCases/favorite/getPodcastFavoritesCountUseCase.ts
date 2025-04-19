import { favoriteRepository } from "@/src/infrastructure/repositories/favoriteRepository";

export const getPodcastFavoritesCountUseCase = async (podcastId: string) => {
  const count = await favoriteRepository.getPodcastFavoritesCount(podcastId);
  return count;
};
