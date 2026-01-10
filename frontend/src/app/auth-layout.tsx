'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-indigo-950 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
              <p className="text-white/70">{subtitle}</p>
            </div>
            {children}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}