// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// إنشاء متغير عام للحفاظ على نسخة واحدة من PrismaClient
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// إنشاء نسخة واحدة من PrismaClient ومشاركتها بين جميع الطلبات
export const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
