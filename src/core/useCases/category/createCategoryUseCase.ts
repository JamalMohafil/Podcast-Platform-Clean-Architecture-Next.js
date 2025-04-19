import { categoryRepository } from "@/src/infrastructure/repositories/categoryRepository";
import { CreateCategoryDto } from "../../dtos/category/createCategoryDto";
import { AlreadyExistsError } from "../../domain/errors/AuthErrors";

export const createCategoryUseCase = async ({
  name,
  imageUrl,
}: CreateCategoryDto) => {
  const existingCategory = await categoryRepository.findByName(name);
  if (existingCategory) {
    throw new AlreadyExistsError("Category already exists");
  }
  const category = await categoryRepository.create({ name, imageUrl });
  return category;
};
