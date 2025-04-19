import { categoryRepository } from "@/src/infrastructure/repositories/categoryRepository";
import { UpdateCategoryDto } from "../../dtos/category/updateCategoryDto";

export const updateCategoryUseCase = async (
  id: string,
  data: UpdateCategoryDto
) => {
  const category = await categoryRepository.update(id, data);
  return category;
};
