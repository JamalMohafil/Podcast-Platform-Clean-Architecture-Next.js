import { UpdateUserDto } from "../../dtos/user/UpdateUserDto";
import { Favorite } from "../entities/Favorite";
import { User } from "../entities/User";

export interface IUserRepository {
  create: ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => Promise<User | null>;
  findById: (id: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  delete: (id: string) => Promise<boolean>;
  checkExists: (email: string) => Promise<boolean>;
  updateResetToken: (
    id: string,
    resetToken: string,
    resetTokenExpiry: Date
  ) => Promise<User | null>;

  update: (id: string, user: UpdateUserDto) => Promise<User | null>;
  findByResetToken: (token: string) => Promise<User | null>;
  getUsers: (
    limit: number,
    page: number,
    search?: string
  ) => Promise<{
    users: User[] | null;
    pagination: {
      total: number;
      hasPrevious: boolean;
      hasMore: boolean;
      currentPage: number;
      limit: number;
      pages: number;
    };
  } | null>;
}
