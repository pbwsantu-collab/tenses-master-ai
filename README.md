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

## Run locally
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

## Deploy to GitHub Pages

This project uses GitHub Actions to automatically build and deploy.

1. Go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` (or re-run the workflow)

Live site: https://pbwsantu-collab.github.io/tenses-master-ai/

### Other platforms (Cloudflare Pages / Netlify / Vercel)
- Build command: `npm run build`
- Output directory: `dist`

Based on Higher English Grammar Chapter XIII — Tenses.
