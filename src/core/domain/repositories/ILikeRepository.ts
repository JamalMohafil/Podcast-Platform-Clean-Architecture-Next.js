import { Like } from "../entities/Like";

export interface ILikeRepository {
  create: (like: Like) => Promise<Like>;
  delete: (userId: string, commentId: string) => Promise<boolean>;
  getLikesByCommentId: (commentId: string) => Promise<Like[]>;
  checkIfUserLikedComment: (
    userId: string,
    commentId: string
  ) => Promise<boolean>;
  getLikesCountByCommentId: (commentId: string) => Promise<number>;
}
