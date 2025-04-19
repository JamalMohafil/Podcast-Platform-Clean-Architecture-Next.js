import { createCategoryUseCase } from "@/src/core/useCases/category/createCategoryUseCase";
import { uploadImage } from "@/src/infrastructure/services/fileUploader";

export const createCategoryController = async ({
  name,
  image,
}: {
  name: string;
  image: File;
}) => {
  const imageUrl = await uploadImage(image);

  return await createCategoryUseCase({
    name,
    ...(imageUrl && { imageUrl }),
  });
};
