import { MOODS, DAYS } from '../constants/moods';

export function getMoodById(id) {
  return MOODS.find(m => m.id === id);
}

export function getChartData(moods) {
  return DAYS.map((day, index) => ({
    name: day,
    humeur: moods[index] || 0
  }));
}

export function getPieData(moods) {
  const counts = {};
  Object.values(moods).forEach(moodId => {
    counts[moodId] = (counts[moodId] || 0) + 1;
  });
  return MOODS.filter(mood => counts[mood.id]).map(mood => ({
    name: mood.name,
    value: counts[mood.id],
    color: mood.color
  }));
}