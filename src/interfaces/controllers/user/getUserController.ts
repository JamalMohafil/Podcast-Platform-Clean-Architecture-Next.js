import { NotFoundUser } from "@/src/core/domain/errors/AuthErrors";
import { getUserUseCase } from "@/src/core/useCases/user/GetUserUseCase";

export const getUserController = async (id: string) => {
  const user = await getUserUseCase(id);
  return user;
};
