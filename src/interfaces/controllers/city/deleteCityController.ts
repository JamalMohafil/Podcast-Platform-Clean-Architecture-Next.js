import { deleteCityUseCase } from "@/src/core/useCases/city/deleteCityUseCase";

export const deleteCityController = async (id: string) => {
  const city = await deleteCityUseCase(id);
  return city;
};
