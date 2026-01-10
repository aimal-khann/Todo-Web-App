// Task-related types
export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskStatus = 'pending' | 'completed' | 'archived';

export interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date | null;
  priority: TaskPriority;
  status: TaskStatus;
  tags: string[]; // Store keeps this as an array
}

// User-related types
export interface User {
  id: string;
  email: string;
  fullName: string; // <--- FIXED: Changed from 'name' to 'fullName'
  avatar?: string | null;
  createdAt: Date;
  lastLoginAt?: Date | null;
}

// Dashboard statistics types
export interface DashboardStats {
  tasksDueSoon: number;
  completedToday: number;
  productivityScore: number;
  totalTasks: number;
  completedTasks: number;
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  fullName: string; // <--- FIXED: Changed from 'name' to 'fullName' for consistency
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Form types
export interface TaskFormData {
  title: string;
  description?: string;
  dueDate?: Date | null;
  priority: TaskPriority;
  tags?: string; // <--- ADDED: Form uses a string for input (comma separated)
}

// Chat-related types
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  status?: 'sent' | 'pending' | 'error';
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  userId?: string;
}

export interface AuroraWidgetState {
  isOpen: boolean;
  position?: { x: number; y: number };
  animationState: 'idle' | 'expanding' | 'collapsing' | 'open' | 'closed';
  lastActive: Date;
}
