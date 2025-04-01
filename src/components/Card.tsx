import React from 'react';
import { motion } from 'framer-motion';
import { useAnimationContext } from '../animation';

export interface CardProps {
  title?: string;
  subtitle?: string;
  bordered?: boolean;
  elevated?: boolean;
  className?: string;
  children: React.ReactNode;
  animation?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  bordered = false,
  elevated = false,
  className = '',
  children,
  animation,
}) => {
  const { enabled, defaultAnimation, animationVariants } = useAnimationContext();

  // Get specified animation or default
  const selectedAnimation = animation || defaultAnimation;
  const animationVariant = animationVariants[selectedAnimation];
  
  const baseStyles = 'bg-white rounded-md overflow-hidden';
  
  const borderStyles = bordered 
    ? 'border border-secondary-200' 
    : '';
  
  const shadowStyles = elevated 
    ? 'shadow-md' 
    : '';
  
  // If animations are disabled, render a regular div
  if (!enabled) {
    return (
      <div className={`${baseStyles} ${borderStyles} ${shadowStyles} ${className}`}>
        {(title || subtitle) && (
          <div className="p-md">
            {title && <h3 className="text-lg font-medium text-secondary-900">{title}</h3>}
            {subtitle && <p className="text-sm text-secondary-600 mt-1">{subtitle}</p>}
          </div>
        )}
        <div className="p-md">{children}</div>
      </div>
    );
  }
  
  // Otherwise, use animated div with Framer Motion
  return (
    <motion.div 
      className={`${baseStyles} ${borderStyles} ${shadowStyles} ${className}`}
      initial="hidden"
      animate="visible"
      variants={animationVariant}
      transition={{ duration: 0.4 }}
    >
      {(title || subtitle) && (
        <div className="p-md">
          {title && (
            <motion.h3 
              className="text-lg font-medium text-secondary-900"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {title}
            </motion.h3>
          )}
          {subtitle && (
            <motion.p 
              className="text-sm text-secondary-600 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}
      <div className="p-md">{children}</div>
    </motion.div>
  );
}; 