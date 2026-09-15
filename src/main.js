import { hydrate, dispatch, getState, subscribe } from './state/store.js';
import { initRouter, register, navigate, handleRoute } from './router.js';
import { renderAppShell } from './components/AppShell.js';
import { registerRoutes } from './routes.js';
import { ENV } from './config.js';

async function boot() {
  hydrate();
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(renderAppShell());
  registerRoutes();
  initRouter();

  window.addEventListener('online', () => dispatch({ type: 'APP_SET_ONLINE', payload: true }));
  window.addEventListener('offline', () => dispatch({ type: 'APP_SET_ONLINE', payload: false }));

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.__deferredPrompt = e;
    dispatch({ type: 'APP_SET_INSTALLABLE', payload: true });
  });

  if (ENV.serviceWorker && 'serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (err) {
      console.warn('[SW] failed', err);
    }
  }

  dispatch({ type: 'APP_INIT' });
  document.getElementById('boot-loader')?.remove();
  console.log('%c TENSES MASTER AI ready', 'color:#3b82f6;font-weight:bold');
}

boot().catch(err => {
  console.error('Boot failed', err);
  document.getElementById('app').innerHTML = `<div style="padding:2rem;text-align:center"><h1>Failed to start</h1><p>${err.message}</p><button onclick="location.reload()">Retry</button></div>`;
});
