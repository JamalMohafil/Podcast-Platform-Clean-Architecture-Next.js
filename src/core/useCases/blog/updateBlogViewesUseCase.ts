import { blogRepository } from "@/src/infrastructure/repositories/blogRepository";
import { NotFoundError } from "../../domain/errors/commonErrors";

export const updateBlogViewesUseCase = async (id: string) => {
  const existingBlog = await blogRepository.getBlogById(id);
  if (!existingBlog) throw new NotFoundError("Blog not found");
  const blog = await blogRepository.updateViews(id);
  return blog;
};
