export const initialState = {
  app: {
    initialized: false,
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
    installable: false,
    updateAvailable: false,
    route: '/',
    theme: 'system',
    language: 'bilingual',
    learnerLevel: 'beginner',
    reducedMotion: false,
    debug: true
  },
  learner: {
    id: 'local-user',
    name: '',
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: null,
    badges: [],
    dailyGoal: 10
  },
  progress: {
    attempted: 0,
    correct: 0,
    accuracy: 0,
    completedLessons: [],
    topicStats: {},
    tenseStats: {},
    weakTopics: [],
    masteredTopics: [],
    lastActivityAt: null
  },
  practice: {
    mode: null,
    questionIds: [],
    currentIndex: 0,
    answers: {},
    startedAt: null,
    elapsedSeconds: 0,
    completed: false
  },
  mistakes: {
    items: [],
    filters: { topic: 'all', status: 'unresolved' }
  },
  revision: { queue: [], nextReviewByQuestionId: {} },
  audio: { engine: 'speechSynthesis', isPlaying: false, currentId: null, rate: 1, voice: null },
  search: { query: '', results: [] },
  settings: {
    notifications: false,
    autoPlayAudio: false,
    showClueWords: true,
    showBengaliFirst: false
  }
};
