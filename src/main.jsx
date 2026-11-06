import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SkillSwapProvider } from './context/SkillSwapContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkillSwapProvider>
      <App />
    </SkillSwapProvider>
  </React.StrictMode>,
);

