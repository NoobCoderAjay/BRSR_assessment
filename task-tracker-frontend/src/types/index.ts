export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate: string;
  isCompleted: boolean;
  user: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface TasksResponse {
  success: boolean;
  count: number;
  tasks: Task[];
}

export interface TaskResponse {
  success: boolean;
  task: Task;
}

export interface TaskFormProps {
  initialData?: Partial<Task>;
  onSubmit: (data: Partial<Task>) => Promise<void>;
  onCancel: () => void;
}

export interface TaskItemProps {
  task: Task;
  onComplete: (taskId: string) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => Promise<void>;
}
