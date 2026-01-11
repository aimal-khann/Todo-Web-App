import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://phase-3-backend-production.up.railway.app/api/v1';

// Define types locally to avoid import issues
type AxiosInstance = any;
type AxiosRequestConfig = any;
type AxiosResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
};

// --- NEW INTERFACE FOR AGENT ---
export interface ChatResponse {
  response: string;
  conversation_id: string;
  user_id: string;
  tool_calls_executed: boolean;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000, // Increased timeout for AI (OpenAI can be slow)
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to inject JWT token
    this.client.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('access_token');
        if (token && config.headers) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token expiration
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: any) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          // window.location.href = '/login'; 
        }
        return Promise.reject(error);
      }
    );
  }

  // --- AUTH METHODS ---
  register = (email: string, password: string, fullName: string) => {
    return this.client.post('/auth/register', { email, password, full_name: fullName });
  };

  login = (email: string, password: string) => {
    return this.client.post('/auth/login', { email, password });
  };

  loginTyped = async (email: string, password: string): Promise<{ data: { access_token: string; token_type: string } }> => {
    const response = await this.client.post('/auth/login', { email, password });
    return response as { data: { access_token: string; token_type: string } };
  };

  registerTyped = async (email: string, password: string, fullName: string): Promise<{ data: { access_token: string; token_type: string } }> => {
    const response = await this.client.post('/auth/login', { email, password }); 
    return response as { data: { access_token: string; token_type: string } };
  };

  getCurrentUser = () => {
    return this.client.get('/auth/me');
  };

  // --- TASK METHODS ---
  getTasks = () => {
    return this.client.get('/tasks/');
  };

  getStats = () => {
    return this.client.get('/tasks/stats');
  };

  createTask = (taskData: { 
    title: string; 
    description?: string; 
    status?: string; 
    priority?: string; 
    due_date?: string | null; 
    tags?: string | null 
  }) => {
    return this.client.post('/tasks/', taskData);
  };

  updateTask = (id: string, taskData: { 
    title?: string; 
    description?: string; 
    status?: string; 
    priority?: string; 
    due_date?: string | null; 
    tags?: string | null 
  }) => {
    return this.client.put(`/tasks/${id}`, taskData);
  };

  deleteTask = (id: string) => {
    return this.client.delete(`/tasks/${id}`);
  };

  // --- NEW AGENT METHOD ---
  // This uses the shared axios instance, so it sends the Token automatically!
  chat = async (message: string, userId: string, conversationId?: string | null): Promise<ChatResponse> => {
    const response = await this.client.post('/chat', {
      message,
      user_id: userId,
      conversation_id: conversationId
    });
    return response.data;
  };

  // --- CONVERSATION HISTORY METHODS ---
  getConversations = async (userId: string) => {
    const response = await this.client.get(`/conversations`, {
      params: { user_id: userId }
    });
    return response.data;
  };

  getConversationDetail = async (conversationId: string, userId: string) => {
    const response = await this.client.get(`/conversations/${conversationId}`, {
      params: { user_id: userId }
    });
    return response.data;
  };

  deleteConversation = async (conversationId: string, userId: string) => {
    const response = await this.client.delete(`/conversations/${conversationId}`, {
      params: { user_id: userId }
    });
    return response.data;
  };
}

export const apiClient = new ApiClient();
export default ApiClient;
