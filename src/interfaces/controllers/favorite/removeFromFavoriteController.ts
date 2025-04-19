import { removeFromFavoriteUseCase } from "@/src/core/useCases/favorite/removeFromFavoriteUseCase";

export const removeFromFavoriteController = async (
  userId: string,
  podcastId: string
) => {
  const favorite = await removeFromFavoriteUseCase(podcastId, userId);
  return favorite;
};
