import { categoryRepository } from "@/src/infrastructure/repositories/categoryRepository";
import { NotFoundError } from "../../domain/errors/commonErrors";

export const deleteCategoryUseCase = async (categoryId: string) => {
  const existingCategory = await categoryRepository.findById(categoryId);
  if (!existingCategory) throw new NotFoundError("Category not found");
  const result = await categoryRepository.delete(categoryId);
  return result;
};
