import { useEffect } from 'react';
import { useAnimation as useFramerAnimation, Variant } from 'framer-motion';
import { useAnimationContext } from './AnimationProvider';

export interface UseAnimationOptions {
  animation?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

/**
 * Custom hook to use animations with Framer Motion
 */
export const useAnimation = (inView: boolean, options: UseAnimationOptions = {}) => {
  const controls = useFramerAnimation();
  const { enabled, defaultAnimation, animationVariants, defaultDuration } = useAnimationContext();
  
  const {
    animation = defaultAnimation,
    delay = 0,
    duration = defaultDuration,
    once = true
  } = options;
  
  // Get animation variant
  const variant = animationVariants[animation] || animationVariants.fadeIn;
  
  // Apply animation when element is in view
  useEffect(() => {
    if (!enabled) return;
    
    if (inView) {
      controls.start({
        ...variant.visible,
        transition: {
          ...(variant.visible as Variant)?.transition,
          delay,
          duration,
        },
      });
    } else if (!once) {
      controls.start({
        ...variant.hidden,
        transition: {
          ...(variant.hidden as Variant)?.transition,
          duration: duration / 2,
        },
      });
    }
  }, [controls, inView, variant, delay, duration, once, enabled]);
  
  // Return animation controls and initial state
  return {
    animate: controls,
    initial: enabled ? variant.hidden : false,
    whileHover: enabled ? { scale: 1.02 } : undefined,
    whileTap: enabled ? { scale: 0.98 } : undefined,
  };
};

/**
 * Helper hook to create staggered animations for lists
 */
export const useStaggerAnimation = (inView: boolean, options: UseAnimationOptions = {}) => {
  const controls = useFramerAnimation();
  const { enabled } = useAnimationContext();
  
  const { 
    delay = 0,
    duration = 0.3,
    once = true
  } = options;
  
  // Apply staggered animation when parent element is in view
  useEffect(() => {
    if (!enabled) return;
    
    if (inView) {
      controls.start('visible', {
        transition: {
          staggerChildren: 0.1,
          delayChildren: delay,
          duration,
        },
      });
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, delay, duration, once, enabled]);
  
  return {
    animate: controls,
    initial: enabled ? 'hidden' : false,
  };
}; 