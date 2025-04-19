import { BaseError } from "./commonErrors";

 
export class ShortPasswordError extends BaseError {
  constructor(
    name: string = "Short Password",
    message: string = "Your password is too short",
    options?: ErrorOptions
  ) {
    super(name, message, 401, options);
  }
}

export class InvalidPasswordError extends BaseError {
  constructor(
    name: string = "Invalid Password",
    message: string = "Your password is invalid",
    options?: ErrorOptions
  ) {
    super(name, message, 401, options);
  }
}

