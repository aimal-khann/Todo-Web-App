"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import ChatWindow from "./ChatWindow"; 

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="origin-bottom-right"
          >
            <div className="w-[380px] h-[520px] max-h-[80vh] flex flex-col rounded-[32px] overflow-hidden border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] bg-[#09090b]/80 backdrop-blur-2xl relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-indigo-500/20 blur-[60px] pointer-events-none" />
              <ChatWindow onClose={() => setIsOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="group relative flex items-center">
        {/* Tooltip - Positioned to the LEFT now for better visibility */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#09090b]/90 border border-white/10 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl backdrop-blur-md translate-x-2 group-hover:translate-x-0">
          {isOpen ? 'Close' : 'AI Assistant'}
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`h-14 w-14 rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 shadow-2xl relative z-10 ${
            isOpen 
              ? "bg-white/10 text-white rotate-90" 
              : "bg-gradient-to-tr from-indigo-600 to-purple-600 text-white"
          }`}
        >
          {isOpen ? <X size={24} /> : <Sparkles size={24} className="fill-white/20" />}
        </motion.button>
      </div>
    </div>
  );
}