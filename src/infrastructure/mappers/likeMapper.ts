import { Like } from "../../core/domain/entities/Like";

export const likeMapper = {
  toDomain: (dbLike: any): Like => {
    return {
      id: dbLike.id,
      user_id: dbLike.user_id,
      comment_id: dbLike.comment_id,
      created_at: dbLike.created_at,
      updated_at: dbLike.updated_at,
      // Add User detials
      user: {
        id: dbLike.user.id,
        name: dbLike.user.name,
        email: dbLike.user.email,
        imageUrl: dbLike.user.imageUrl,
      },
    };
  },

  toPersistence: (domainLike: Like): any => {
    return {
      id: domainLike.id,
      user_id: domainLike.user_id,
      comment_id: domainLike.comment_id,
    };
  },
};
