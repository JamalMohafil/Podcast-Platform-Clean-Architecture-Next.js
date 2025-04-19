import { cityRepository } from "@/src/infrastructure/repositories/cityRepository";
import { CreateCityDto } from "../../dtos/city/createCityDto";

export const createCityUseCase = async (data: CreateCityDto) => {
  const city = await cityRepository.create(data);
  return city;
};
