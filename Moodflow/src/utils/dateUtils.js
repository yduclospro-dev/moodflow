export function getWeekDates(weekOffset = 0) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  
  // Ajuster pour obtenir le lundi de la semaine
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  monday.setDate(today.getDate() + diff + (weekOffset * 7));
  
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    dates.push(date);
  }
  
  return dates;
}

export function formatDate(date) {
  return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
}

export function formatDisplayDate(date) {
  const options = { day: 'numeric', month: 'short' };
  return date.toLocaleDateString('fr-FR', options);
}

export function getWeekRange(dates) {
  if (dates.length === 0) return '';
  const first = dates[0];
  const last = dates[6];
  
  const firstMonth = first.toLocaleDateString('fr-FR', { month: 'short' });
  const lastMonth = last.toLocaleDateString('fr-FR', { month: 'short' });
  
  if (firstMonth === lastMonth) {
    return `${first.getDate()} - ${last.getDate()} ${lastMonth}`;
  }
  return `${first.getDate()} ${firstMonth} - ${last.getDate()} ${lastMonth}`;
}

export function isFutureDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset à minuit
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate > today;
}
