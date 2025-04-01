import { Schema, model, Document, Types } from "mongoose";

export interface ITask {
  title: string;
  description?: string;
  dueDate: Date;
  isCompleted: boolean;
  user: Types.ObjectId;
  createdAt: Date;
}

export interface ITaskDocument extends ITask, Document {}

const taskSchema = new Schema<ITaskDocument>({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  dueDate: {
    type: Date,
    required: [true, "Due date is required"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Task must belong to a user"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

taskSchema.index({ user: 1, dueDate: 1 });

export const Task = model<ITaskDocument>("Task", taskSchema);
