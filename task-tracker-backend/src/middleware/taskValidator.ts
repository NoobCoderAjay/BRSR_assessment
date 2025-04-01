import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { ApiError } from "../utils/apiError";

export const validateTaskInput = [
  body("title").notEmpty().withMessage("Title is required").trim(),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Invalid date format"),

  body("description").optional().trim(),

  body("isCompleted")
    .optional()
    .isBoolean()
    .withMessage("isCompleted must be a boolean value"),

  (req: Request, _res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return next(new ApiError(400, "Validation Error", errorMessages));
    }

    next();
  },
];
