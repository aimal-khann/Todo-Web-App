import { create } from 'zustand';
import { Task, TaskPriority, TaskStatus, User, DashboardStats } from '@/types';
import { apiClient } from '@/lib/api-client';

interface TaskState {
  tasks: Task[];
  user: User | null;
  stats: DashboardStats;
  loading: boolean;
  error: string | null;

  addTask: (taskData: any) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskStatus: (id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
  fetchStats: () => Promise<void>; // New Action
  fetchCurrentUser: () => Promise<void>;
  setUser: (user: User) => void;
  clearUser: () => void;
  setError: (error: string | null) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  user: null,
  stats: {
    tasksDueSoon: 0,
    completedToday: 0,
    productivityScore: 0,
    totalTasks: 0,
    completedTasks: 0,
  },
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.getTasks();
      const tasks = response.data.map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.due_date ? new Date(task.due_date) : null,
        tags: task.tags ? task.tags.split(',') : [],
        createdAt: new Date(task.created_at),
        updatedAt: new Date(task.updated_at),
        userId: task.user_id,
      }));
      set({ tasks, loading: false });
      
      // Fetch stats immediately after tasks
      get().fetchStats(); 
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch tasks', loading: false });
    }
  },

  // --- NEW: Fetch Stats from Backend ---
  fetchStats: async () => {
    try {
      const response = await apiClient.getStats();
      // Map snake_case from backend to camelCase for frontend
      set({
        stats: {
          tasksDueSoon: response.data.tasks_due_soon,
          completedToday: response.data.completed_today,
          productivityScore: response.data.productivity_score,
          totalTasks: response.data.total_tasks,
          completedTasks: response.data.completed_tasks,
        }
      });
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  },

  addTask: async (taskData) => {
    try {
      await apiClient.createTask({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        due_date: taskData.dueDate ? taskData.dueDate.toISOString() : null,
        tags: taskData.tags ? taskData.tags.join(',') : null,
      });
      await get().fetchTasks(); // This will also trigger fetchStats
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateTask: async (id, updates) => {
    try {
      const payload: any = {};

      // Map all fields to snake_case to match SQLModel field names
      if ('title' in updates && updates.title !== undefined) {
        payload.title = updates.title;  // matches Task model field
      }
      if ('description' in updates && updates.description !== undefined) {
        payload.description = updates.description;  // matches Task model field
      }
      if ('status' in updates && updates.status !== undefined) {
        payload.status = updates.status;  // matches Task model field
      }
      if ('priority' in updates && updates.priority !== undefined) {
        payload.priority = updates.priority;  // matches Task model field
      }

      // Handle dueDate conversion to due_date to match Task model field
      if ('dueDate' in updates) {
        const dueDateValue = updates.dueDate;
        if (dueDateValue !== undefined && dueDateValue !== null) {
          if (typeof dueDateValue === 'string' && dueDateValue !== '') {
            // If it's a date string in YYYY-MM-DD format, convert to ISO string
            payload.due_date = new Date(dueDateValue).toISOString();
          } else if (dueDateValue instanceof Date) {
            payload.due_date = dueDateValue.toISOString();
          } else if (typeof dueDateValue === 'object' && dueDateValue !== null) {
            payload.due_date = new Date(dueDateValue).toISOString();
          }
        } else {
          // Send null to clear the due date
          payload.due_date = null;
        }
      }

      // Handle tags conversion to match Task model field
      if ('tags' in updates && updates.tags !== undefined) {
        if (Array.isArray(updates.tags)) {
          payload.tags = updates.tags.join(',');
        } else {
          payload.tags = updates.tags;
        }
      }

      console.log('Updating task with payload:', payload); // Debug log
      await apiClient.updateTask(id, payload);
      console.log('Task updated successfully, fetching tasks...');
      await get().fetchTasks();
      console.log('Tasks fetched successfully');
    } catch (error: any) {
      console.error('Error updating task:', error); // Debug log
      get().setError(error.message);
    }
  },

  deleteTask: async (id) => {
    try {
      await apiClient.deleteTask(id);
      await get().fetchTasks();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  toggleTaskStatus: async (id) => {
    try {
      const currentTask = get().tasks.find(task => task.id === id);
      if (!currentTask) return;

      const newStatus = currentTask.status === 'completed' ? 'pending' : 'completed';
      await apiClient.updateTask(id, { status: newStatus });
      await get().fetchTasks();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  fetchCurrentUser: async () => {
    try {
      const response = await apiClient.getCurrentUser();
      set({ 
        user: {
          id: response.data.id,
          email: response.data.email,
          fullName: response.data.full_name,
          createdAt: new Date(response.data.created_at),
        } 
      });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  setError: (error) => set({ error }),
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));