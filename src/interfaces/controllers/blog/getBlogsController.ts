import { getBlogsUseCase } from "@/src/core/useCases/blog/getBlogsUseCase";

export const getBlogsController = async (
  limit: number,
  page: number,
  search?: string,

  categoryId?: string
) => {
  const blogs = await getBlogsUseCase(
    limit,
    page,
    search,
    categoryId
  );
  return blogs;
};
