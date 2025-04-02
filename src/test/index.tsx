import React from 'react';
import ReactDOM from 'react-dom/client';
import { AnimationProvider } from '../animation';
import TestPage from './testpage';
import '../index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AnimationProvider enabled={true} defaultAnimation="fadeIn">
      <TestPage />
    </AnimationProvider>
  </React.StrictMode>
); 