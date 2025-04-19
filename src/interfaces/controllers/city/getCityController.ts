import { getCityUseCase } from "@/src/core/useCases/city/getCityUseCase";

export const getCityController = async (id: string) => {
    const city = await getCityUseCase(id);
    return city;
};