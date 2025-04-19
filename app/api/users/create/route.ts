import { Role } from "@/src/core/domain/enums/Role";
import { AuthenticatedRequest } from "@/src/core/domain/services/jwtServiceInterface";
import { CreateUserDto } from "@/src/core/dtos/user/CreateUserDto";
import { createUserController } from "@/src/interfaces/controllers/user/createUserController";
import { requireAdminAuth } from "@/src/interfaces/middlewares/adminAuthMiddleware";
import { requireAuth } from "@/src/interfaces/middlewares/authMiddleware";
import { NextResponse } from "next/server";

export const POST = requireAdminAuth(async (req: AuthenticatedRequest) => {
  try {
    const body = await req.formData();
    // We should get name , image, bio , password , email , role, city_id, date_of_birth
    const name = body.get("name") as string;
    const image = body.get("image") as File;
    const bio = body.get("bio") as string;
    const password = body.get("password") as string;
    const email = body.get("email") as string;
    const role = body.get("role") as string as Role;
    const city_id = body.get("city_id") as string;
    const date_of_birth = body.get("date_of_birth") as unknown as Date;
    const result = {
      name,
      email,
      password,
      role: role as Role,

      ...(city_id && { city_id }),
      ...(date_of_birth && { date_of_birth: date_of_birth as Date }),
      ...(bio && { bio }),
      ...(image && { image: image as File }),
    };
    const userInformation = await createUserController(result);

    return NextResponse.json({
      success: true,
      user: userInformation,
      message: "User created successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.statusCode | 500 }
    );
  }
});
