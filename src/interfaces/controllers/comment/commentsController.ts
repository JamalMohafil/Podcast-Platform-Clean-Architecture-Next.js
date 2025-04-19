// src/infrastructure/controllers/commentController.ts
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "@/src/core/domain/errors/AuthErrors";
import {
  BaseError,
  InputParseError,
  NotFoundError,
} from "@/src/core/domain/errors/commonErrors";
import {
  AuthenticatedRequest,
  UserPayload,
} from "@/src/core/domain/services/jwtServiceInterface";
import { UpdateCommentDto } from "@/src/core/dtos/comment/UpdateCommentDto";
import { commentUseCases } from "@/src/core/useCases/comment/commentUseCases";
import { NextResponse } from "next/server";
import { z } from "zod";

// Comment validation schema
const commentSchema = z.object({
  comment: z
    .string()
    .min(1, "Comment can't be empty")
    .max(1000, "Comment is too long"),
  blogId: z.string().min(1, "Blog ID is required"),
});
export type CommentInputType = z.infer<typeof commentSchema>;
const createCommentSchema = z.object({
  comment: z
    .string({ required_error: "Comment can't be empty" })
    .min(1, "Comment can't be empty")
    .max(1000, "Comment is too long"),
  blogId: z
    .string({ required_error: "Blog ID is required" })
    .min(1, "Blog ID is required"),
});
export type CreateCommentInputType = z.infer<typeof createCommentSchema>;
// Comment Controllers
export const commentsController = {
  // Create a comment
  createComment: async (
    user: UserPayload | null,
    data: CreateCommentInputType
  ) => {
    if (!user) {
      throw new UnauthenticatedError();
    }

    const validation = createCommentSchema.safeParse(data);

    if (!validation.success) {
      throw new InputParseError(
        "Invalid data",
        validation.error.issues[0].message
      );
    }

    const { comment, blogId } = validation.data;
    const createdComment = await commentUseCases.createComment(
      comment,
      user.id,
      blogId
    );

    return createdComment;
  },
  getAllComments: async (limit: number, page: number, search: string) => {
    console.log(limit, page, search);
    const options = {
      limit: limit === 0 ? undefined : limit,
      page: page === 0 ? undefined : page,
      search: search,
    };
    const comments = await commentUseCases.getAllComments(options);
    return comments;
  },
  // Get comments for a blog with pagination and search
  getCommentsByBlogId: async (
    blogId: string,
    limit: number,
    page: number,
    search: string,
    user?: UserPayload | null
  ) => {
    const includeUserEmail = user && user?.role === "ADMIN" ? true : false;

    const result = await commentUseCases.getCommentsByBlogId(
      blogId,
      {
        limit,
        page,
        search,
        includeUserEmail,
      },
      user
    );

    return result;
  },

  updateComment: async (
    commentId: string,
    user: UserPayload | null,
    data: UpdateCommentDto
  ) => {
    if (!user) {
      throw new UnauthenticatedError();
    }
    const comment = await commentUseCases.getCommentById(commentId);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    // Only allow comment owner or admin to update
    if (comment.user_id !== user.id && user.role !== "ADMIN") {
      throw new UnauthorizedError();
    }
    console.log(data);
    const updatedComment = await commentUseCases.updateComment(
      commentId,
      data.comment
    );

    return updatedComment;
  },

  deleteComment: async (commentId: string, user: UserPayload | null) => {
    if (!user) {
      throw new UnauthenticatedError();
    }

    // Check if user owns the comment or is admin
    const comment = await commentUseCases.getCommentById(commentId);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    // Only allow comment owner or admin to delete
    if (comment.user_id !== user.id && user.role !== "ADMIN") {
      throw new UnauthorizedError("Unauthorized to delete this comment");
    }

    const deleted = await commentUseCases.deleteComment(commentId);

    if (!deleted) {
      throw new BaseError("Error", "Failed to delete comment");
    }

    return true;
  },
  getComment: async (user: UserPayload | null, commentId: string) => {
    const comment = await commentUseCases.getCommentById(
      commentId,
      user ? true : false
    );
    console.log(comment);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }
    return comment;
  },
};
