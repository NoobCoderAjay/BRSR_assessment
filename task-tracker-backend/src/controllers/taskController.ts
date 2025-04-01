import { Response, NextFunction } from "express";
import { Task } from "../models/taskModel";
import { ApiError } from "../utils/apiError";

export const getAllTasks = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ dueDate: 1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Add user ID to task data
    const taskData = { ...req.body, user: req.user.id };

    const newTask = await Task.create(taskData);
    res.status(201).json({
      success: true,
      task: newTask,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const completeTask = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isCompleted: true },
      { new: true, runValidators: true }
    );

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// Delete task (only if it belongs to the current user)
export const deleteTask = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
