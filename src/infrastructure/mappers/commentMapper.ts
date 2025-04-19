// src/infrastructure/mappers/commentMapper.ts
import { Comment } from "../../core/domain/entities/Comment";
import { Comment as PrismaComment } from "@prisma/client";
import { CommentWithDetails } from "../../core/domain/repositories/ICommentRepository";

export const commentMapper = {
  toDomain: (dbComment: any): Comment => {
    return {
      id: dbComment.id,
      comment: dbComment.comment || "",
      user_id: dbComment.user_id,
      blog_id: dbComment.blog_id,
      created_at: dbComment.created_at,
      updated_at: dbComment.updated_at || dbComment.created_at,
    };
  },

  toPersistence: (domainComment: Comment): any => {
    return {
      id: domainComment.id,
      comment: domainComment.comment,
      user_id: domainComment.user_id,
      blog_id: domainComment.blog_id,
    };
  },

  // تحويل التعليق مع تفاصيل المستخدم
  toDetailedDomain: (
    dbComment: any,
    includeUserEmail = false
  ): CommentWithDetails => {
    return {
      id: dbComment.id,
      comment: dbComment.comment || "",
      user_id: dbComment.user_id,
      blog_id: dbComment.blog_id,
      created_at: dbComment.created_at,
      updated_at: dbComment.updated_at || dbComment.created_at,
      user: {
        id: dbComment.user.id,
        name: dbComment.user.name,
        imageUrl: dbComment.user.imageUrl,
        ...(includeUserEmail &&
          dbComment.user.email && { email: dbComment.user.email }),
      },
      likesCount: dbComment._count.likes || 0,
      likes: (dbComment.likes || []).map((like: any) => ({
        userId: like.user.id,
        userName: like.user.name,
        userImageUrl: like.user.imageUrl,
      })),
    };
  },
};
