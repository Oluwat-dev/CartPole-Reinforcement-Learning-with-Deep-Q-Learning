import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CartPole from './components/CartPole';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <CartPole />
      </div>
    </ThemeProvider>
  );
}

export default App;