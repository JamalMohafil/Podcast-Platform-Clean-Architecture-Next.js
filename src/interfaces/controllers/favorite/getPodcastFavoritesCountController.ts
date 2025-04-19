import { getPodcastFavoritesCountUseCase } from "@/src/core/useCases/favorite/getPodcastFavoritesCountUseCase";

export const getPodcastFavoritesCountController = async (podcastId: string) => {
  const count = await getPodcastFavoritesCountUseCase(podcastId);
  return count;
};
