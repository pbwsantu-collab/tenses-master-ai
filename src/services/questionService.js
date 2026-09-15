import { questions } from '../data/questions/index.js';

export function getQuestionById(id) {
  return questions.find(q => q.id === id || q.id == id) || null;
}

export function getQuestions({ category, limit } = {}) {
  let list = [...questions];
  if (category && category !== 'all') list = list.filter(q => q.cat === category);
  if (limit) list = list.slice(0, limit);
  return list;
}

export function getRandomQuestions({ count = 10, category, seed } = {}) {
  let list = getQuestions({ category });
  let rng = seed != null ? mulberry32(seed) : Math.random;
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list.slice(0, count);
}

export function getQuestionStats() {
  const byCat = {};
  questions.forEach(q => { byCat[q.cat] = (byCat[q.cat] || 0) + 1; });
  return { total: questions.length, byCategory: byCat };
}

function mulberry32(a) {
  return function () {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export { questions };
