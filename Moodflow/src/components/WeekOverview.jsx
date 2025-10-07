import React from 'react';
import DayCard from './DayCard';
import { DAYS } from '../constants/moods';

export default function WeekOverview({ moods, selectedDay, onDaySelect, getMoodById }) {
  return (
    <section className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6 transition-all">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Ma Semaine</h2>
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {DAYS.map((day, index) => (
          <DayCard
            key={index}
            day={day}
            dayIndex={index}
            mood={getMoodById(moods[index])}
            isSelected={selectedDay === index}
            onSelect={(idx) => onDaySelect(selectedDay === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  );
}