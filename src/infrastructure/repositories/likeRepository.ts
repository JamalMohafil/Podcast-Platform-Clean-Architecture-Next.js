// src/infrastructure/repositories/likeRepository.ts
import { AlreadyExistsError } from "@/src/core/domain/errors/AuthErrors";
import { Like } from "../../core/domain/entities/Like";
import { ILikeRepository } from "../../core/domain/repositories/ILikeRepository";
import prisma from "../database/prisma";
import { likeMapper } from "../mappers/likeMapper";

export const likeRepository: ILikeRepository = {
  create: async (like: Like) => {
    try {
      const data = likeMapper.toPersistence(like);

      const createdLike = await prisma.like.create({
        data: {
          user_id: data.user_id,
          comment_id: data.comment_id,
        },
      });
      
      return true;
    } catch (error: any) {
      // Handle unique constraint violation - user already liked this comment
      if (error.code === "P2002") {
        throw new AlreadyExistsError("User has already liked this comment");
      }
      throw error;
    }
  },

  delete: async (userId: string, commentId: string): Promise<boolean> => {
    try {
      await prisma.like.deleteMany({
        where: {
          user_id: userId,
          comment_id: commentId,
        },
      });

      return true;
    } catch (error) {
      console.error("Error deleting like:", error);
      return false;
    }
  },

  getLikesByCommentId: async (commentId: string): Promise<Like[]> => {
    try {
      console.log("Fetching likes for comment:", commentId);
      const likes = await prisma.like.findMany({
        where: {
          comment_id: commentId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
      });
      console.log(likes, "Likes fetched");
      return likes.map((like) => likeMapper.toDomain(like));
    } catch (error) {
      console.error("Error fetching likes:", error);
      throw error;
    }
  },

  checkIfUserLikedComment: async (
    userId: string,
    commentId: string
  ): Promise<boolean> => {
    try {
      const like = await prisma.like.findFirst({
        where: {
          user_id: userId,
          comment_id: commentId,
        },
      });

      return !!like;
    } catch (error) {
      console.error("Error checking if user liked comment:", error);
      throw error;
    }
  },

  getLikesCountByCommentId: async (commentId: string): Promise<number> => {
    try {
      const count = await prisma.like.count({
        where: {
          comment_id: commentId,
        },
      });

      return count;
    } catch (error) {
      console.error("Error counting likes:", error);
      throw error;
    }
  },
};
