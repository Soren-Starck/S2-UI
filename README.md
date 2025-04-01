# S2-UI

A streamlined UI component library built with React and Tailwind CSS, focused on ease of use and developer experience.

## Features

- **Global Theming**: Built on Tailwind CSS with easily customizable central configuration
- **Custom CLI**: Simplified component installation and management
- **Simplified Component Structure**: Single-file components with inline Tailwind styling
- **Animated Components**: Built-in Framer Motion animations that can be enabled/disabled
- **Automated Dependency Management**: Handles peer dependencies automatically

## Installation

```bash
npm install s2-ui
```

## Quick Start

Initialize your project:

```bash
npx s2-ui init
```

This will guide you through setting up your project configuration, including:
- Component registry location
- Tailwind configuration
- Theme preferences
- Animation settings

## Adding Components

```bash
npx s2-ui add <component-name>
```

This will:
1. Install the component from npm (e.g., `@s2-ui/button`)
2. Install any required peer dependencies
3. Add an import to your component registry

## Creating Custom Components

Each component should be defined in a single file using Tailwind CSS for styling:

```tsx
// Example Button.tsx with animation support
import React from 'react';
import { motion } from 'framer-motion';
import { useAnimationContext } from 's2-ui/animation';

export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  animation?: string; // Optional animation override
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  animation,
}) => {
  const { enabled, defaultAnimation, animationVariants } = useAnimationContext();
  
  // Get specified animation or default
  const selectedAnimation = animation || defaultAnimation;
  const animationVariant = animationVariants[selectedAnimation];
  
  const baseStyles = 'font-medium rounded transition-colors';
  
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };
  
  const sizeStyles = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };
  
  // If animations are disabled, render a regular button
  if (!enabled) {
    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  
  // Otherwise, use animated button
  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      onClick={onClick}
      initial="hidden"
      animate="visible"
      variants={animationVariant}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};
```

## Animation Support

S2-UI comes with built-in animation support using Framer Motion. During the initialization process, you can:

1. Enable/disable animations globally
2. Choose a default animation style
3. Set the default animation duration

Available animation styles:
- `fadeIn`: Simple fade in
- `slideInUp`: Slide up from below
- `slideInDown`: Slide down from above
- `slideInLeft`: Slide in from the left
- `slideInRight`: Slide in from the right
- `scale`: Scale up from smaller size
- `rotate`: Rotate in with a slight angle
- `bounce`: Bounce in with a spring effect

You can override the animation for individual components:

```jsx
<Button animation="scale">Click me</Button>
<Card animation="slideInUp">Content</Card>
```

## Configuration

The S2-UI configuration file (`s2-ui.config.js`) manages:
- Component registry path
- Tailwind theme customization
- Animation settings
- Package preferences

## License

ISC