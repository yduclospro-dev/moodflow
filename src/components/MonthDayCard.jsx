export default function MonthDayCard({ date, mood, isSelected, onSelect, isToday, isFuture, isEmpty }) {
  if (isEmpty) {
    return <div className="aspect-square"></div>;
  }

  const day = date.getDate();

  return (
    <button
      onClick={onSelect}
      disabled={isFuture}
      className={`relative max-sm:h-16 sm:aspect-square p-1 sm:p-2 rounded-lg transition-all duration-300 transform ${
        isFuture 
          ? 'cursor-not-allowed opacity-40' 
          : 'active:scale-95 hover:shadow-md'
      } ${
        mood 
          ? 'bg-gradient-to-br shadow-sm' 
          : 'bg-gray-50 dark:bg-gray-700'
      } ${isSelected ? 'ring-2 ring-purple-400 scale-105' : ''} ${
        isToday ? 'ring-2 ring-pink-400' : ''
      }`}
      style={mood ? {
        backgroundImage: `linear-gradient(135deg, ${mood.color}15, ${mood.color}30)`
      } : {}}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className={`text-xs sm:text-sm font-medium  ${
          isToday 
            ? 'text-pink-600 dark:text-pink-400 font-bold' 
            : 'text-gray-600 dark:text-gray-300'
        }`}>
          {day}
        </div>
        {mood && (
          <>
            <div className="text-2xl sm:text-3xl">{mood.emoji}</div>
            <div className="text-xs font-medium mt-1 hidden sm:block" style={{ color: mood.color }}>
              {mood.name}
            </div>
          </>
        )}
      </div>
      {isToday && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></div>
      )}
    </button>
  );
}