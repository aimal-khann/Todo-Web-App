import React from 'react';
import { cn } from '@/lib/utils';

interface AuroraCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * AuroraCard - A reusable component with glassmorphism effect
 * Implements the Aurora aesthetic with glass effect, backdrop blur, and subtle hover
 */
const AuroraCard: React.FC<AuroraCardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white/[0.02] backdrop-blur-2xl border border-white/[0.12] rounded-xl shadow-lg',
        'transition-all duration-300 ease-in-out',
        'hover:shadow-xl hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { AuroraCard };