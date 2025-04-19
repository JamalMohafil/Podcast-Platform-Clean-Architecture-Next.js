import { NotFoundError } from "@/src/core/domain/errors/commonErrors";
import { createCategoryUseCase } from "@/src/core/useCases/category/createCategoryUseCase";
import { updateCategoryUseCase } from "@/src/core/useCases/category/updateCategoryUseCase";
import { categoryRepository } from "@/src/infrastructure/repositories/categoryRepository";
import { uploadImage } from "@/src/infrastructure/services/fileUploader";

export const updateCategoryController = async (
  id: string,
  {
    name,
    image,
  }: {
    name: string;
    image: File;
  }
) => {
  const existingCategory = await categoryRepository.findById(id);
  if (!existingCategory) throw new NotFoundError();
  const imageUrl = await uploadImage(image);
    console.log(imageUrl,'imageUrl')
  return await updateCategoryUseCase(id, {
    name,
    ...(imageUrl && { imageUrl }),
  });
};
