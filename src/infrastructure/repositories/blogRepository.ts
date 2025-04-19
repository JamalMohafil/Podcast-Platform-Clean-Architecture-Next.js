import { Blog } from "@/src/core/domain/entities/Blog";
import { IBlogRepository } from "@/src/core/domain/repositories/IBlogRepository";
import prisma from "../database/prisma";
import { blogMapper } from "../mappers/blogMapper";
import { CreateBlogDto } from "@/src/core/dtos/blog/CreateBlogDto";
import { UpdateBlogDto } from "@/src/core/dtos/blog/UpdateBlogDto";

export const blogRepository: IBlogRepository = {
  getBlogs: async (
    limit: number,
    page: number,
    search?: string,
    categoryId?: string,
    most_viewed?: boolean
  ) => {
    try {
      const skip = (page - 1) * limit;

      const where: any = {};

      if (search) {
        where.OR = [
          { title: { contains: search } },
          { content: { contains: search } },
        ];
      }

      if (categoryId) {
        where.category_id = categoryId;
      }
      const orderBy: any = most_viewed
        ? { views_count: "desc" }
        : { created_at: "desc" };

      console.log(orderBy, "most_viewed");
      const blogsData = await prisma.blog.findMany({
        where,
        orderBy,
        take: limit,
        skip,
        include: {
          category: { select: { id: true, name: true } },
          _count: { select: { comments: true } },
        },
      });
      const totalCount = await prisma.blog.count({ where });

      return {
        blogs: blogMapper.toDomainList(blogsData) as Blog[],
        pagination: {
          total: totalCount,
          currentPage: page,
          limit: limit,
          hasMore: totalCount > page * limit,
          hasPrevious: page > 1,
          pages: Math.ceil(totalCount / limit),
        },
      };
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return null;
    }
  },
  updateViews: async (id: string) => {
    try {
      const updatedBlog = await prisma.blog.update({
        where: { id },
        data: {
          views_count: {
            increment: 1,
          },
        },
        select: { views_count: true },
      });
      return updatedBlog.views_count;
    } catch (e) {
      return null;
    }
  },
  getBlog: async (slug: string) => {
    try {
      const blogData = await prisma.blog.findUnique({
        where: { slug: slug },
        include: {
          category: { select: { id: true, name: true } },
          _count: { select: { comments: true } },
        },
      });

      if (!blogData) return null;

      return blogMapper.toDomain(blogData) as Blog;
    } catch (error) {
      console.error(`Error fetching blog with id ${slug}:`, error);
      return null;
    }
  },
  getBlogById: async (id: string) => {
    try {
      const blogData = await prisma.blog.findUnique({
        where: { id: id },
        include: {
          category: { select: { id: true, name: true } },
          _count: { select: { comments: true } },
        },
      });
      if (!blogData) return null;
      return blogMapper.toDomain(blogData) as Blog;
    } catch (error) {
      console.error(`Error fetching blog with id ${id}:`, error);
      return null;
    }
  },
  delete: async (id: string) => {
    try {
      await prisma.blog.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      console.error(`Error deleting blog with id ${id}:`, error);
      return null;
    }
  },

  create: async (blog: CreateBlogDto) => {
    // إنشاء كائن البيانات
    const data: any = {
      title: blog.title,
      slug: blog.slug,
      user_id: blog.user_id,
    };

    // إضافة الحقول الاختيارية
    if (blog.content) data.content = blog.content;
    if (blog.imageUrl) data.imageUrl = blog.imageUrl;
    if (blog.isFeatured !== undefined) data.isFeatured = blog.isFeatured;

    // إضافة علاقة الفئة إذا كانت موجودة
    if (blog.category_id) {
      data.category_id = blog.category_id;
    }

    const newBlogData = await prisma.blog.create({
      data,
      include: {
        category: { select: { id: true, name: true } },
        _count: { select: { comments: true } },
      },
    });

    return blogMapper.toDomain(newBlogData);
  },

  update: async (blogId: string, blog: UpdateBlogDto) => {
    try {
      // إعداد البيانات للتحديث
      const updateData: any = {};

      if (blog.title) updateData.title = blog.title;
      if (blog.content !== undefined) updateData.content = blog.content;
      if (blog.slug) updateData.slug = blog.slug;
      if (blog.imageUrl) updateData.imageUrl = blog.imageUrl;
      if (blog.isFeatured !== undefined)
        updateData.isFeatured = blog.isFeatured;

      // التعامل مع الفئة
      if (blog.category_id) {
        updateData.category = {
          connect: { id: blog.category_id },
        };
      }

      const updatedBlogData = await prisma.blog.update({
        where: { id: blogId },
        data: updateData,
        include: {
          category: { select: { id: true, name: true } },
          _count: { select: { comments: true } },
        },
      });

      return blogMapper.toDomain(updatedBlogData);
    } catch (error) {
      console.error(`Error updating blog with id ${blogId}:`, error);
      return null;
    }
  },
};
