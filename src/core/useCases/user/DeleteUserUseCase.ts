import { userRepository } from "@/src/infrastructure/repositories/userRepository";

export const deleteUserUseCase = async (id: string) => {
  const result = await userRepository.delete(id);
  console.log(result,'result')
  return result;
};
