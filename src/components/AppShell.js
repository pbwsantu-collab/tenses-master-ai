import { getState } from '../state/store.js';

export function renderAppShell() {
  const state = getState();
  const shell = document.createElement('div');
  shell.className = 'app-shell';
  shell.innerHTML = `
    <header class="app-header" role="banner">
      <div class="header-inner">
        <button class="logo" data-nav="/" aria-label="Home">
          <span class="logo-mark">T</span>
          <span class="logo-text">TENSES MASTER AI</span>
        </button>
        <div class="header-actions">
          <span class="offline-badge ${state.app.online ? 'hidden' : ''}" id="offline-badge">Offline</span>
          <button class="icon-btn" data-nav="/progress" aria-label="Progress">📊</button>
          <button class="icon-btn" data-nav="/settings" aria-label="Settings">⚙️</button>
        </div>
      </div>
    </header>
    <main id="main" class="app-main" role="main">
      <div id="route-outlet"></div>
    </main>
    <nav class="bottom-nav" role="navigation" aria-label="Main">
      <button data-nav="/" class="nav-item"><span class="nav-icon">🏠</span><span class="nav-label">Home</span></button>
      <button data-nav="/learn" class="nav-item"><span class="nav-icon">📘</span><span class="nav-label">Learn</span></button>
      <button data-nav="/practice" class="nav-item"><span class="nav-icon">🎯</span><span class="nav-label">Practice</span></button>
      <button data-nav="/tests" class="nav-item"><span class="nav-icon">📝</span><span class="nav-label">Test</span></button>
      <button data-nav="/progress" class="nav-item"><span class="nav-icon">📈</span><span class="nav-label">Progress</span></button>
    </nav>
    <div id="toast-region" class="toast-region" aria-live="polite"></div>
    <div id="modal-region" class="modal-region"></div>
  `;
  return shell;
}
