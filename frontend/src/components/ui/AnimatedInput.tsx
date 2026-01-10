import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, error, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="w-full">
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none transition-all duration-300',
              'dark:bg-black/20 dark:border-white/10',
              'focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            onFocus={(e) => {
              setIsFocused(true);
              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              if (props.onBlur) props.onBlur(e);
            }}
            {...props}
          />
          {label && (
            <motion.label
              className={cn(
                'absolute left-3 top-3 text-white/70 text-sm pointer-events-none transition-all duration-300',
                'dark:text-white/50'
              )}
              animate={{
                y: isFocused || props.value ? -20 : 0,
                fontSize: isFocused || props.value ? '0.75rem' : '1rem',
                color: error ? '#ef4444' : '#a3a3a3',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {label}
            </motion.label>
          )}
        </div>
        {error && (
          <motion.p
            className="text-red-500 text-sm mt-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

AnimatedInput.displayName = 'AnimatedInput';

export { AnimatedInput };