import { getCategoryUseCase } from "@/src/core/useCases/category/getCategoryUseCase";

export const getCategoryController = async (id: string) => {
  const category = await getCategoryUseCase(id);
  return category;
};
