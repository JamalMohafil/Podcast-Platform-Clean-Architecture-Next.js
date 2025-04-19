import { comparePassword } from "@/src/infrastructure/services/passwordService";
import { Role } from "../enums/Role";

import { UserPayload } from "../services/jwtServiceInterface";
export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: Role,
    private password?: string,
    public date_of_birth?: Date,
    private resetToken?: string,
    private resetTokenExpiry?: Date,
    public imageUrl?: string,
    public bio?: string,
    public city_id?: string,
    public created_at?: Date,
    public updated_at?: Date
  ) {}

  isResetTokenValid(token: string) {
    return (
      this.resetTokenExpiry && this.resetTokenExpiry.getTime() > Date.now()
    );
  }
  changePassword(newPassword: string) {
    return (this.password = newPassword);
  }

  toPayload(): UserPayload {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
    };
  }
  updateResetToken(resetToken: string, resetTokenExpiry: Date) {
    this.resetToken = resetToken;
    this.resetTokenExpiry = resetTokenExpiry;
  }
  async verifyPassword(password: string) {
    if (!this.password) return false;
    return await comparePassword(password, this.password);
  }
}
