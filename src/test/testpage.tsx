import React from 'react';
import { Button } from '../components/Button';

export default function TestPage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Button Component Test</h1>
      
      <div className="flex flex-col space-y-2">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="accent">Accent Button</Button>
        <Button variant="primary" size="sm">Small Button</Button>
        <Button variant="primary" size="lg">Large Button</Button>
        <Button variant="primary" disabled>Disabled Button</Button>
      </div>
    </div>
  );
}