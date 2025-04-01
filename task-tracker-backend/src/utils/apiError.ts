export class ApiError extends Error {
  statusCode: number;
  errors?: string[];

  constructor(statusCode: number, message: string, errors?: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
