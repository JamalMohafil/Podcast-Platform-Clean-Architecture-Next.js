export type UserDto = {
  name: string;
  bio?: string;
  city?: string;

  imageUrl?: string;
  date_of_birth?: Date;
};

export type GetMeResult = {
  id: string;
  name: string;
  email: string;
  role: string;
  city?: string;
  date_of_birth?: Date;
  bio?: string;
  imageUrl?: string;
  city_id?: string;
  created_at?: Date;
  updated_at?: Date;
};
