import { blogRepository } from "@/src/infrastructure/repositories/blogRepository";
import { NotFoundError } from "../../domain/errors/commonErrors";

export const getBlogUseCase = async (id: string) => {
  const blog = await blogRepository.getBlogById(id);
  if (!blog) throw new NotFoundError("Blog not found");
  return blog;
};
