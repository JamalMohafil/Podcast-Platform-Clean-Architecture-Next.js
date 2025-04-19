import { cityRepository } from "@/src/infrastructure/repositories/cityRepository";
import { NotFoundError } from "../../domain/errors/commonErrors";

export const deleteCityUseCase = async (id: string) => {
  const existingCity = await cityRepository.findCity(id);
  if (!existingCity) throw new NotFoundError("City not found");
  const city = await cityRepository.delete(id);
  return city;
};
