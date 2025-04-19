import { Comment } from "../entities/Comment";
import { UserPayload } from "../services/jwtServiceInterface";
export interface ICommentRepository {
  create: (comment: Comment) => Promise<Comment>;
  getCommentsByBlogId: (
    blogId: string,
    options?: CommentFilterOptions,
    user?: UserPayload | null
  ) => Promise<{
    comments: CommentWithDetails[];
    pagination: {
      total: number;
      hasPrevious: boolean;
      hasMore: boolean;
      currentPage: number;
      limit: number;
      pages: number;
    };
  }>;
  getAllComments: (options?: CommentFilterOptions) => Promise<{
    comments: CommentWithDetails[];
    pagination: {
      total: number;
      hasPrevious: boolean;
      hasMore: boolean;
      currentPage: number;
      limit: number;
      pages: number;
    };
  }>;
  getCommentById: (
    commentId: string,
    includeUserEmail?: boolean
  ) => Promise<CommentWithDetails | null>;
  deleteComment: (commentId: string) => Promise<boolean>;
  updateComment: (commentId: string, comment: string) => Promise<Comment>;
}

export interface UserDetails {
  id: string;
  name: string;
  email?: string;
  imageUrl?: string;
}

export interface CommentWithDetails extends Comment {
  user: UserDetails;
  likesCount: number;
  likes: Array<{
    userId: string;
    userName: string;
  }>;
}

export interface CommentFilterOptions {
  limit?: number;
  page?: number;
  search?: string;
  includeUserEmail?: boolean; // To control whether email is returned
}
