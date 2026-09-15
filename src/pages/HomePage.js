import { getState } from '../state/store.js';

export function renderHomePage() {
  const { progress, learner, app } = getState();
  return `
    <div class="page home-page">
      <section class="hero">
        <h1>TENSES MASTER AI</h1>
        <p class="subtitle">Learn • Understand • Practise • Master</p>
        <p class="bn">সম্পূর্ণ ইংরেজি কাল শিক্ষা — বাংলা ব্যাখ্যাসহ</p>
      </section>
      <section class="stats-row">
        <div class="stat-card"><div class="stat-value">${progress.attempted}</div><div class="stat-label">Attempted</div></div>
        <div class="stat-card"><div class="stat-value">${progress.correct}</div><div class="stat-label">Correct</div></div>
        <div class="stat-card"><div class="stat-value">${progress.accuracy}%</div><div class="stat-label">Accuracy</div></div>
        <div class="stat-card"><div class="stat-value">${learner.xp}</div><div class="stat-label">XP</div></div>
      </section>
      <section class="dashboard-grid">
        <button class="dash-card" data-nav="/learn"><span class="dash-icon">📘</span><span class="dash-title">Learn Tenses</span><span class="dash-desc">12 tenses with Bengali</span></button>
        <button class="dash-card" data-nav="/rules"><span class="dash-icon">📜</span><span class="dash-title">Rules</span><span class="dash-desc">All notes & exceptions</span></button>
        <button class="dash-card" data-nav="/practice"><span class="dash-icon">🎯</span><span class="dash-title">Practice</span><span class="dash-desc">10–50 question sessions</span></button>
        <button class="dash-card" data-nav="/tests"><span class="dash-icon">📝</span><span class="dash-title">Mock Test</span><span class="dash-desc">40-mark style exams</span></button>
        <button class="dash-card" data-nav="/verbs"><span class="dash-icon">🔄</span><span class="dash-title">Verb Lab</span><span class="dash-desc">Strong, weak & zero-change</span></button>
        <button class="dash-card" data-nav="/confusing-verbs"><span class="dash-icon">⚠️</span><span class="dash-title">Confusing Verbs</span><span class="dash-desc">Lie/Lay, Hang, Fly/Flee…</span></button>
        <button class="dash-card" data-nav="/mistakes"><span class="dash-icon">📕</span><span class="dash-title">Mistake Book</span><span class="dash-desc">Review errors</span></button>
        <button class="dash-card" data-nav="/progress"><span class="dash-icon">📈</span><span class="dash-title">Progress</span><span class="dash-desc">XP & accuracy</span></button>
      </section>
      ${!app.online ? '<p class="offline-note">You are offline — core lessons still work.</p>' : ''}
    </div>
  `;
}
