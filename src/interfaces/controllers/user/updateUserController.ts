import {
  NotFoundUser,
  UnauthorizedError,
} from "@/src/core/domain/errors/AuthErrors";
import {
  BaseError,
  InputParseError,
  UnexpectedError,
} from "@/src/core/domain/errors/commonErrors";
import { updateUserUseCase } from "@/src/core/useCases/user/UpdateUserUseCase";
import {
  updateUserInputSchema,
  UpdateUserInputType,
} from "../../validators/user/updateUserValidator";
import { userRepository } from "@/src/infrastructure/repositories/userRepository";
import { UserPayload } from "@/src/core/domain/services/jwtServiceInterface";
import { UpdateUserDto } from "@/src/core/dtos/user/UpdateUserDto";
import { EmailExistsError } from "@/src/core/domain/errors/EmailErrors";
import { uploadImage } from "@/src/infrastructure/services/fileUploader";
import { Role } from "@/src/core/domain/enums/Role";

export const updateUserController = async (
  id: string,
  data: UpdateUserInputType,
  user: UserPayload
) => {
  // 🧪 التحقق من صحة البيانات
  const parsed = updateUserInputSchema.safeParse(data);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message || "Invalid input";
    throw new InputParseError("Invalid data", message);
  }

  // 🛡️ التحقق من الصلاحيات
  if (!id) throw new NotFoundUser();
  if (user.id !== id && user.role !== "ADMIN") throw new UnauthorizedError();

  let imageUrl;
  if (data.image) {
    imageUrl = await uploadImage(data.image);
  } 
  const result = {
    ...(data.name && { name: data.name }),
    ...(data.email && { email: data.email }),
    ...(data.password && { password: data.password }),
    ...(data.role && { role: data.role as Role }),
    ...(data.city_id && { city_id: data.city_id }),
    ...(data.date_of_birth && { date_of_birth: data.date_of_birth }),

    ...(data.bio && { bio: data.bio }),
    ...(imageUrl && { imageUrl }),
  };

  const updatedUser = await updateUserUseCase(id, result);
  if (!updatedUser) throw new UnexpectedError();

  return updatedUser;
};
