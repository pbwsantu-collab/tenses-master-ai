import { initialState } from './initialState.js';

let state = structuredClone(initialState);
const listeners = new Set();

export function getState() {
  return state;
}

export function dispatch(action) {
  state = reducer(state, action);
  listeners.forEach(fn => {
    try { fn(state, action); } catch (e) { console.error('Listener error', e); }
  });
  try {
    localStorage.setItem('tma_progress', JSON.stringify(state.progress));
    localStorage.setItem('tma_learner', JSON.stringify(state.learner));
    localStorage.setItem('tma_settings', JSON.stringify(state.settings));
  } catch (_) {}
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function reducer(s, action) {
  switch (action.type) {
    case 'APP_INIT':
      return { ...s, app: { ...s.app, initialized: true } };
    case 'APP_SET_ONLINE':
      return { ...s, app: { ...s.app, online: action.payload } };
    case 'APP_SET_ROUTE':
      return { ...s, app: { ...s.app, route: action.payload } };
    case 'APP_SET_THEME':
      return { ...s, app: { ...s.app, theme: action.payload } };
    case 'APP_SET_INSTALLABLE':
      return { ...s, app: { ...s.app, installable: action.payload } };
    case 'QUESTION_ANSWERED': {
      const { correct } = action.payload;
      const attempted = s.progress.attempted + 1;
      const correctCount = s.progress.correct + (correct ? 1 : 0);
      return {
        ...s,
        progress: {
          ...s.progress,
          attempted,
          correct: correctCount,
          accuracy: attempted ? Math.round((correctCount / attempted) * 100) : 0,
          lastActivityAt: new Date().toISOString()
        },
        learner: {
          ...s.learner,
          xp: s.learner.xp + (correct ? 10 : 2)
        }
      };
    }
    case 'LESSON_COMPLETE': {
      const id = action.payload;
      if (s.progress.completedLessons.includes(id)) return s;
      return {
        ...s,
        progress: {
          ...s.progress,
          completedLessons: [...s.progress.completedLessons, id]
        },
        learner: { ...s.learner, xp: s.learner.xp + 25 }
      };
    }
    case 'MISTAKE_ADDED':
      return {
        ...s,
        mistakes: {
          ...s.mistakes,
          items: [action.payload, ...s.mistakes.items]
        }
      };
    case 'PRACTICE_STARTED':
      return {
        ...s,
        practice: {
          mode: action.payload.mode,
          questionIds: action.payload.questionIds,
          currentIndex: 0,
          answers: {},
          startedAt: Date.now(),
          elapsedSeconds: 0,
          completed: false
        }
      };
    case 'PRACTICE_ANSWERED': {
      const { questionId, answer, correct } = action.payload;
      return {
        ...s,
        practice: {
          ...s.practice,
          answers: { ...s.practice.answers, [questionId]: { answer, correct } },
          currentIndex: s.practice.currentIndex + 1
        }
      };
    }
    case 'PRACTICE_COMPLETED':
      return { ...s, practice: { ...s.practice, completed: true } };
    case 'SETTINGS_UPDATED':
      return { ...s, settings: { ...s.settings, ...action.payload } };
    case 'SEARCH_SET_QUERY':
      return { ...s, search: { ...s.search, query: action.payload } };
    case 'AUDIO_PLAY':
      return { ...s, audio: { ...s.audio, isPlaying: true, currentId: action.payload } };
    case 'AUDIO_STOP':
      return { ...s, audio: { ...s.audio, isPlaying: false, currentId: null } };
    default:
      return s;
  }
}

export function hydrate() {
  try {
    const progress = JSON.parse(localStorage.getItem('tma_progress') || 'null');
    const learner = JSON.parse(localStorage.getItem('tma_learner') || 'null');
    const settings = JSON.parse(localStorage.getItem('tma_settings') || 'null');
    if (progress) state.progress = { ...state.progress, ...progress };
    if (learner) state.learner = { ...state.learner, ...learner };
    if (settings) state.settings = { ...state.settings, ...settings };
  } catch (_) {}
}
