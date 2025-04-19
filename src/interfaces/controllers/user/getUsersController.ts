import {
  NotFoundUser,
  UnauthenticatedError,
} from "@/src/core/domain/errors/AuthErrors";
import { getUsersUseCase } from "@/src/core/useCases/user/GetUsersUseCase";
import { requireAdminAuth } from "../../middlewares/adminAuthMiddleware";
import { User } from "@/src/core/domain/entities/User";
import { requireAuth } from "../../middlewares/authMiddleware";
import { NextRequest, NextResponse } from "next/server";
import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";

export const getUsersController = async (
  limit: number,
  page: number,
  search?: string
) => {
  const users = await getUsersUseCase(limit, page, search);
  return users;
};
