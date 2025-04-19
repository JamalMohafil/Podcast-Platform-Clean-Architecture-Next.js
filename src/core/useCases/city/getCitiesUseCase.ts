import { cityRepository } from "@/src/infrastructure/repositories/cityRepository";

export const getCitiesUseCase = async () => {
  const cities = await cityRepository.getCities();
  return cities;
};
