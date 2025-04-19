import { blogRepository } from "@/src/infrastructure/repositories/blogRepository";
import { CreateBlogDto } from "../../dtos/blog/CreateBlogDto";
import { NotFoundError } from "../../domain/errors/commonErrors";
import { AlreadyExistsError } from "../../domain/errors/AuthErrors";

export const createBlogUseCase = async (data: CreateBlogDto) => {
  const existingBlog = await blogRepository.getBlog(data.slug);
  if (existingBlog) throw new AlreadyExistsError("Blog already exists");
  const blog = await blogRepository.create(data);
  return blog;
};
