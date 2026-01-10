import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion'; // Updated import
import { cn } from '@/lib/utils';

// FIX: Extend HTMLMotionProps<"button"> to handle Framer Motion events correctly
interface GlowButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  glowColor?: 'indigo' | 'purple' | 'blue';
}

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className,
      glowColor = 'indigo',
      ...props
    },
    ref
  ) => {
    const baseClasses = 'relative overflow-hidden rounded-md font-medium transition-all duration-300 ease-in-out';

    const variantClasses = {
      primary: `bg-${glowColor}-500 text-white border border-${glowColor}-400`,
      secondary: `bg-${glowColor}-100 text-${glowColor}-700 border border-${glowColor}-300 dark:bg-${glowColor}-900/30 dark:text-${glowColor}-300`,
      outline: `border-2 border-${glowColor}-500 text-${glowColor}-500 bg-transparent hover:bg-${glowColor}-500/10`,
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const glowClasses = `neon-glow-${glowColor} hover:shadow-[0_0_15px_theme(colors.${glowColor}.500)]`;

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          glowClasses,
          'hover:scale-105 active:scale-95',
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

GlowButton.displayName = 'GlowButton';

export { GlowButton };
