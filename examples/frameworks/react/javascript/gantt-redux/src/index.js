/**
 * React Index file
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/index';

const root = createRoot(document.getElementById('container'));
root.render(<Provider store={store}><App /></Provider>);
