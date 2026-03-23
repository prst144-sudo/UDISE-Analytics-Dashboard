import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Scroll progress bar
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  const bar = document.getElementById('scroll-progress-bar');
  if (bar) bar.style.width = Math.min(pct, 100) + '%';
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
