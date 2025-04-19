import { blogRepository } from "@/src/infrastructure/repositories/blogRepository";
import { NotFoundError } from "../../domain/errors/commonErrors";

export const deleteBlogUseCase = async (id: string) => {
  const existingBlog = await blogRepository.getBlogById(id);
  if (!existingBlog) throw new NotFoundError("Blog not found");
  const blog = await blogRepository.delete(id);
  return blog;
};
