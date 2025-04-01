import axios from "axios";
import { AuthResponse, Task, TaskResponse, TasksResponse } from "../types";
import { API_BASE_URL } from "../constants/constants";

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to register");
    }
    throw new Error("Failed to register");
  }
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to login");
    }
    throw new Error("Failed to login");
  }
};

export const getCurrentUser = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get user info");
  }
};

export const getTasks = async (token: string): Promise<TasksResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch tasks");
  }
};

export const createTask = async (
  token: string,
  taskData: Partial<Task>
): Promise<TaskResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, taskData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create task");
  }
};

export const updateTask = async (
  token: string,
  taskId: string,
  taskData: Partial<Task>
): Promise<TaskResponse> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/tasks/${taskId}`,
      taskData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update task");
  }
};

export const completeTask = async (
  token: string,
  taskId: string
): Promise<TaskResponse> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/tasks/${taskId}/complete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to mark task as complete");
  }
};

export const deleteTask = async (token: string, taskId: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete task");
  }
};
