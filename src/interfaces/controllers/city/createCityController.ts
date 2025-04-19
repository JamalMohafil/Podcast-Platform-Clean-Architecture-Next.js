import { CreateCityDto } from "@/src/core/dtos/city/createCityDto";
import { createCityInputSchema } from "../../validators/city/createCityValidator";
import { InputParseError } from "@/src/core/domain/errors/commonErrors";
import { createCityUseCase } from "@/src/core/useCases/city/createCityUseCase";

export const createCityController = async (data: CreateCityDto) => {
  const parsed = await createCityInputSchema.safeParse(data);
  if (!parsed.success) {
    throw new InputParseError("Invalid data", parsed.error.issues[0].message);
  }

  const city = await createCityUseCase(data);
  return city;
};
