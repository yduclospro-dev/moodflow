import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MonthNavigation({ monthOffset, onPrevious, onNext, monthName }) {
  return (
    <div className="flex items-center justify-between mb-4 px-4">
      <button
        onClick={onPrevious}
        className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
        aria-label="Mois précédent"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
      
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 capitalize">
          {monthName}
        </h2>
        {monthOffset === 0 && (
          <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
            Ce mois-ci
          </span>
        )}
      </div>
      
      <button
        onClick={onNext}
        disabled={monthOffset === 0}
        className={`p-2 rounded-lg shadow-md transition-all duration-300 ${
          monthOffset === 0
            ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50'
            : 'bg-white dark:bg-gray-800 hover:shadow-lg active:scale-95'
        }`}
        aria-label="Mois suivant"
      >
        <ChevronRight className={`w-5 h-5 ${
          monthOffset === 0 
            ? 'text-gray-400' 
            : 'text-gray-700 dark:text-gray-300'
        }`} />
      </button>
    </div>
  );
}