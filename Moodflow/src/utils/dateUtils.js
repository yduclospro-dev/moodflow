export function getWeekDates(weekOffset = 0) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  
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

export function getMonthDates(monthOffset = 0) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + monthOffset;
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Obtenir le jour de la semaine du premier jour (0 = dimanche, 1 = lundi, etc.)
  let startDay = firstDay.getDay();
  startDay = startDay === 0 ? 6 : startDay - 1; // Convertir pour que lundi = 0
  
  // Créer un tableau incluant les jours vides du début
  const dates = [];
  
  // Ajouter les jours vides du mois précédent
  for (let i = 0; i < startDay; i++) {
    dates.push(null);
  }
  
  // Ajouter tous les jours du mois
  for (let day = 1; day <= lastDay.getDate(); day++) {
    dates.push(new Date(year, month, day));
  }
  
  return dates;
}

export function getMonthName(monthOffset = 0) {
  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
}

export function formatDate(date) {
  if (!date) return null;
  // Utiliser getFullYear, getMonth, getDate au lieu de toISOString pour éviter les problèmes de timezone
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
    return `${first.getDate()} - ${last.getDate()} ${firstMonth}`;
  }
  return `${first.getDate()} ${firstMonth} - ${last.getDate()} ${lastMonth}`;
}

export function isFutureDate(date) {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const compareDate = new Date(date);
  compareDate.setHours(0, 0, 0, 0);
  return compareDate > today;
}
