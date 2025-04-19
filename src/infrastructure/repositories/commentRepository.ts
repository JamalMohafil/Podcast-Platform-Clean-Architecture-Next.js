// src/infrastructure/repositories/commentRepository.ts
import { UserPayload } from "@/src/core/domain/services/jwtServiceInterface";
import { Comment } from "../../core/domain/entities/Comment";
import {
  ICommentRepository,
  CommentWithDetails,
  CommentFilterOptions,
} from "../../core/domain/repositories/ICommentRepository";
import prisma from "../database/prisma";
import { commentMapper } from "../mappers/commentMapper";

export const commentRepository: ICommentRepository = {
  create: async (comment: Comment) => {
    try {
      const data = commentMapper.toPersistence(comment);

      const createdComment = await prisma.comment.create({
        data: {
          comment: data.comment,
          user_id: data.user_id,
          blog_id: data.blog_id,
        },
      });

      return commentMapper.toDomain(createdComment);
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  },

  getCommentsByBlogId: async (
    blogId: string,
    options?: CommentFilterOptions,
    user?: UserPayload | null
  ) => {
    console.log(user,'imeorgfh')
    try {
      const limit = options?.limit || 10;
      const page = options?.page || 1;
      const skip = (page - 1) * limit;
      const search = options?.search || "";
      const includeUserEmail = options?.includeUserEmail || false;

      // Build the where clause based on filters
      const whereClause: any = {
        blog_id: blogId,
      };

      if (search) {
        whereClause.comment = {
          contains: search,
          mode: "insensitive", // Case insensitive search
        };
      }

      // Count total comments for pagination
      const total = await prisma.comment.count({
        where: whereClause,
      });

      // Define user select based on whether we should include email
      const userSelect = {
        id: true,
        name: true,
        imageUrl: true,
        ...(includeUserEmail && { email: true }),
      };

      // Fetch comments with related data
      const comments = await prisma.comment.findMany({
        where: whereClause,
        include: {
          user: {
            select: userSelect,
          },
          _count: { select: { likes: true } },
        },
        skip,
        take: limit,
        orderBy: {
          created_at: "desc",
        },
      });

      // Transform the data and add isLiked property
      const commentsWithDetails: CommentWithDetails[] = await Promise.all(
        comments.map(async (comment) => {
          let isLiked = false;

          // Check if user liked this comment if a user is provided
          if (user) {
            const like = await prisma.like.findFirst({
              where: {
                comment_id: comment.id,
                user_id: user.id,
              },
            });
            console.log(like,'idamsfdbgh')
            isLiked = !!like;
          }

          const detailedComment = commentMapper.toDetailedDomain(
            comment,
            includeUserEmail
          );
          return {
            ...detailedComment,
            isLiked,
          };
        })
      );

      return {
        comments: commentsWithDetails,
        pagination: {
          total: total,
          hasMore: page * limit < total,
          hasPrevious: page > 1,
          currentPage: page,
          limit: limit,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  },
  getAllComments: async (options?: CommentFilterOptions) => {
    try {
      const { limit, page, search } = options || {};
      const skip = limit && page && (page - 1) * limit;

      // Construir la cláusula WHERE para buscar tanto en comentarios como en nombres de usuario
      const whereClause: any = {};

      if (search) {
        whereClause.OR = [
          {
            comment: {
              contains: search,
              mode: "insensitive", // Búsqueda insensible a mayúsculas/minúsculas
            },
          },
          {
            user: {
              name: {
                contains: search,
                mode: "insensitive", // Búsqueda insensible a mayúsculas/minúsculas
              },
            },
          },
        ];
      }

      // Contar el total de comentarios para la paginación
      const total = await prisma.comment.count({
        where: whereClause,
      });

      // Definir los campos a seleccionar del usuario
      const userSelect = {
        id: true,
        name: true,
        email: true,
        imageUrl: true,
      };

      // Obtener comentarios con datos relacionados
      const comments = await prisma.comment.findMany({
        where: whereClause,
        include: {
          user: {
            select: userSelect,
          },
          blog: { select: { id: true, title: true, imageUrl: true } },
          _count: { select: { likes: true } },
        },
        skip: skip || 0,
        take: limit,
        orderBy: {
          created_at: "desc",
        },
      });

      // Transformar los datos usando el mapper
      const commentsWithDetails: CommentWithDetails[] = comments.map(
        (comment) => commentMapper.toDetailedDomain(comment, true)
      );

      return {
        comments: commentsWithDetails,
        pagination: {
          total: total,
          hasMore: (page && limit && page * limit < total) || false,
          hasPrevious: page ? page > 1 : false,
          currentPage: page || 1,
          limit: limit || total,
          pages: Math.ceil(total / (limit || total)),
        },
      };
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  },
  getCommentById: async (
    commentId: string,
    includeUserEmail = false
  ): Promise<CommentWithDetails | null> => {
    try {
      // Define user select based on whether we should include email
      const userSelect = {
        id: true,
        name: true,
        imageUrl: true,
        ...(includeUserEmail && { email: true }),
      };

      const comment = await prisma.comment.findUnique({
        where: {
          id: commentId,
        },
        include: {
          user: {
            select: userSelect,
          },
          _count: { select: { likes: true } },
          ...(includeUserEmail && {
            likes: {
              include: {
                user: {
                  select: { email: true, name: true, id: true, imageUrl: true },
                },
              },
            },
          }),
        },
      });

      if (!comment) {
        return null;
      }

      return commentMapper.toDetailedDomain(comment, includeUserEmail);
    } catch (error) {
      console.error("Error fetching comment:", error);
      return null;
    }
  },

  deleteComment: async (commentId: string): Promise<boolean> => {
    try {
      // First delete all likes associated with this comment
      await prisma.like.deleteMany({
        where: {
          comment_id: commentId,
        },
      });

      // Then delete the comment
      await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });

      return true;
    } catch (error) {
      console.error("Error deleting comment:", error);
      return false;
    }
  },

  updateComment: async (
    commentId: string,
    comment: string
  ): Promise<Comment> => {
    try {
      const updatedComment = await prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          comment: comment,
        },
      });
      console.log(comment);

      return commentMapper.toDomain(updatedComment);
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  },
};
