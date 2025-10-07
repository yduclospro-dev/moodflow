import DayCard from './DayCard';
import { DAYS_SHORT } from '../constants/moods';
import { formatDisplayDate, formatDate, isFutureDate } from '../utils/dateUtils';

export default function WeekOverview({ moods, selectedDate, onDaySelect, getMoodById, weekDates }) {
  const today = formatDate(new Date());
  
  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6 transition-all">
      <div className="grid grid-cols-7 gap-1 sm:gap-3">
        {weekDates.map((date, index) => {
          const dateKey = formatDate(date);
          const isToday = dateKey === today;
          const isFuture = isFutureDate(date);
          
          return (
            <DayCard
              key={dateKey}
              day={DAYS_SHORT[index]}
              date={formatDisplayDate(date)}
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
