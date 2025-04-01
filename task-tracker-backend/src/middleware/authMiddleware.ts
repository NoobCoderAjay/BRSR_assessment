import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { ApiError } from "../utils/apiError";
import config from "../config";
import { DecodedToken } from "../interface/interface";

export const protect = async (
  req: any,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    let token: string | undefined;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new ApiError(401, "Not authorized to access this route");
    }

    try {
      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as DecodedToken;

      const user = await User.findById(decoded.id);
      if (!user) {
        throw new ApiError(401, "User no longer exists");
      }

      req.user = { id: decoded.id };
      next();
    } catch (error) {
      throw new ApiError(401, "Not authorized to access this route");
    }
  } catch (error) {
    next(error);
  }
};
