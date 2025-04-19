import { UpdateBlogDto } from "@/src/core/dtos/blog/UpdateBlogDto";
import {
  updateBlogInputSchema,
  UpdateBlogInputType,
} from "../../validators/blog/updateBlogValidator";
import { InputParseError } from "@/src/core/domain/errors/commonErrors";
import { uploadImage } from "@/src/infrastructure/services/fileUploader";
import { updateBlogUseCase } from "@/src/core/useCases/blog/updateBlogUseCase";

export const updateBlogController = async (
  id: string,
  data: UpdateBlogInputType
) => {
  const parsed = await updateBlogInputSchema.safeParse(data);
  if (!parsed.success) {
    throw new InputParseError("Invalid data", parsed.error.issues[0].message);
  }
  let imageUrl;
  if (data.image) {
    imageUrl = await uploadImage(data.image);
  }
  const reuslt = {
    ...(data.title && { title: data.title }),
    ...(data.content && { content: data.content }),
    ...(data.slug && { slug: data.slug }),
    ...(imageUrl && { imageUrl }),
    ...(data.category_id && { category_id: data.category_id }),
    ...(data.user_id && { user_id: data.user_id }),
    ...(data.isFeatured && { isFeatured: data.isFeatured }),
  };

  const blog = await updateBlogUseCase(id, reuslt);
  return blog;
};
