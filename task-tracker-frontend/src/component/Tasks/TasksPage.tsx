import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import * as api from "../../services/api";
import { Task } from "../../types";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

const TasksPage: React.FC = () => {
  const { token, user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(
    () => {
      if (token) {
        fetchTasks();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token]
  );

  const fetchTasks = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await api.getTasks(token);
      setTasks(response.tasks);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to fetch tasks");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: Partial<Task>) => {
    if (!token) return;

    try {
      await api.createTask(token, taskData);
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateTask = async (taskData: Partial<Task>) => {
    if (!token || !editingTask) return;

    try {
      await api.updateTask(token, editingTask._id, taskData);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      throw error;
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    if (!token) return;

    try {
      await api.completeTask(token, taskId);
      fetchTasks();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!token) return;

    try {
      await api.deleteTask(token, taskId);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Task Tracker</h1>
          {user && (
            <div className="flex items-center">
              <span className="mr-4">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Your Tasks</h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add New Task
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-100 p-4 rounded text-red-700 mb-6">
            {error}
          </div>
        )}

        {showForm && (
          <div className="mb-6">
            <TaskForm
              initialData={editingTask || undefined}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {loading ? (
          <div className="text-center py-10">
            <p>Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded shadow-md p-6 text-center">
            <p>You don't have any tasks yet. Add a new task to get started!</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onComplete={handleCompleteTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TasksPage;
