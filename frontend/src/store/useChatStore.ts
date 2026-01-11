import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ChatState {
  messages: ChatMessage[];
  conversationId: string | null;
  // Actions
  setMessages: (fn: (prev: ChatMessage[]) => ChatMessage[]) => void;
  setConversationId: (id: string | null) => void;
  resetChat: () => void;
  initializeChat: (userFirstName: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  conversationId: null,

  setMessages: (fn) => set((state) => ({ messages: fn(state.messages) })),
  
  setConversationId: (id) => set({ conversationId: id }),

  resetChat: () => set({ 
    messages: [], 
    conversationId: null 
  }),

  // FIX: Updated to use your EXACT greeting message
  initializeChat: (userFirstName: string) => {
    if (get().messages.length === 0) {
      set({
        messages: [{
          id: "intro",
          role: "assistant",
          content: `Hi ${userFirstName}, I’m Aurora. Ready to help you manage your tasks.`,
          timestamp: new Date().toISOString(),
        }]
      });
    }
  }
}));