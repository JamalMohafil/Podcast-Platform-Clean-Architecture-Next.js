import { addToFavoriteUseCase } from "@/src/core/useCases/favorite/addToFavoriteUseCase";

export const addToFavoriteController = async (
  userId: string,
  podcastId: string,
) => {
  console.log(userId, podcastId);
  const favorite = await addToFavoriteUseCase(podcastId, userId);
  return favorite;
};
