import { favoriteRepository } from "@/src/infrastructure/repositories/favoriteRepository";
import { NotFoundError } from "../../domain/errors/commonErrors";
import { userRepository } from "@/src/infrastructure/repositories/userRepository";
import { NotFoundUser } from "../../domain/errors/AuthErrors";

export const removeFromFavoriteUseCase = async (
  podcastId: string,
  userId: string
) => {
  const existingUser = await userRepository.findById(userId);
  if (!existingUser) throw new NotFoundUser();
  const favorite = await favoriteRepository.findByUserIdAndPodcastId(
    userId,
    podcastId
  );
  if (!favorite) throw new NotFoundError("Favorite not found");

  const result = await favoriteRepository.delete(userId, podcastId);
  return result;
};
