import { MOODS, DAYS_SHORT } from '../constants/moods';

export function getMoodById(id) {
  return MOODS.find(m => m.id === id);
}

export function getChartData(moods, weekDates, formatDate) {
  return weekDates.map((date, index) => {
    const dateKey = formatDate(date);
    return {
      name: DAYS_SHORT[index],
      date: dateKey,
      humeur: moods[dateKey] || 0
    };
  });
}

export function getPieData(moods, weekDates, formatDate) {
  const counts = {};
  
  weekDates.forEach(date => {
    const dateKey = formatDate(date);
    const moodId = moods[dateKey];
    if (moodId) {
      counts[moodId] = (counts[moodId] || 0) + 1;
    }
  });
  
  return MOODS.filter(mood => counts[mood.id]).map(mood => ({
    name: mood.name,
    value: counts[mood.id],
    color: mood.color
  }));
}
