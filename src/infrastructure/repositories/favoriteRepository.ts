import { IFavoriteRepository } from "../../core/domain/repositories/IFavoriteRepository";
import { Favorite } from "../../core/domain/entities/Favorite";
import prisma from "../database/prisma";

export const favoriteRepository: IFavoriteRepository = {
  create: async (userId: string, podcastId: string) => {
    try {
      const favorite = await prisma.favorite.create({
        data: {
          user_id: userId,
          podcast_id: podcastId,
        },
      });
      return favorite;
    } catch (error) {
      console.error("Error creating favorite:", error);
      throw error;
    }
  },

  delete: async (userId: string, podcastId: string): Promise<boolean> => {
    try {
      await prisma.favorite.deleteMany({
        where: {
          user_id: userId,
          podcast_id: podcastId,
        },
      });
      return true;
    } catch (error) {
      console.error("Error deleting favorite:", error);
      return false;
    }
  },

  findByUserIdAndPodcastId: async (
    userId: string,
    podcastId: string
  ): Promise<Favorite | null> => {
    try {
      const favorite = await prisma.favorite.findFirst({
        where: {
          user_id: userId,
          podcast_id: podcastId,
        },
      });
      return favorite;
    } catch (error) {
      console.error("Error finding favorite:", error);
      return null;
    }
  },

  getUserFavorites: async (userId: string): Promise<Favorite[] | null> => {
    try {
      console.log("Getting user favorites for user ID:", userId);
      const favorites = await prisma.favorite.findMany({
        where: {
          user_id: userId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              imageUrl: true,
            },
          },
          podcast: {
            select: {
              id: true,
              title: true,
              description: true,
              cover_image: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return favorites;
    } catch (error) {
      console.error("Error getting user favorites:", error);
      return null;
    }
  },

  getPodcastFavoritesCount: async (
    podcastId: string
  ): Promise<number | null> => {
    try {
      const count = await prisma.favorite.count({
        where: {
          podcast_id: podcastId,
        },
      });
      return count;
    } catch (error) {
      console.error("Error counting podcast favorites:", error);
      return null;
    }
  },
};
