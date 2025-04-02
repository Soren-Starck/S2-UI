import React, { useState } from 'react';
import './tailwind.css';

const ExampleContainer: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  </div>
);

// Simple Button component for demo
const Button: React.FC<{
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  animation?: string;
}> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  children,
  onClick
}) => {
  // Base styles
  let buttonClasses = "font-medium rounded transition-colors focus:outline-none";
  
  // Variant styles
  if (variant === 'primary') {
    buttonClasses += " bg-blue-500 text-white hover:bg-blue-600";
  } else if (variant === 'secondary') {
    buttonClasses += " bg-gray-200 text-gray-800 hover:bg-gray-300";
  } else if (variant === 'accent') {
    buttonClasses += " bg-pink-500 text-white hover:bg-pink-600";
  }
  
  // Size styles
  if (size === 'sm') {
    buttonClasses += " py-1 px-2 text-sm";
  } else if (size === 'md') {
    buttonClasses += " py-2 px-4 text-base";
  } else if (size === 'lg') {
    buttonClasses += " py-3 px-6 text-lg";
  }
  
  // Width styles
  if (fullWidth) {
    buttonClasses += " w-full";
  }
  
  // Disabled styles
  if (disabled) {
    buttonClasses += " opacity-50 cursor-not-allowed";
  } else {
    buttonClasses += " cursor-pointer";
  }
  
  // Add custom classes
  buttonClasses += ` ${className}`;
  
  // Add CSS-defined classes as backup
  buttonClasses += ` btn-${variant} btn-${size}`;
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      style={{
        borderRadius: '0.25rem'
      }}
    >
      {children}
    </button>
  );
};

// Simple Card component for demo
const Card: React.FC<{
  title?: string;
  subtitle?: string;
  bordered?: boolean;
  elevated?: boolean;
  className?: string;
  children: React.ReactNode;
  animation?: string;
}> = ({
  title,
  subtitle,
  bordered = false,
  elevated = false,
  className = '',
  children
}) => {
  let cardClasses = "bg-white rounded-md overflow-hidden";
  
  if (bordered) {
    cardClasses += " border border-gray-200";
  }
  
  if (elevated) {
    cardClasses += " shadow-md";
  }
  
  cardClasses += ` ${className}`;
  
  // Add CSS-defined classes as backup
  cardClasses += " card";
  if (bordered) cardClasses += " card-bordered";
  if (elevated) cardClasses += " card-elevated";
  
  return (
    <div className={cardClasses}>
      {(title || subtitle) && (
        <div className="p-4">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

function App() {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">S2-UI Component Library</h1>
        <p className="mb-4">A showcase of components with animations.</p>
        <div className="mb-4">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              checked={animationsEnabled} 
              onChange={() => setAnimationsEnabled(!animationsEnabled)}
              className="mr-2"
            />
            Enable animations
          </label>
        </div>
      </header>

      <main>
        <ExampleContainer title="Button Component">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="accent">Accent Button</Button>
          <Button size="sm">Small Button</Button>
          <Button size="lg">Large Button</Button>
          <Button fullWidth>Full Width Button</Button>
          <Button disabled>Disabled Button</Button>
        </ExampleContainer>

        <ExampleContainer title="Card Component">
          <Card>
            <p>Basic card with default styling</p>
          </Card>
          
          <Card title="Card with Title">
            <p>Content goes here</p>
          </Card>
          
          <Card 
            title="Card with Details" 
            subtitle="Supporting information"
          >
            <p>Content with title and subtitle</p>
          </Card>
          
          <Card bordered>
            <p>Card with border</p>
          </Card>
          
          <Card elevated>
            <p>Card with elevation (shadow)</p>
          </Card>
          
          <Card 
            title="Styled Card" 
            bordered 
            elevated 
            className="bg-blue-50"
          >
            <p>Custom styled card</p>
          </Card>
        </ExampleContainer>
      </main>
    </div>
  );
}

export default App;
