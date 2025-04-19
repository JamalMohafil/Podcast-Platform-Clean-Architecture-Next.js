import { cityRepository } from "@/src/infrastructure/repositories/cityRepository";
import { UpdateCityDto } from "../../dtos/city/updateCityDto";
import { NotFoundError } from "../../domain/errors/commonErrors";

export const updateCityUseCase = async (id: string, data: UpdateCityDto) => {
  const existingCity = await cityRepository.findCity(id);
  if (!existingCity) throw new NotFoundError("City not found");
  const city = await cityRepository.update(id, data);

  return city;
};
