import { userRepository } from "@/src/infrastructure/repositories/userRepository";
import { UpdateUserDto } from "../../dtos/user/UpdateUserDto";
import { NotFoundUser } from "../../domain/errors/AuthErrors";
import { EmailExistsError } from "../../domain/errors/EmailErrors";

export const updateUserUseCase = async (id: string, data: UpdateUserDto) => {
  const existingUser = await userRepository.findById(id);
  if (!existingUser) throw new NotFoundUser();
  if (data.email) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser && existingUser.id !== id) {
      throw new EmailExistsError();
    }
  }
  return await userRepository.update(id, data);
};
