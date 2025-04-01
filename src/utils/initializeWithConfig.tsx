import React from 'react';
import { AnimationProvider } from '../animation';

interface S2UIConfig {
  componentRegistry?: string;
  tailwindConfig?: string;
  theme?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    borderRadius?: string;
  };
  animation?: {
    enabled?: boolean;
    defaultAnimation?: string;
    defaultDuration?: number;
  };
}

/**
 * Initialize S2-UI with configuration
 */
export const initializeWithConfig = (
  config: S2UIConfig = {},
  children: React.ReactNode
): JSX.Element => {
  // Extract animation settings from config
  const animationSettings = {
    enabled: config.animation?.enabled ?? true,
    defaultAnimation: config.animation?.defaultAnimation ?? 'fadeIn',
    defaultDuration: config.animation?.defaultDuration ?? 0.3,
  };

  // Wrap children with providers
  return (
    <AnimationProvider
      enabled={animationSettings.enabled}
      defaultAnimation={animationSettings.defaultAnimation}
      defaultDuration={animationSettings.defaultDuration}
    >
      {children}
    </AnimationProvider>
  );
}; 