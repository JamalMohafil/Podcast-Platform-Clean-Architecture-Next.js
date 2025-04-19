import { getCategoriesUseCase } from "@/src/core/useCases/category/getCategoriesUseCase";

export const getCategoriesController = async (
  limit: number,
  page: number,
  search: string
) => {
  const categories = await getCategoriesUseCase(limit, page, search);
  return categories;
};
