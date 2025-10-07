import { MOODS, DAYS_SHORT } from '../constants/moods';

export function getMoodById(id) {
  return MOODS.find(m => m.id === id);
}

export function getChartData(moods, dates, formatDate) {
  if (!dates || dates.length === 0) return [];
  
  // Pour la vue semaine
  if (dates.length === 7) {
    return dates.map((date, index) => {
      const dateKey = formatDate(date);
      return {
        name: DAYS_SHORT[index],
        date: dateKey,
        humeur: moods[dateKey] || 0
      };
    });
  }
  
  // Pour la vue mois - ne prendre que les dates valides
  const validDates = dates.filter(d => d !== null);
  return validDates.map((date) => {
    const dateKey = formatDate(date);
    return {
      name: date.getDate().toString(),
      date: dateKey,
      humeur: moods[dateKey] || 0
    };
  });
}

export function getPieData(moods, dates, formatDate) {
  const counts = {};
  
  dates.forEach(date => {
    if (!date) return;
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