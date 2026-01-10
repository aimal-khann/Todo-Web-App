"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import ChatWindow from "./ChatWindow"; // Default import

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 font-sans text-foreground">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(12px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="origin-bottom-right"
          >
            {/* Main Container */}
            <div className="w-[380px] h-[600px] max-h-[80vh] flex flex-col rounded-[32px] overflow-hidden border border-white/10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)] bg-[#050507]/90 backdrop-blur-3xl relative">
              
              {/* --- THE AURORA EFFECT (Animated Background) --- */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[20%] w-[140%] h-[50%] bg-indigo-600/20 blur-[100px] rounded-full animate-pulse" />
                <div className="absolute top-[30%] -right-[20%] w-[100%] h-[40%] bg-purple-600/10 blur-[90px] rounded-full" />
                <div className="absolute -bottom-[20%] left-[20%] w-[80%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full" />
              </div>

              <ChatWindow onClose={() => setIsOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`h-16 w-16 rounded-full flex items-center justify-center transition-all duration-500 border border-white/20 shadow-[0_0_40px_rgba(99,102,241,0.5)] ${
          isOpen 
            ? "bg-[#1a1a1f] text-white rotate-90" 
            : "bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-500 bg-[length:200%_200%] animate-[gradient_3s_ease_infinite] text-white"
        }`}
      >
        {isOpen ? <X size={28} /> : <Sparkles size={28} className="fill-white/30" />}
      </motion.button>
    </div>
  );
}