import { Role } from "../../domain/enums/Role";

export type CreateUserDto = {
  name: string;
  email: string;
  role: Role;
  password: string;
  city_id?: string;
  date_of_birth?: Date;
  bio?: string;
  imageUrl?: string;
};
