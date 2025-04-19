import { blogRepository } from "@/src/infrastructure/repositories/blogRepository";
import { CreateBlogDto } from "../../dtos/blog/CreateBlogDto";
import { NotFoundError } from "../../domain/errors/commonErrors";
import { AlreadyExistsError } from "../../domain/errors/AuthErrors";
import { UpdateBlogDto } from "../../dtos/blog/UpdateBlogDto";

export const updateBlogUseCase = async (id: string, data: UpdateBlogDto) => {
  const existingBlog = await blogRepository.getBlogById(id);
  if (!existingBlog) throw new NotFoundError("Blog not found");
  if (existingBlog.slug === data.slug)
    throw new AlreadyExistsError("Blog already exists");
  const blog = await blogRepository.update(id, data);
  return blog;
};
