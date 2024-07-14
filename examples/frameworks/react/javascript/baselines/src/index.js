/**
 * React Index file
 */
import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('container'));
root.render(<App />);
