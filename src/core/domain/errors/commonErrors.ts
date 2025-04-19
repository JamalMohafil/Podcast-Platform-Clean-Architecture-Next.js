export class BaseError extends Error {
  public readonly statusCode: number;
  constructor(
    name: string,
    message: string,
    statusCode: number = 500,
    options?: ErrorOptions
  ) {
    super(message, options);
    this.statusCode = statusCode;
    this.name = name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string = "Not Found") {
    super("Not Found", message, 404);
  }
}

export class InputParseError extends BaseError {
  constructor(
    name: string = "Input Parse Error",
    message: string = "Input Parse Error",
    options?: ErrorOptions
  ) {
    super(name, message, 400, options);
  }
}
export class UnexpectedError extends BaseError {
  constructor(
    name: string = "Unexpected Error",
    message: string = "Unexpected Error",
    options?: ErrorOptions
  ) {
    super(name, message, 500, options);
  }
}