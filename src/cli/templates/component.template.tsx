import React from 'react';
import { motion } from 'framer-motion';
import { useAnimationContext } from '../animation';

export interface {{ComponentName}}Props {
  // Add your props here
  className?: string;
  children?: React.ReactNode;
  animation?: string;
}

export const {{ComponentName}}: React.FC<{{ComponentName}}Props> = ({
  className = '',
  children,
  animation,
  ...props
}) => {
  const { enabled, defaultAnimation, animationVariants } = useAnimationContext();
  
  // Get specified animation or default
  const selectedAnimation = animation || defaultAnimation;
  const animationVariant = animationVariants[selectedAnimation];
  
  // If animations are disabled, render without animation
  if (!enabled) {
    return (
      <div 
        className={`
          // Add your base styles here
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    );
  }
  
  // Render with animation
  return (
    <motion.div 
      className={`
        // Add your base styles here
        ${className}
      `}
      initial="hidden"
      animate="visible"
      variants={animationVariant}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}; 