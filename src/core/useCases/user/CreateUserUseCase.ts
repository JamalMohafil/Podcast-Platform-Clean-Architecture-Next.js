import { userRepository } from "@/src/infrastructure/repositories/userRepository";
import { CreateUserDto } from "../../dtos/user/CreateUserDto";
import { AlreadyExistsError } from "../../domain/errors/AuthErrors";
import { hashPassword } from "@/src/infrastructure/services/passwordService";
import { EmailExistsError } from "../../domain/errors/EmailErrors";

export const createUserUseCase = async (data: CreateUserDto) => {
  const existingUser = await userRepository.findByEmail(data.email);
  console.log(data,'adsfgbh')
  if (existingUser) throw new AlreadyExistsError();

  const hashedPassword = await hashPassword(data.password);
  data.password = hashedPassword;
  return await userRepository.create(data);
};
