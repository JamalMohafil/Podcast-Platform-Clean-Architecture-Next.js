import { getAdminCategoriesUseCase } from "@/src/core/useCases/category/getAdminCategoriesUseCase";

export const getAdminCategoriesController = async (
  limit: number,
  page: number,
  search: string
) => {
  const categories = await getAdminCategoriesUseCase(limit, page, search);
  return categories;
};
