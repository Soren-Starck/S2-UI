import React, { createContext, useContext, useEffect } from 'react';
import { S2Theme, defaultTheme } from './defaultTheme';

// Create theme context
export const S2ThemeContext = createContext<S2Theme>(defaultTheme);

export interface ThemeProviderProps {
  theme?: Partial<S2Theme>;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  theme = {}, 
  children 
}) => {
  // Merge custom theme with default theme
  const mergedTheme: S2Theme = {
    ...defaultTheme,
    ...theme,
    colors: {
      ...defaultTheme.colors,
      ...(theme.colors || {}),
    },
    borderRadius: {
      ...defaultTheme.borderRadius,
      ...(theme.borderRadius || {}),
    },
    fontSize: {
      ...defaultTheme.fontSize,
      ...(theme.fontSize || {}),
    },
    spacing: {
      ...defaultTheme.spacing,
      ...(theme.spacing || {}),
    },
  };

  // Apply CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;

    // Apply color variables
    Object.entries(mergedTheme.colors).forEach(([colorName, colorValues]) => {
      Object.entries(colorValues).forEach(([shade, value]) => {
        root.style.setProperty(`--s2-${colorName}-${shade}`, value);
      });
    });

    // Apply border radius variables
    Object.entries(mergedTheme.borderRadius).forEach(([size, value]) => {
      root.style.setProperty(`--s2-radius-${size}`, value);
    });

    // Apply font size variables
    Object.entries(mergedTheme.fontSize).forEach(([size, value]) => {
      root.style.setProperty(`--s2-font-size-${size}`, value);
    });

    // Apply spacing variables
    Object.entries(mergedTheme.spacing).forEach(([size, value]) => {
      root.style.setProperty(`--s2-spacing-${size}`, value);
    });
  }, [mergedTheme]);

  return (
    <S2ThemeContext.Provider value={mergedTheme}>
      {children}
    </S2ThemeContext.Provider>
  );
};

// Custom hook to access theme
export const useS2Theme = () => useContext(S2ThemeContext); 