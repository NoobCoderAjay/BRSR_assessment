import { Router } from "express";
import * as taskController from "../controllers/taskController";
import { validateTaskInput } from "../middleware/taskValidator";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router
  .route("/")
  .get(taskController.getAllTasks)
  .post(validateTaskInput, taskController.createTask);

router
  .route("/:id")
  .get(taskController.getTaskById)
  .put(validateTaskInput, taskController.updateTask)
  .delete(taskController.deleteTask);

router.route("/:id/complete").put(taskController.completeTask);

export default router;
