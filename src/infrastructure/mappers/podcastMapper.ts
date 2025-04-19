// إضافة هذه الوظيفة إلى podcastMapper
import { Podcast } from "@/src/core/domain/entities/Podcast";

export const podcastMapper = {
  toDomain: (data: any): Podcast => {
    return new Podcast(
      data.id,
      data.title,
      data.description,
      data.views_count,
      data.cover_image,
      data.audio_url, // ملاحظة: تخطيط من audio في قاعدة البيانات إلى audio_url في الكيان
      data.isFeatured,
      data.created_at,
      data.video_url,
      data.category_id,
      data.category,
      data.guestName
    );
  },

  toDomainList: (data: any[]): Podcast[] => {
    return data.map((item) => podcastMapper.toDomain(item));
  },

  toPersistence: (podcast: Podcast): any => {
    return {
      id: podcast.id,
      title: podcast.title,
      description: podcast.description,
      views_count: podcast.views_count,
      cover_image: podcast.cover_image,
      audio_url: podcast.audio_url, // تخطيط من audio_url في الكيان إلى audio في قاعدة البيانات
      isFeatured: podcast.isFeatured,
      video_url: podcast.video_url,
      category_id: podcast.category_id,
      guestName: podcast.guestName,
    };
  },
};
