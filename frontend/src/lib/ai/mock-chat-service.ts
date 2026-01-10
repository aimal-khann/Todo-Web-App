import { ChatMessage } from '@/types';

// Mock AI responses based on user input
const MOCK_RESPONSES: Record<string, string> = {
  'hello': 'Hello! I\'m Aurora AI. How can I help you with your tasks today?',
  'hi': 'Hi there! What would you like to know about your tasks?',
  'help': 'I can help you manage your tasks! You can ask me to summarize your tasks, check due dates, or suggest priorities.',
  'tasks': 'I can see you have several tasks. Would you like me to summarize them or help prioritize them?',
  'due': 'Several of your tasks are coming up soon. The most urgent one is "Complete project proposal" which is due tomorrow.',
  'default': 'I\'m Aurora AI, your task management assistant. I can help you organize your tasks, set priorities, and manage deadlines. What would you like to know?'
};

// Simulate network delay
const simulateDelay = (min: number, max: number): Promise<void> => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

export interface ChatRequest {
  message: string;
  sessionId?: string;
  context?: {
    tasks?: any[];
    stats?: any;
  };
}

export interface ChatResponse {
  id: string;
  content: string;
  sender: 'ai';
  timestamp: Date;
  sessionId: string;
}

class MockChatService {
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    // Simulate network delay between 300-800ms
    await simulateDelay(300, 800);

    // Determine response based on user input
    let responseContent = '';
    const lowerCaseMessage = request.message.toLowerCase();

    for (const [key, value] of Object.entries(MOCK_RESPONSES)) {
      if (lowerCaseMessage.includes(key)) {
        responseContent = value;
        break;
      }
    }

    if (!responseContent) {
      responseContent = MOCK_RESPONSES['default'];
    }

    // If context includes tasks, include relevant information in response
    if (request.context?.tasks && request.context.tasks.length > 0) {
      const taskSummary = this.summarizeTasks(request.context.tasks);
      if (lowerCaseMessage.includes('task') || lowerCaseMessage.includes('help')) {
        responseContent += ` ${taskSummary}`;
      }
    }

    return {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      content: responseContent,
      sender: 'ai',
      timestamp: new Date(),
      sessionId: request.sessionId || this.sessionId
    };
  }

  private summarizeTasks(tasks: any[]): string {
    const pendingTasks = tasks.filter((task: any) => task.status === 'pending');
    const dueSoonTasks = tasks.filter((task: any) => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      const timeDiff = dueDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysDiff <= 3 && daysDiff >= 0; // Due in 3 days or less
    });

    if (pendingTasks.length === 0) {
      return 'You have no pending tasks right now.';
    }

    if (dueSoonTasks.length === 0) {
      return `You have ${pendingTasks.length} pending task(s).`;
    }

    return `You have ${pendingTasks.length} pending task(s), with ${dueSoonTasks.length} due soon. The most urgent is "${dueSoonTasks[0]?.title || 'a task'}".`;
  }

  public async getMessages(sessionId: string): Promise<ChatMessage[]> {
    // Simulate network delay
    await simulateDelay(200, 400);

    // Return empty array for now - in a real implementation, this would return stored messages
    return [];
  }

  public async createSession(): Promise<string> {
    this.sessionId = this.generateSessionId();
    return this.sessionId;
  }

  public getCurrentSessionId(): string {
    return this.sessionId;
  }
}

export const mockChatService = new MockChatService();