import React from 'react';

export default function DayCard({ day, dayIndex, mood, isSelected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(dayIndex)}
      className={`relative p-3 sm:p-4 rounded-xl transition-all duration-300 transform active:scale-95 ${
        mood 
          ? 'bg-gradient-to-br shadow-md hover:shadow-lg' 
          : 'bg-gray-50 active:bg-gray-100'
      } ${isSelected ? 'ring-4 ring-purple-400 scale-105' : ''}`}
      style={mood ? {
        backgroundImage: `linear-gradient(135deg, ${mood.color}15, ${mood.color}30)`
      } : {}}
    >
      <div className="text-center">
        <div className="text-xs font-medium text-gray-600 mb-2">{day}</div>
        {mood ? (
          <>
            <div className="text-2xl sm:text-3xl mb-1">{mood.emoji}</div>
            <div className="text-xs font-medium mt-1 hidden sm:block" style={{ color: mood.color }}>
              {mood.name}
            </div>
          </>
        ) : (
          <div className="text-xl sm:text-2xl text-gray-300">?</div>
        )}
      </div>
    </button>
  );
}
