import { createBlogUseCase } from "@/src/core/useCases/blog/createBlogUseCase";
import {
  createBlogInputSchema,
  CreateBlogInputType,
} from "../../validators/blog/createBlogValidator";
import { InputParseError } from "@/src/core/domain/errors/commonErrors";
import { uploadImage } from "@/src/infrastructure/services/fileUploader";

export const createBlogController = async (data: CreateBlogInputType) => {
  console.log(data,'adsfgb')
  const parsed = await createBlogInputSchema.safeParse(data);
  if (!parsed.success) {
    throw new InputParseError(
      "Invalid data",
      parsed.error.issues[0].message || "Invalid inputs"
    );
  }
  let imageUrl;
  if (data.image) {
    imageUrl = await uploadImage(data.image);
  }
  const blog = await createBlogUseCase({
    title: data.title,
    slug: data.slug,
    ...(data.content && { content: data.content }),
    ...(imageUrl && { imageUrl }),
    ...(data.category_id && { category_id: data.category_id }),
    user_id: data.user_id,
    isFeatured: data.isFeatured || false,
  });
  return blog;
};
