import React, { createContext, useContext } from 'react';
import { animations } from './animations';

// Animation context interface
export interface AnimationContextType {
  enabled: boolean;
  defaultAnimation: string;
  animationVariants: Record<string, any>;
  defaultDuration: number;
}

// Default animation context values
const defaultAnimationContext: AnimationContextType = {
  enabled: true,
  defaultAnimation: 'fadeIn',
  animationVariants: animations,
  defaultDuration: 0.3,
};

// Create the animation context
export const AnimationContext = createContext<AnimationContextType>(defaultAnimationContext);

// Props for the animation provider
export interface AnimationProviderProps {
  enabled?: boolean;
  defaultAnimation?: string;
  defaultDuration?: number;
  children: React.ReactNode;
}

/**
 * Provides animation context to component tree
 */
export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  enabled = true,
  defaultAnimation = 'fadeIn',
  defaultDuration = 0.3,
  children,
}) => {
  // Create the animation context value
  const animationContext: AnimationContextType = {
    enabled,
    defaultAnimation,
    animationVariants: animations,
    defaultDuration,
  };

  return (
    <AnimationContext.Provider value={animationContext}>
      {children}
    </AnimationContext.Provider>
  );
};

// Hook to use animation context
export const useAnimationContext = () => useContext(AnimationContext); 