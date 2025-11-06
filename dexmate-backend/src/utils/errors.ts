export class AppError extends Error {
  constructor(message: string, public statusCode: number = 500, public code?: string, public details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 400, "VALIDATION_ERROR", { field });
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, "NOT_FOUND");
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, "CONFLICT");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = "Database operation failed", cause?: unknown) {
    super(message, 500, "DATABASE_ERROR", { cause });
  }
}

export class InvalidAction extends AppError {
  constructor(message: string = "Action not allowed"){
    super(message, 400, "INVALID_ACTION")
  }
}