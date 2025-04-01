import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";
import { ApiError } from "../utils/apiError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User with this email already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = user.generateAuthToken();

    user.password = undefined as any;

    res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Please provide email and password");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    const token = user.generateAuthToken();

    user.password = undefined as any;

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req?.user.id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
