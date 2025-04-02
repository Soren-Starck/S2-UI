import React from 'react';
import { motion } from 'framer-motion';
import { useAnimationContext } from '../animation';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  animation?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  children,
  onClick,
  animation,
}) => {
  const { enabled, defaultAnimation, animationVariants } = useAnimationContext();
  
  // Get specified animation or default
  const selectedAnimation = animation || defaultAnimation;
  const animationVariant = animationVariants[selectedAnimation];
  
  const baseStyles = 'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
    secondary: 'bg-secondary-200 text-secondary-800 hover:bg-secondary-300 focus:ring-secondary-500',
    accent: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500',
  };
  
  const sizeStyles = {
    sm: 'py-xs px-sm text-sm',
    md: 'py-sm px-md text-base',
    lg: 'py-md px-lg text-lg',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  const disabledStyles = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer';
  
  // If animations are disabled, render a regular button
  if (!enabled) {
    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
  
  // Otherwise, use animated button
  return (
    <motion.button
      className={`rounded-xl ${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      initial="hidden"
      animate="visible"
      variants={animationVariant}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.button>
  );
}; 