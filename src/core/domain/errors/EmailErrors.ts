import { BaseError } from "./commonErrors";

 
export class InvalidEmailError extends BaseError {
  constructor(
    name: string = "Invalid Email",
    message: string = "Your email is invalid",
    options?: ErrorOptions
  ) {
    super(name, message, 401, options);
  }
}

export class EmailExistsError extends BaseError {
  constructor(
    name: string = "Email Already Exists",
    message: string = "Your email already exists",
    options?: ErrorOptions
  ) {
    super(name, message, 401, options);
  }
}
 