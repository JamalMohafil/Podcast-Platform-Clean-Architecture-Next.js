import { deleteBlogUseCase } from "@/src/core/useCases/blog/deleteBlogUseCase";

export const deleteBlogController = async (id: string) => {
    const blog = await deleteBlogUseCase(id);
    return blog;
};