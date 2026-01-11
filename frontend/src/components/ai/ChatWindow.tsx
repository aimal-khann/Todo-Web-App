"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, User, RefreshCw, ChevronRight, History, X, Sparkles, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useTaskStore } from "@/store/useTaskStore";
import { useChatStore } from "@/store/useChatStore"; // <--- IMPORT THE NEW STORE
import { apiClient } from "@/lib/api-client";

// Import types from store to avoid duplication
import type { ChatMessage, Conversation } from "@/store/useChatStore";

export default function ChatWindow({ onClose }: { onClose: () => void }) {
  const { user, fetchTasks } = useTaskStore();
  // Use Global Store instead of local state
  const { messages, conversationId, setMessages, setConversationId, resetChat, initializeChat } = useChatStore();
  
  const activeUserId = user?.id || "11111111-1111-1111-1111-111111111111";

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat ONCE when component mounts (if empty)
  useEffect(() => {
    const firstName = user?.fullName?.split(' ')[0] || "there";
    initializeChat(firstName);
  }, [user, initializeChat]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Load conversation history
  useEffect(() => {
    if (showHistory) {
      loadConversations();
    }
  }, [showHistory]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 60)}px`;
    }
  }, [input]);

  const handleNewChat = () => {
    resetChat(); // Resets global store
    initializeChat(user?.fullName?.split(' ')[0] || "there");
    setConversationId(null);
    setShowHistory(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const data = await apiClient.chat(userMsg.content, activeUserId, conversationId);

      if (data.conversation_id) {
        setConversationId(data.conversation_id);
      }

      const aiMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);

      if (data.tool_calls_executed) {
        console.log("Agent executed tools. Refreshing data...");
        fetchTasks();
      }

    } catch (error: any) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: `**Error:** ${error.message || "Could not connect to the Neural Backend."}`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const loadConversations = async () => {
    if (!activeUserId) return;
    setLoadingHistory(true);
    try {
      const response = await apiClient.getConversations(activeUserId);
      setConversations(response);
    } catch (error) {
      console.error("Failed to load conversations:", error);
      setConversations([]);
    } finally {
      setLoadingHistory(false);
    }
  };

  const loadConversation = async (convId: string) => {
    if (!activeUserId) return;
    try {
      const response = await apiClient.getConversationDetail(convId, activeUserId);
      const conversationMessages = response.messages.map((msg: any) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp
      }));
      // Update GLOBAL Store
      setMessages(() => conversationMessages);
      setConversationId(convId);
      setShowHistory(false);
    } catch (error) {
      console.error("Failed to load conversation:", error);
    }
  };

  const deleteConversation = async (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeUserId) return;
    if (window.confirm("Delete conversation?")) {
      try {
        await apiClient.deleteConversation(convId, activeUserId);
        setConversations(prev => prev.filter(conv => conv.id !== convId));
        if (conversationId === convId) handleNewChat();
      } catch (error) {
        console.error("Failed to delete conversation:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full relative z-10 text-white font-sans">
      <div className="flex-1 flex overflow-hidden">
        {/* History Sidebar - ANIMATED */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              // Spring transition for snappier sidebar movement
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex flex-col bg-[#020204]/80 backdrop-blur-xl border-r border-white/10 min-w-[240px] w-60 z-30"
            >
              <div className="p-4 flex justify-between items-center border-b border-white/5">
                <h3 className="font-medium text-white flex items-center text-sm">
                  <History className="mr-2 text-indigo-400" size={16} /> History
                </h3>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowHistory(false)} 
                  className="p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white"
                >
                  <X size={16} />
                </motion.button>
              </div>
              <div className="flex-1 overflow-y-auto p-2 [-webkit-scrollbar:none] [scrollbar-width:none] [-ms-overflow-style:none]">
                {loadingHistory ? (
                  <div className="text-center text-gray-500 text-xs p-4">Loading history...</div>
                ) : (
                  <>
                    {conversations.map((item) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={item.id} 
                        onClick={() => loadConversation(item.id)} 
                        className="p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors mb-1 flex justify-between items-start group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-gray-200 truncate group-hover:text-white transition-colors">{item.title}</div>
                          <div className="text-[10px] text-gray-500">{new Date(item.updated_at).toLocaleDateString()}</div>
                        </div>
                        <button onClick={(e) => deleteConversation(item.id, e)} className="ml-2 p-1 rounded hover:bg-red-500/20 text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                          <X size={12} />
                        </button>
                      </motion.div>
                    ))}
                    {conversations.length === 0 && <div className="text-center text-gray-600 text-xs p-4">No history yet</div>}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${showHistory ? 'ml-0' : ''}`}>
          {/* Header */}
          <div className="h-16 px-6 flex items-center justify-between bg-white/[0.02] backdrop-blur-md relative z-20 border-b border-white/5">
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20"
              >
                <Bot size={16} className="text-white" />
              </motion.div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold tracking-wide">Aurora</h3>
                <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/> Online
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="group relative">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowHistory(!showHistory)} 
                  className="p-2 rounded-full text-white/60 hover:text-white transition-colors"
                >
                  <History size={18} />
                </motion.button>
                {/* Tooltip fixed position */}
                <div className="absolute right-0 top-full mt-2 px-2.5 py-1 bg-[#18181b] border border-white/10 text-white text-[10px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-50">
                  History
                </div>
              </div>

              <div className="group relative">
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)", rotate: 180 }}
                  transition={{ duration: 0.4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNewChat} 
                  className="p-2 rounded-full text-white/60 hover:text-white transition-colors"
                >
                  <RefreshCw size={18} />
                </motion.button>
                <div className="absolute right-0 top-full mt-2 px-2.5 py-1 bg-[#18181b] border border-white/10 text-white text-[10px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-50">
                  New Chat
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 [-webkit-scrollbar:none] [scrollbar-width:none] [-ms-overflow-style:none]">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => {
                const isUser = msg.role === "user";
                return (
                  <motion.div 
                    key={msg.id} 
                    // Directional Entry Animation: User from right, AI from left
                    initial={{ opacity: 0, x: isUser ? 20 : -20, scale: 0.95 }} 
                    animate={{ opacity: 1, x: 0, scale: 1 }} 
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${isUser ? "bg-white/10 border-white/10" : "bg-indigo-500/20 border-indigo-500/30"}`}>
                      {isUser ? <User size={14} className="text-white/80"/> : <Sparkles size={14} className="text-indigo-300"/>}
                    </div>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm backdrop-blur-md ${isUser ? "bg-[#27272a] text-white rounded-tr-none border border-white/10" : "bg-white/5 text-gray-200 rounded-tl-none border border-white/5"}`}>
                      {isUser ? msg.content : <div className="prose prose-invert prose-sm"><ReactMarkdown>{msg.content}</ReactMarkdown></div>}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Enhanced Typing Indicator - Bouncing Dots */}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex items-center gap-3 ml-1"
              >
                 <div className="flex gap-1 h-4 items-center">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.15 // Stagger effect
                        }}
                      />
                    ))}
                 </div>
                 <span className="text-xs text-indigo-300/50 font-medium">Thinking...</span>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex items-center justify-center px-4 pb-3 pt-2">
            <div className="w-full max-w-2xl relative">
              <div className="relative flex items-end bg-[#18181b] border border-white/10 rounded-[26px] px-2 py-1.5 shadow-2xl focus-within:border-indigo-500/50 transition-colors duration-300">
                
                {/* Icon */}
                <div className="pl-3 pr-2 h-10 flex items-center justify-center text-white/30">
                  <Command size={16} />
                </div>
                
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-white placeholder-white/20 resize-none max-h-[60px] min-h-[40px] overflow-y-auto py-2.5 [-webkit-scrollbar:none] [scrollbar-width:none] [-ms-overflow-style:none]"
                  rows={1}
                  disabled={isLoading}
                />
                
                {/* Animated Send Button */}
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.1, backgroundColor: "#4f46e5" }} // Indigo-600 on hover
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 1 }}
                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-50 disabled:scale-100 transition-colors"
                >
                  <ChevronRight size={20} strokeWidth={2.5} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}