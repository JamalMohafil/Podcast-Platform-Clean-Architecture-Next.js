import { categoryRepository } from "@/src/infrastructure/repositories/categoryRepository";

export const getCategoriesUseCase = async (
  limit: number,
  page: number,
  search: string
) => {
  const categories = await categoryRepository.findCategories(
    limit,
    page,
    search && search
  );
  return categories;
};
