import { BaseError } from "./commonErrors";

 
export class ExpiredTokenError extends BaseError {
  constructor(
    name: string = "Token Expired",
    message: string = "Your token has expired",
    options?: ErrorOptions
  ) {
    super(name, message, 401, options);
  }
}

export class InvalidTokenError extends BaseError {
  constructor(
    name: string = "Invalid Token",
    message: string = "Your token is invalid",
    options?: ErrorOptions
  ) {
    super(name, message, 401, options);
  }
}

    