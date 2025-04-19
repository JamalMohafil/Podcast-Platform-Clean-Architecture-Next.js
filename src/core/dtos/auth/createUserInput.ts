export type createUserInput = {
  name: string;
  email: string;
  password: string;
  role: string;
  city_id?: string;
  date_of_birth?: Date;
  bio?: string;
  imageUrl?: string;
};
