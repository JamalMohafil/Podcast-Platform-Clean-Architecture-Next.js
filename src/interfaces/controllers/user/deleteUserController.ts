import { NotFoundUser } from "@/src/core/domain/errors/AuthErrors";
import { deleteUserUseCase } from "@/src/core/useCases/user/DeleteUserUseCase";

export const deleteUserController = async (id: string) => {
  const user = await deleteUserUseCase(id);
  if (!user) throw new NotFoundUser();
  return true;
};
