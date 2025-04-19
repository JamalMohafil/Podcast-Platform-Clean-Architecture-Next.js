import { InputParseError } from "@/src/core/domain/errors/commonErrors";
import { UpdateCityDto } from "@/src/core/dtos/city/updateCityDto";
import { updateCityUseCase } from "@/src/core/useCases/city/updateCityUseCase";
import { updateCityInputSchema } from "../../validators/city/updateCityValidator";
import { User } from "@/src/core/domain/entities/User";
import { UserPayload } from "@/src/core/domain/services/jwtServiceInterface";
import { UnauthorizedError } from "@/src/core/domain/errors/AuthErrors";


export const updateCityController = async (
  id: string,
  data: UpdateCityDto,
  user: UserPayload
) => {
  const parsed = await updateCityInputSchema.safeParse(data);
  if (!parsed.success) {
    throw new InputParseError("Invalid data", parsed.error.issues[0].message);
  }
  if (user.id !== id && user.role !== "ADMIN") throw new UnauthorizedError();

  const city = await updateCityUseCase(id, data);
  return city;
};
