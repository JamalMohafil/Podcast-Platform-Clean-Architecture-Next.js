// src/core/application/useCases/commentUseCases.ts
import { Comment } from "../../domain/entities/Comment";
import {
  ICommentRepository,
  CommentFilterOptions,
  CommentWithDetails,
} from "../../domain/repositories/ICommentRepository";
import { commentRepository } from "../../../infrastructure/repositories/commentRepository";
import { blogRepository } from "@/src/infrastructure/repositories/blogRepository";
import { NotFoundError } from "../../domain/errors/commonErrors";
import { UserPayload } from "../../domain/services/jwtServiceInterface";

export const commentUseCases = {
  createComment: async (
    commentText: string,
    userId: string,
    blogId: string
  ): Promise<Comment> => {
    const existingBlog = await blogRepository.getBlogById(blogId);
    console.log(commentText, userId, blogId, "commentUasdseCases");
    if (!existingBlog) {
      throw new NotFoundError("Blog not found");
    }
    const newComment = new Comment("", commentText, userId, blogId);
    console.log(newComment);
    return await commentRepository.create(newComment);
  },
  getAllComments: async (options: CommentFilterOptions) => {
    return await commentRepository.getAllComments(options);
  },
  getCommentsByBlogId: async (
    blogId: string,
    options?: CommentFilterOptions,
    user?: UserPayload | null
  ) => {
    return await commentRepository.getCommentsByBlogId(blogId, options, user);
  },

  getCommentById: async (
    commentId: string,
    includeUserEmail = false
  ): Promise<CommentWithDetails | null> => {
    return await commentRepository.getCommentById(commentId, includeUserEmail);
  },

  updateComment: async (
    commentId: string,
    comment: string
  ): Promise<Comment> => {
    return await commentRepository.updateComment(commentId, comment);
  },

  deleteComment: async (commentId: string): Promise<boolean> => {
    return await commentRepository.deleteComment(commentId);
  },
};
