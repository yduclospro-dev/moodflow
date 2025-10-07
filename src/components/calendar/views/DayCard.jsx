export default function DayCard({ day, date, mood, isSelected, onSelect, isToday, isFuture }) {
  return (
    <button
      onClick={onSelect}
      disabled={isFuture}
      className={`relative p-1 sm:p-4 rounded-xl transition-all duration-300 transform ${
        isFuture 
          ? 'cursor-not-allowed opacity-40' 
          : 'active:scale-95'
      } ${
        mood 
          ? 'bg-gradient-to-br shadow-md hover:shadow-lg' 
          : 'bg-gray-50 dark:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600'
      } ${isSelected ? 'ring-4 ring-purple-400 scale-105' : ''} ${
        isToday ? 'ring-2 ring-pink-400' : ''
      }`}
      style={mood ? {
        backgroundImage: `linear-gradient(135deg, ${mood.color}15, ${mood.color}30)`
      } : {}}
    >
      <div className="text-center py-1">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-300">{day}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{date.day}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{date.month}</div>
        {mood ? (
          <>
            <div className="text-2xl sm:text-3xl">{mood.emoji}</div>
            <div className="text-xs font-medium mt-1 hidden sm:block" style={{ color: mood.color }}>
              {mood.name}
            </div>
          </>
        ) : (
          <div className="text-xl sm:text-2xl text-gray-300 dark:text-gray-500">?</div>
        )}
      </div>
      {isToday && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></div>
      )}
    </button>
  );
}