import { getMeUseCase } from "@/src/core/useCases/user/GetMeUseCase";
import { requireAuth } from "../../middlewares/authMiddleware";
import { NextResponse } from "next/server";
import {
  NotFoundUser,
  UnauthenticatedError,
} from "@/src/core/domain/errors/AuthErrors";

export const getMeController = async (userId: string) => {
  if (!userId) throw new UnauthenticatedError();
  const user = await getMeUseCase(userId);
  if (!user) throw new NotFoundUser();
  return user;
};
