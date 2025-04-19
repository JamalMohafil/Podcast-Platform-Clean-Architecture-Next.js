import { Blog } from "@/src/core/domain/entities/Blog";

export const blogMapper = {
  toDomain: (prismaData: any): Blog => {
    return new Blog(
      prismaData.id,
      prismaData.title,
      prismaData.content || "",
      prismaData.slug,
      prismaData.updatedAt,
      prismaData.created_at,
      prismaData.user_id,
      prismaData.category_id,
      prismaData.category,
      prismaData.user,
      prismaData.views_count,
      prismaData._count.comments || 0,
      prismaData.imageUrl || undefined,
    );
  },

  toDomainList: (prismaDataList: any[]): Blog[] => {
    return prismaDataList.map((prismaData) => blogMapper.toDomain(prismaData));
  },

  toPrisma: (blog: Blog): any => {
    return {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      slug: blog.slug,
      imageUrl: blog.imageUrl,
      category_id: blog.category_id,
      user_id: blog.user_id,
      views_count: blog.views_count,
    };
  },
};
