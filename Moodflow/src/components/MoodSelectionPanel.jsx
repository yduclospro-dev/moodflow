import React from 'react';
import MoodButton from './MoodButton';
import { MOODS, DAYS } from '../constants/moods';

export default function MoodSelectionPanel({ selectedDay, currentMood, onMoodSelect }) {
  if (selectedDay === null) return null;

  return (
    <section className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6 animate-slide-in">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
        Comment te sens-tu {DAYS[selectedDay].toLowerCase()} ?
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {MOODS.map(mood => (
          <MoodButton
            key={mood.id}
            mood={mood}
            isSelected={currentMood === mood.id}
            onSelect={(moodId) => onMoodSelect(selectedDay, moodId)}
          />
        ))}
      </div>
    </section>
  );
}
