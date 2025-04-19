// src/core/dtos/blog/UpdateBlogDto.ts
export type UpdateBlogDto = {
  title?: string;
  content?: string;
  slug?: string;
  category_id?: string; // تم تحديثه من categoryId ليتماشى مع نموذج Prisma
  imageUrl?: string; // تم تحديثه من imageId ليتماشى مع نموذج Prisma
  isFeatured?: boolean;
};
