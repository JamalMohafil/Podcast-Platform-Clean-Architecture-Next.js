import { getBlogUseCase } from "@/src/core/useCases/blog/getBlogUseCase";

export const getBlogController = async (id: string) => {
  const blog = await getBlogUseCase(id);
  return blog;
};
