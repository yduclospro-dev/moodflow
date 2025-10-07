import React from 'react';
import MoodButton from './MoodButton';
import { MOODS } from '../constants/moods';

export default function MoodSelectionPanel({ selectedDate, currentMood, onMoodSelect }) {
  if (!selectedDate) return null;

  const date = new Date(selectedDate);
  const dateStr = date.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  return (
    <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6 animate-slide-in">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
        Comment te sens-tu le {dateStr} ?
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {MOODS.map(mood => (
          <MoodButton
            key={mood.id}
            mood={mood}
            isSelected={currentMood === mood.id}
            onSelect={(moodId) => onMoodSelect(selectedDate, moodId)}
          />
        ))}
      </div>
    </section>
  );
}
