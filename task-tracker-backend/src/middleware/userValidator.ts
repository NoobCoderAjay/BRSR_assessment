import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { ApiError } from "../utils/apiError";

export const validateRegisterInput = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  (req: Request, _res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return next(new ApiError(400, "Validation Error", errorMessages));
    }

    next();
  },
];

export const validateLoginInput = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password").notEmpty().withMessage("Password is required"),

  (req: Request, _res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return next(new ApiError(400, "Validation Error", errorMessages));
    }

    next();
  },
];
