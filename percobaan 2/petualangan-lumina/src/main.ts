import './styles/global.css';
import { App } from './core/App';

const init = () => {
  // Create canvas element
  const canvas = document.createElement('canvas');
  const appContainer = document.getElementById('app');
  
  if (appContainer) {
    appContainer.appendChild(canvas);
    // Boot the app
    new App(canvas);
  } else {
    console.error('Failed to find #app container.');
  }
};

window.addEventListener('DOMContentLoaded', init);
