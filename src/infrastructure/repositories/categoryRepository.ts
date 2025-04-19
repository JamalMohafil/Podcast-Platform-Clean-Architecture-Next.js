// src/infrastructure/repositories/categoryRepository.ts
import { ICategoryRepository } from "../../core/domain/repositories/ICategoryRepository";
import { Category } from "@/src/core/domain/entities/Category";
import { CreateCategoryDto } from "@/src/core/dtos/category/createCategoryDto";
import prisma from "../database/prisma";
import { UpdateCategoryDto } from "@/src/core/dtos/category/updateCategoryDto";

export const categoryRepository: ICategoryRepository = {
  create: async (data: CreateCategoryDto) => {
    try {
      const newCategory = await prisma.category.create({
        data: {
          name: data.name,
          ...(data.imageUrl && { imageUrl: data.imageUrl }),
        },
      });

      return newCategory as unknown as Category;
    } catch (error) {
      console.error("Error creating category:", error);
      return null;
    }
  },

  findCategories: async (
    limit: number = 10,
    page: number = 1,
    search?: string,
    isAdmin?: boolean
  ) => {
    try {
      // Calculate pagination skip
      const skip = (page - 1) * limit;

      // Create search conditions
      const whereCondition: any = {};

      // Add search condition if provided
      if (search) {
        whereCondition.OR = [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ];
      }

      // Get total count of categories
      const totalCount = await prisma.category.count({
        where: whereCondition,
      });

      // Get categories with pagination - fix the include part
      const categories = await prisma.category.findMany({
        where: whereCondition,
        // Check your schema for the correct relation names
        ...(isAdmin && {
          include: {
            _count: {
              select: {
                // Use the actual relation names from your schema
                // For example, if your relations are called "Blog" and "Podcast" instead:
                blogs: true,
                podcasts: true,
              },
            },
          },
        }),
        skip,
        take: limit,
      });

      return {
        categories: categories as unknown as Category[],
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
      console.error("Error fetching categories:", error);
      return null;
    }
  },

  delete: async (categoryId: string) => {
    try {
      await prisma.category.delete({
        where: { id: categoryId },
      });
      return true;
    } catch (error) {
      console.error("Error deleting category:", error);
      return false;
    }
  },

  update: async (
    categoryId: string,
    category: UpdateCategoryDto
  ): Promise<Category | null> => {
    try {
      const updatedCategory = await prisma.category.update({
        where: { id: categoryId },
        data: {
          name: category.name,
          ...(category.imageUrl && { imageUrl: category.imageUrl }),
        },
      });

      return updatedCategory as unknown as Category;
    } catch (error) {
      console.error("Error updating category:", error);
      return null;
    }
  },
  findByName: async (name: string) => {
    try {
      const category = await prisma.category.findUnique({
        where: { name },
      });
      return category as unknown as Category;
    } catch (error) {
      console.error("Error finding category by name:", error);
      return null;
    }
  },
  findById: async (categoryId: string) => {
    try {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      return category as unknown as Category;
    } catch (error) {
      console.error("Error finding category by id:", error);
      return null;
    }
  },
};
