import { Router } from "express";
import * as authController from "../controllers/authController";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/userValidator";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", validateRegisterInput, authController.register);
router.post("/login", validateLoginInput, authController.login);
router.get("/me", protect, authController.getCurrentUser);

export default router;
