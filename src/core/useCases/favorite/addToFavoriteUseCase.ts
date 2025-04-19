import { favoriteRepository } from "@/src/infrastructure/repositories/favoriteRepository";
import {
  AlreadyExistsError,
  NotFoundUser,
} from "../../domain/errors/AuthErrors";

export const addToFavoriteUseCase = async (
  podcastId: string,
  userId: string
) => {
  const existingFavorite = await favoriteRepository.findByUserIdAndPodcastId(
    userId,
    podcastId
  );
  console.log("Favorite added successfully:", existingFavorite);
  if (existingFavorite) {
    throw new AlreadyExistsError("Favorite already exists");
  }
  const favorite = await favoriteRepository.create(userId, podcastId);
  return favorite;
};
