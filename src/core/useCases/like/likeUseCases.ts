// src/core/application/useCases/likeUseCases.ts
import { Like } from "../../domain/entities/Like";
import { ILikeRepository } from "../../domain/repositories/ILikeRepository";
import { likeRepository } from "../../../infrastructure/repositories/likeRepository";

export const likeUseCases = {
  toggleLike: async (
    userId: string,
    commentId: string
  ): Promise<{ action: "liked" | "unliked" }> => {
    // Check if user already liked the comment
    const alreadyLiked = await likeRepository.checkIfUserLikedComment(
      userId,
      commentId
    );

    if (alreadyLiked) {
      // If already liked, unlike it
      await likeRepository.delete(userId, commentId);
      return { action: "unliked" };
    } else {
      // If not liked, like it
      const newLike = new Like(
        "", // ID will be assigned by database
        userId,
        commentId
      );
      await likeRepository.create(newLike);
      return { action: "liked" };
    }
  },

  getLikesByCommentId: async (commentId: string): Promise<Like[]> => {
    return await likeRepository.getLikesByCommentId(commentId);
  },

  checkIfUserLikedComment: async (
    userId: string,
    commentId: string
  ): Promise<boolean> => {
    return await likeRepository.checkIfUserLikedComment(userId, commentId);
  },

  getLikesCount: async (commentId: string): Promise<number> => {
    return await likeRepository.getLikesCountByCommentId(commentId);
  },
};
