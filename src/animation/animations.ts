import { Variants } from 'framer-motion';

/**
 * Animation variants for different component types
 */
export const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  
  slideInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  
  slideInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  
  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  
  slideInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  
  rotate: {
    hidden: { opacity: 0, rotate: -10 },
    visible: { opacity: 1, rotate: 0 },
  },
  
  bounce: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.5
      }
    },
  },
} as Record<string, Variants>;

/**
 * Default transition settings
 */
export const defaultTransition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier easing
};

/**
 * Animation durations
 */
export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
};

/**
 * Staggered children animation
 */
export const staggerChildren = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
}; 