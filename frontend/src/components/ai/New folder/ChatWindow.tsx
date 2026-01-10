"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, RefreshCw, ChevronRight, History, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useTaskStore } from "@/store/useTaskStore";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function ChatWindow({ onClose }: { onClose: () => void }) {
  const { user } = useTaskStore();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "assistant",
      content: `**System Online.** \n\nHello ${user?.fullName?.split(' ')[0] || "User"}. I am ready to manage your tasks.`,
      timestamp: new Date().toISOString(),
    }
  ]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Auto-resize input
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, [input]);

  const handleNewChat = () => {
    setMessages([{
      id: Date.now().toString(),
      role: "assistant",
      content: "Memory cleared. What is your next directive?",
      timestamp: new Date().toISOString(),
    }]);
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

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    // Simulate AI Latency
    try {
      setTimeout(() => {
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm currently in **Frontend Mode**. \n\nConnect me to the Python backend to enable real task management!",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsLoading(false);
      }, 1500);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent relative z-10 font-sans text-white">
      
      {/* --- HISTORY SIDEBAR (Glass Overlay) --- */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="absolute inset-y-0 left-0 w-64 bg-[#020204]/80 backdrop-blur-2xl border-r border-white/10 z-30 flex flex-col"
          >
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">Archives</span>
              <button onClick={() => setShowHistory(false)} className="text-white/40 hover:text-white"><X size={16} /></button>
            </div>
            <div className="p-3 space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors cursor-pointer">
                  <div className="h-2 w-20 bg-white/20 rounded mb-2" />
                  <div className="h-2 w-12 bg-white/10 rounded" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HEADER --- */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-white/[0.08] backdrop-blur-sm relative z-20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-[1px]">
              <div className="w-full h-full rounded-xl bg-[#0a0a0f] flex items-center justify-center">
                <Bot size={20} className="text-indigo-400" />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#09090b] rounded-full animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight text-white">Aurora</h3>
            <p className="text-[10px] text-indigo-300/80 font-medium uppercase tracking-wider">Intelligence Active</p>
          </div>
        </div>
        
        <div className="flex gap-1">
          <button onClick={() => setShowHistory(!showHistory)} className="p-2 text-white/40 hover:text-indigo-300 hover:bg-white/5 rounded-lg transition-colors"><History size={18} /></button>
          <button onClick={handleNewChat} className="p-2 text-white/40 hover:text-indigo-300 hover:bg-white/5 rounded-lg transition-colors"><RefreshCw size={18} /></button>
        </div>
      </div>

      {/* --- MESSAGES --- */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-none relative z-10">
        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: idx === messages.length - 1 ? 0 : 0 }}
              className={`flex gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isUser ? "bg-white/10" : "bg-indigo-500/20"}`}>
                {isUser ? <User size={14} className="text-white/70" /> : <Sparkles size={14} className="text-indigo-400" />}
              </div>

              <div className={`max-w-[85%] p-4 rounded-[20px] text-sm leading-6 shadow-sm backdrop-blur-md ${
                isUser
                  ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-tr-none border border-indigo-400/20"
                  : "bg-[#18181b]/60 border border-white/10 text-gray-100 rounded-tl-none"
              }`}>
                {isUser ? msg.content : <div className="prose prose-invert prose-sm max-w-none"><ReactMarkdown>{msg.content}</ReactMarkdown></div>}
              </div>
            </motion.div>
          );
        })}
        
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
             <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                <Sparkles size={14} className="text-indigo-400 animate-pulse" />
             </div>
             <div className="h-10 px-4 bg-[#18181b]/40 border border-white/5 rounded-full rounded-tl-none flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* --- FLOATING INPUT CAPSULE --- */}
      <div className="p-5 pt-2 relative z-20">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[24px] opacity-30 group-focus-within:opacity-100 group-focus-within:blur-md transition-all duration-300" />
          <div className="relative bg-[#09090b] border border-white/10 rounded-[22px] flex items-end p-1.5 shadow-xl">
            <textarea
              ref={textareaRef}
              rows={1}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder-white/30 px-4 py-3 max-h-[120px] resize-none outline-none"
              placeholder="Command Aurora..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-3 rounded-[18px] bg-white text-black hover:bg-indigo-50 disabled:opacity-50 disabled:scale-90 transition-all shadow-lg hover:shadow-indigo-500/50"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <ChevronRight size={18} strokeWidth={3} />}
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-3 gap-4">
           {/* Micro-Actions / Hints */}
           <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest hover:text-indigo-400 cursor-pointer transition-colors">/add task</span>
           <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest hover:text-indigo-400 cursor-pointer transition-colors">/summarize</span>
        </div>
      </div>
    </div>
  );
}

// Simple loader component to avoid import error if lucide doesn't have it in your version
function Loader2({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}