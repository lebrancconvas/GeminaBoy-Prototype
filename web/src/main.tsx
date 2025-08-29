import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

console.log('🚀 Main.tsx loaded, waiting for DOM...');

// Function to initialize the app
function initializeApp() {
  console.log('🔍 Looking for root element...');
  const container = document.getElementById('root');
  
  if (container) {
    console.log('✅ Root element found, creating React app...');
    try {
      const root = createRoot(container);
      root.render(<App />);
      console.log('🎉 React app rendered successfully!');
    } catch (error) {
      console.error('❌ Failed to render React app:', error);
      container.innerHTML = `<div style="color: red; padding: 20px;">
        <h2>Failed to load emulator</h2>
        <p>Error: ${error}</p>
        <button onclick="location.reload()">Reload Page</button>
      </div>`;
    }
  } else {
    console.error('❌ Root element not found!');
    document.body.innerHTML = '<div style="color: red; padding: 20px;">Root element not found!</div>';
  }
}

// Try to initialize immediately if DOM is already ready
if (document.readyState === 'loading') {
  // DOM is still loading, wait for it
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM is already ready, initialize immediately
  initializeApp();
}

// Fallback: also try after a short delay
setTimeout(() => {
  if (!document.getElementById('root')?.hasChildNodes()) {
    console.log('⏰ Fallback initialization...');
    initializeApp();
  }
}, 100);
