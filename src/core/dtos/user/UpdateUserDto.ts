import { Role } from "../../domain/enums/Role";

export type UpdateUserDto = {
  name?: string;
  email?: string;
  role?: Role;
  password?: string;

  city_id?: string;
  date_of_birth?: Date;

  bio?: string;
  imageUrl?: string;
};
