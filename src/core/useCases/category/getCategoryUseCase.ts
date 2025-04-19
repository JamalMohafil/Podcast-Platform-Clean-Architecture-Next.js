import { categoryRepository } from "@/src/infrastructure/repositories/categoryRepository";
import { NotFoundError } from "../../domain/errors/commonErrors";

export const getCategoryUseCase = async (id: string) => {
  const category = await categoryRepository.findById(id);
  if (!category) throw new NotFoundError("Category not found");
  return category;
};
