import { favoriteRepository } from "@/src/infrastructure/repositories/favoriteRepository";

export const getAllUserFavoritesUseCase = async (userId: string) => {
  const favorites = await favoriteRepository.getUserFavorites(userId);
  
  return favorites;
};
