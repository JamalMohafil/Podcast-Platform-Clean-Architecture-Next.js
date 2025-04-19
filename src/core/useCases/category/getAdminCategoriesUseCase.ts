import { categoryRepository } from "@/src/infrastructure/repositories/categoryRepository";

export const getAdminCategoriesUseCase = async (
  limit: number,
  page: number,
  search?: string
) => {
  const categories = await categoryRepository.findCategories(
    limit,
    page,
    search,
    true
  );

  return categories
};
