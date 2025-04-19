import { IUserRepository } from "@/src/core/domain/repositories/IUserRepository";
import bcrypt from "bcryptjs";
import { userAgent } from "next/server";
import prisma from "../database/prisma";
import { mapPrismaUserToUser } from "../mappers/userMapper";
export const userRepository: IUserRepository = {
  create: async (userData) => {
    try {
      const user = await prisma.user.create({ data: userData });

      return user ? mapPrismaUserToUser(user) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  findById: async (id) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });

      return user ? mapPrismaUserToUser(user) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  updateResetToken: async (id, resetToken, resetTokenExpiry) => {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: {
          resetToken,
          resetTokenExpiry,
        },
      });

      return user ? mapPrismaUserToUser(user) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  findByEmail: async (email) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });

      return user ? mapPrismaUserToUser(user) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  checkExists: async (email: string) => {
    try {
      const userCount = await prisma.user.count({ where: { email } });
      return userCount > 0;
    } catch (e: any) {
      console.error(`Error in userRepository.checkExists: ${e.message}`);
      return false;
    }
  },
  delete: async (id) => {
    try {
      return await prisma.$transaction(async (tx: any) => {
        // حذف التعليقات أولاً
        await tx.comment.deleteMany({
          where: { user_id: id },
        });

        // حذف المراجعات
        await tx.review.deleteMany({
          where: { user_id: id },
        });

        // حذف المفضلات
        await tx.favorite.deleteMany({
          where: { user_id: id },
        });

        // حذف المدونات
        await tx.blog.deleteMany({
          where: { user_id: id },
        });

        // حذف المستخدم
        await tx.user.delete({
          where: { id },
        });

        return true;
      });
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  update: async (id, data) => {
    try {
      const prismaUser = await prisma.user.update({
        where: { id },
        data: {
          ...(data.name && { name: data.name }),

          ...(data.email && { email: data.email }),
          ...(data.role && { role: data.role }),
          ...(data.date_of_birth && { date_of_birth: data.date_of_birth }),
          ...(data.bio && { bio: data.bio }),
          ...(data.imageUrl && { imageUrl: data.imageUrl }),
        },
      });

      return mapPrismaUserToUser(prismaUser);
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  getUsers: async (limit, page, search) => {
    const where = search
      ? {
          OR: [{ name: { contains: search } }, { email: { contains: search } }],
        }
      : {};
    const [totalUsers, users] = await Promise.all([
      prisma.user.count({ where: where ? where : {} }), // عدد المستخدمين (للحساب الكلي)
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          city_id: true,
          date_of_birth: true,
          bio: true,
          imageUrl: true,
          created_at: true,
          updated_at: true,
        },
        take: limit,
        skip: (page - 1) * limit,
        ...(search && {
          where: {
            OR: [
              { name: { contains: search } },
              { email: { contains: search } },
            ],
          },
        }),
      }),
    ]);
    return {
      users: users.map((user) => mapPrismaUserToUser(user)),
      pagination: {
        total: totalUsers,
        hasMore: page * limit < totalUsers,
        hasPrevious: page > 1,
        currentPage: page,
        limit: limit,
        pages: Math.ceil(totalUsers / limit),
      },
    };
  },

  findByResetToken: async (token) => {
    try {
      const user = await prisma.user.findFirst({
        where: { resetToken: token },
      });
      return user ? mapPrismaUserToUser(user) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};
