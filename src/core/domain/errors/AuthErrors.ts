import { BaseError, NotFoundError } from "./commonErrors";

export class AuthenticatedError extends BaseError {
  constructor(message: string, options?: ErrorOptions) {
    super("User Already Authenticated", message, 400, options);
  }
}

export class UnauthenticatedError extends BaseError {
  constructor(
    message: string = "User Not Authenticated",
    options?: ErrorOptions
  ) {
    super("Unauthenticated User", message, 401, options);
  }
}
export class UnauthorizedError extends BaseError {
  constructor(message: string = "User Not Authorized", options?: ErrorOptions) {
    super("Unauthorized User", message, 403, options);
  }
}
export class NotFoundUser extends NotFoundError {
  constructor(message: string = "User Not Found") {
    super(message);
  }
}

export class AlreadyExistsError extends BaseError {
  constructor(
    message: string = "This user already exists",
    options?: ErrorOptions
  ) {
    super("Already Exists", message, 400, options);
  }
}

export class InvalidCredentialsError extends BaseError {
  constructor(
    message: string = "Credentials are invalid",
    options?: ErrorOptions
  ) {
    super("Invalid Credentials", message, 400, options);
  }
}
