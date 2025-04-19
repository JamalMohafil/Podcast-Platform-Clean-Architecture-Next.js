import { CreateUserDto } from "@/src/core/dtos/user/CreateUserDto";
import { createUserUseCase } from "@/src/core/useCases/user/CreateUserUseCase";
import {
  createUserInputSchema,
  CreateUserInputType,
} from "../../validators/user/createUserValidator";
import { InputParseError } from "@/src/core/domain/errors/commonErrors";
import { uploadImage } from "@/src/infrastructure/services/fileUploader";
import { Role } from "@/src/core/domain/enums/Role";

export const createUserController = async (data: CreateUserInputType) => {
  const parsed = createUserInputSchema.safeParse(data);
  console.log(data,'adsfbgnhmjn,')
  if (!parsed.success) {
    throw new InputParseError(
      "Invalid data",
      parsed.error.issues[0].message || "Invalid inputs"
    );
  }
  let imageUrl;
  if (data.image) {
    console.log('before')
    imageUrl = await uploadImage(data.image);
    console.log('after')
  }
  const result = {
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role as Role,
    ...(data.city_id && { city_id: data.city_id }),
    ...(data.date_of_birth && { date_of_birth: data.date_of_birth }),

    ...(imageUrl && { imageUrl }),
  };
  console.log(result,'result')
  const user = await createUserUseCase(result);
  return user;
};
