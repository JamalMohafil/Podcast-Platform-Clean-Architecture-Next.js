import { blogRepository } from "@/src/infrastructure/repositories/blogRepository";

export const getBlogsUseCase = async (
  limit: number,
  page: number,
  search?: string,
  categoryId?: string,
  most_viewed?: boolean
) => {
  const blogs = await blogRepository.getBlogs(
    limit,
    page,
    search,
    categoryId,
    most_viewed || false
  );
  return blogs;
};
