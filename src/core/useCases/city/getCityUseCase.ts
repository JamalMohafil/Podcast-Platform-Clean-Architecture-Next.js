import { cityRepository } from "@/src/infrastructure/repositories/cityRepository";
import { NotFoundError } from "../../domain/errors/commonErrors";

export const getCityUseCase = async (id: string) => {
  const city = await cityRepository.findCity(id);
  if(!city) throw new NotFoundError("City not found");
  return city;
};
