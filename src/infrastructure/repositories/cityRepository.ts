// src/infrastructure/repositories/cityRepository.ts
 import { ICityRepository } from "../../core/domain/repositories/ICityRepository";
import { City } from "../../core/domain/entities/City";
import { UpdateUserDto } from "@/src/core/dtos/user/UpdateUserDto";
import { CreateCityDto } from "@/src/core/dtos/city/createCityDto";
import prisma from "../database/prisma";
 

export const cityRepository: ICityRepository = {
  create: async ({ name }: CreateCityDto): Promise<City | null> => {
    try {
      const city = await prisma.city.create({
        data: {
          name,
        },
      });
      return city;
    } catch (error) {
      console.error("Error creating city:", error);
      return null;
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      await prisma.city.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error("Error deleting city:", error);
      return false;
    }
  },

  update: async (id: string, { name }: UpdateUserDto): Promise<City | null> => {
    try {
      const updatedCity = await prisma.city.update({
        where: { id },
        data: { name },
      });
      return updatedCity;
    } catch (error) {
      console.error("Error updating city:", error);
      return null;
    }
  },

  getCities: async (): Promise<City[] | null> => {
    try {
      const cities = await prisma.city.findMany({
        include: {
          _count: {
            select: {
              users: true,
            },
          },
        },
      });
      return cities;
    } catch (error) {
      console.error("Error fetching cities:", error);
      return null;
    }
  },

  findCity: async (id: string): Promise<City | null> => {
    try {
      const city = await prisma.city.findUnique({
        where: { id },
      });
      return city;
    } catch (error) {
      console.error("Error finding city:", error);
      return null;
    }
  },
};
