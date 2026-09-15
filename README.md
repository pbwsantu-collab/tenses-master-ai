# TENSES MASTER AI

Modular bilingual English Tenses Progressive Web App.

## Features
- 160+ interactive questions
- 12 tense lessons with Bengali explanations
- Practice sessions (10/20/40/50)
- Mock tests
- Verb Forms Lab & Confusing Verbs
- Mistake Book & Progress tracking
- IndexedDB + localStorage persistence
- Speech Synthesis audio
- Offline-capable PWA
- Mobile-first dark UI

## Run
```bash
npm install
npm run dev
```

## Structure
```
src/
  components/  AppShell
  pages/       Home, Learn, TenseDetail, Rules, Questions, Practice, Tests...
  data/        questions (160+), tenses
  services/    db, audio, questionService
  state/       store + initialState
  styles/      design system
```

## Deploy
Connect to Cloudflare Pages / Netlify / Vercel:
- Build: `npm run build`
- Output: `dist`

Based on Higher English Grammar Chapter XIII — Tenses.
