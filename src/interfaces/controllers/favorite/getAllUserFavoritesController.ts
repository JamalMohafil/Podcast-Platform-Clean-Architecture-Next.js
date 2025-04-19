import { UnauthorizedError } from "@/src/core/domain/errors/AuthErrors";
import { UserPayload } from "@/src/core/domain/services/jwtServiceInterface";
import { getAllUserFavoritesUseCase } from "@/src/core/useCases/favorite/getAllUserFavoritesUseCase";

export const getAllUserFavoritesController = async (
  userId: string,
  user: UserPayload
) => {
  if (user.id !== userId && user.role !== "ADMIN")
    throw new UnauthorizedError();
  const favorites = await getAllUserFavoritesUseCase(userId);
  return favorites;
};
