import { userRepository } from "@/src/infrastructure/repositories/userRepository";
import { User } from "../../domain/entities/User";
import { NotFoundUser } from "../../domain/errors/AuthErrors";
import { UserDto } from "../../dtos/user/UserDto";
import { cityRepository } from "@/src/infrastructure/repositories/cityRepository";

export const getUserUseCase = async (id: string): Promise<UserDto> => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new NotFoundUser();
  }
  const userCity =
    user.city_id &&
    typeof user.city_id === "string" &&
    (await cityRepository.findCity(user.city_id));
  return {
    name: user.name,
    bio: user.bio || "",
    city: userCity ? userCity.name : "",
    imageUrl: user.imageUrl || "",
    date_of_birth: user.date_of_birth ,
  };
};
