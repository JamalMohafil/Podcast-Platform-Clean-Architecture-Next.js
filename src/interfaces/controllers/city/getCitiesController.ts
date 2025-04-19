import { getCitiesUseCase } from "@/src/core/useCases/city/getCitiesUseCase";

export const getCitiesController = async () => {
    const cities = await getCitiesUseCase();
    return cities;
};