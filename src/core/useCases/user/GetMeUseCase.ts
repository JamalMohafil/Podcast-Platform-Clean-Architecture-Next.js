import { userRepository } from "@/src/infrastructure/repositories/userRepository";
import {
  NotFoundUser,
  UnauthenticatedError,
} from "../../domain/errors/AuthErrors";
import { BaseError } from "../../domain/errors/commonErrors";
import { authRepository } from "@/src/infrastructure/repositories/authRepository";
import { User } from "../../domain/entities/User";
import { cityRepository } from "@/src/infrastructure/repositories/cityRepository";
import { GetMeResult } from "../../dtos/user/UserDto";

export const getMeUseCase = async (id: string): Promise<GetMeResult> => {
  try {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new NotFoundUser();
    }
    const userCity =
      user.city_id &&
      typeof user.city_id === "string" &&
      (await cityRepository.findCity(user.city_id));
    return { ...user, city: userCity ? userCity.name : "" };
  } catch (e: any) {
    throw new BaseError(e.name, e.message, 400);
  }
};
