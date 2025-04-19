// src/infrastructure/repositories/podcastRepository.ts
import { Podcast } from "@/src/core/domain/entities/Podcast";
import { IPodcastRepository } from "@/src/core/domain/repositories/IPodcastRepository";
import prisma from "../database/prisma";
import { podcastMapper } from "../mappers/podcastMapper";

export const podcastRepository: IPodcastRepository = {
  getPodcasts: async (
    limit: number,
    page: number,
    search?: string,
    categoryId?: string
  ) => {
    try {
      const skip = (page - 1) * limit;

      // بناء شروط البحث
      const where: any = {};

      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { guestName: { contains: search, mode: "insensitive" } },
        ];
      }

      if (categoryId) {
        where.category_id = categoryId;
      }

      // الحصول على البودكاست مع التصنيفات
      const podcastsData = await prisma.podcast.findMany({
        where,
        orderBy: { created_at: "desc" },
        take: limit,
        skip,
        include: {
          category: { select: { id: true, name: true } },
        },
      });

      const totalCount = await prisma.podcast.count({ where });

      return {
        podcasts: podcastMapper.toDomainList(podcastsData) as Podcast[],
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
      console.error("Error fetching podcasts:", error);
      return null;
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      await prisma.podcast.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      console.error(`Error deleting podcast with id ${id}:`, error);
      return false;
    }
  },

  create: async (podcast: Partial<Podcast>): Promise<Podcast | null> => {
    try {
      // إنشاء كائن البيانات
      const data: any = {
        title: podcast.title!,
        category_id: podcast.category_id!,
        audio_url: podcast.audio_url!, // ملاحظة: تخطيط من audio_url إلى audio في قاعدة البيانات
      };

      // إضافة الحقول الاختيارية
      if (podcast.description) data.description = podcast.description;
      if (podcast.cover_image) data.cover_image = podcast.cover_image;
      if (podcast.isFeatured !== undefined)
        data.isFeatured = podcast.isFeatured;
      if (podcast.video_url) data.video_url = podcast.video_url;
      if (podcast.guestName) data.guestName = podcast.guestName;

      const newPodcastData = await prisma.podcast.create({
        data,
        include: {
          category: { select: { id: true, name: true } },
        },
      });

      return podcastMapper.toDomain(newPodcastData);
    } catch (error) {
      console.error("Error creating podcast:", error);
      return null;
    }
  },

  update: async (
    podcast: Partial<Podcast>,
    podcastId: string
  ): Promise<Podcast | null> => {
    try {
      // إعداد البيانات للتحديث
      const updateData: any = {};

      if (podcast.title) updateData.title = podcast.title;
      if (podcast.description !== undefined)
        updateData.description = podcast.description;
      if (podcast.cover_image) updateData.cover_image = podcast.cover_image;
      if (podcast.audio_url) updateData.audio_url = podcast.audio_url; // تخطيط من audio_url إلى audio
      if (podcast.isFeatured !== undefined)
        updateData.isFeatured = podcast.isFeatured;
      if (podcast.video_url !== undefined)
        updateData.video_url = podcast.video_url;
      if (podcast.guestName !== undefined)
        updateData.guestName = podcast.guestName;

      // تحديث علاقة التصنيف إذا تم توفيرها
      if (podcast.category_id) {
        updateData.category_id = podcast.category_id;
      }

      const updatedPodcastData = await prisma.podcast.update({
        where: { id: podcastId },
        data: updateData,
        include: {
          category: { select: { id: true, name: true } },
        },
      });

      return podcastMapper.toDomain(updatedPodcastData);
    } catch (error) {
      console.error(`Error updating podcast with id ${podcastId}:`, error);
      return null;
    }
  },

  getPodcast: async (id: string): Promise<Podcast | null> => {
    try {
      const podcastData = await prisma.podcast.findUnique({
        where: { id },
        include: {
          category: { select: { id: true, name: true } },
        },
      });

      if (!podcastData) return null;

      return podcastMapper.toDomain(podcastData);
    } catch (error) {
      console.error(`Error fetching podcast with id ${id}:`, error);
      return null;
    }
  },

  updateViewsCount: async (id: string) => {
    try {
      const result = await prisma.podcast.update({
        where: { id },
        data: {
          views_count: {
            increment: 1,
          },
        },
      });

      return result.views_count;
    } catch (error) {
      console.error(
        `Error updating views count for podcast with id ${id}:`,
        error
      );
      return null;
    }
  },

  getMostViewed: async (
    limit: number,
    page: number,
    search?: string,
    categoryId?: string
  ) => {
    try {
      const skip = (page - 1) * limit;
      const where: any = {};

      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { guestName: { contains: search, mode: "insensitive" } },
        ];
      }
      if (categoryId) {
        where.category_id = categoryId;
      }
      const podcastsData = await prisma.podcast.findMany({
        orderBy: { views_count: "desc" },
        where,

        take: limit,
        skip,
        include: {
          category: { select: { id: true, name: true } },
        },
      });
      const totalCount = await prisma.podcast.count({ where });

      return {
        podcasts: podcastMapper.toDomainList(podcastsData) as Podcast[],
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
      console.error("Error fetching most viewed podcasts:", error);
      return null;
    }
  },
};
