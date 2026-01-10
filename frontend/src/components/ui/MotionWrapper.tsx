import React from 'react';
import { motion } from 'framer-motion';

interface MotionWrapperProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const MotionWrapper = ({
  children,
  delay = 0,
  duration = 0.5,
  className = ''
}: MotionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export { MotionWrapper };