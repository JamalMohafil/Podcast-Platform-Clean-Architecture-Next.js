import { deleteCategoryUseCase } from "@/src/core/useCases/category/deleteCategoryUseCase";

export const deleteCategoryController = async (categoryId: string) => {
  const category = await deleteCategoryUseCase(categoryId);
  return category;
};
