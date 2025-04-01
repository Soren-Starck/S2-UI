/**
 * S2-UI Configuration
 * 
 * This file contains the configuration for the S2-UI library.
 */
module.exports = {
  // Path to the component registry file
  componentRegistry: 'src/components/index.ts',
  
  // Path to the Tailwind CSS config file
  tailwindConfig: 'tailwind.config.js',
  
  // Theme configuration
  theme: {
    // Color themes (blue, indigo, purple, red, green, yellow, cyan)
    primary: 'blue',
    
    // Neutral colors (gray, slate, zinc, neutral, stone)
    secondary: 'slate',
    
    // Accent colors (pink, rose, amber, lime, emerald, teal, sky)
    accent: 'pink',
    
    // Border radius (none, sm, md, lg, full)
    borderRadius: 'md',
  },
  
  // Animation configuration
  animation: {
    // Enable/disable animations for all components
    enabled: true,
    
    // Default animation style (fadeIn, slideInUp, slideInDown, slideInLeft, slideInRight, scale, rotate, bounce)
    defaultAnimation: 'fadeIn',
    
    // Animation duration in seconds (0.2 = fast, 0.3 = normal, 0.5 = slow)
    defaultDuration: 0.3,
  },
};