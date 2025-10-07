import React from 'react';

export default function DayCard({ day, date, mood, isSelected, onSelect, isToday }) {
  return (
    <button
      onClick={onSelect}
      className={`relative p-3 sm:p-4 rounded-xl transition-all duration-300 transform active:scale-95 ${
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
      <div className="text-center">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">{day}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{date}</div>
        {mood ? (
          <>
            <div className="text-2xl sm:text-3xl mb-1">{mood.emoji}</div>
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
