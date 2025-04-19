import { UnauthenticatedError } from "@/src/core/domain/errors/AuthErrors";
import { NotFoundError } from "@/src/core/domain/errors/commonErrors";
import { UserPayload } from "@/src/core/domain/services/jwtServiceInterface";
import { likeUseCases } from "@/src/core/useCases/like/likeUseCases";

// Like Controllers
export const LikeController = {
  toggleLike: async (user: UserPayload, commentId: string) => {
    if (!user) {
      throw new UnauthenticatedError();
    }

    if (!commentId) {
      throw new NotFoundError("Comment ID is required");
    }

    const result = await likeUseCases.toggleLike(user.id, commentId);
    const likesCount = await likeUseCases.getLikesCount(commentId);

    return {
      action: result.action,
      likesCount,
    };
  },

  getLikesByCommentId: async (commentId: string) => {
    if (!commentId) {
      throw new NotFoundError("Comment ID is required");
    }

    const likes = await likeUseCases.getLikesByCommentId(commentId);
    const count = likes.length;

    return {
      likes,
      count,
    };
  },
};
