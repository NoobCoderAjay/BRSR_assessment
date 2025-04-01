import React from "react";
import { TaskItemProps } from "../../types";

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onComplete,
  onEdit,
  onDelete,
}) => {
  const formattedDueDate = new Date(task.dueDate).toLocaleDateString();

  const handleComplete = async () => {
    try {
      await onComplete(task._id);
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await onDelete(task._id);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div
      className={`bg-white p-4 rounded shadow-md ${
        task.isCompleted ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3
            className={`font-semibold text-lg ${
              task.isCompleted ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="text-gray-600 mt-1">{task.description}</p>
          )}

          <div className="mt-2 text-sm text-gray-500">
            Due: {formattedDueDate}
          </div>
        </div>

        <div className="flex space-x-2">
          {!task.isCompleted && (
            <>
              <button
                onClick={() => onEdit(task)}
                className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={handleComplete}
                className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
              >
                Complete
              </button>
            </>
          )}
          <button
            onClick={handleDelete}
            className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
