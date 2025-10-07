import MonthDayCard from './MonthDayCard';
import { DAYS_SHORT } from '../../../constants/moods';
import { formatDate, isFutureDate } from '../../../utils/dateUtils';

export default function MonthOverview({ moods, selectedDate, onDaySelect, getMoodById, monthDates }) {
  const today = formatDate(new Date());
  
  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6 transition-all">
      {/* En-têtes des jours */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
        {DAYS_SHORT.map((day, index) => (
          <div key={index} className="text-center text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Grille du calendrier */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {monthDates.map((date, index) => {
          if (!date) {
            return <MonthDayCard key={`empty-${index}`} isEmpty={true} />;
          }
          
          const dateKey = formatDate(date);
          const isToday = dateKey === today;
          const isFuture = isFutureDate(date);
          
          return (
            <MonthDayCard
              key={dateKey}
              date={date}
              mood={getMoodById(moods[dateKey])}
              isSelected={selectedDate === dateKey}
              isToday={isToday}
              isFuture={isFuture}
              onSelect={() => !isFuture && onDaySelect(selectedDate === dateKey ? null : dateKey)}
            />
          );
        })}
      </div>
    </section>
  );
}

