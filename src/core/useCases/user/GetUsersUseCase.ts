import { userRepository } from "@/src/infrastructure/repositories/userRepository";

export const getUsersUseCase = async (
  limit: number,
  page: number,
  search?: string
) => {
  const users = await userRepository.getUsers(limit, page, search || "");
  return users;
};
