import { City } from "../entities/City";

export interface ICityRepository {
  create: ({ name }: { name: string }) => Promise<City | null>;
  delete: (id: string) => Promise<boolean>;
  update: (id: string, city: Partial<City>) => Promise<City | null>;
  getCities: () => Promise<City[] | null>;
  findCity: (id: string) => Promise<City | null>;
}
