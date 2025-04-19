import { updateBlogViewesUseCase } from "@/src/core/useCases/blog/updateBlogViewesUseCase";

export const updateBlogViewesController = async (id: string) => {
  const blog = await updateBlogViewesUseCase(id);
  return blog;
};
