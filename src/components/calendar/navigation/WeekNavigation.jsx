import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function WeekNavigation({ weekOffset, onPrevious, onNext, weekRange }) {
  return (
    <div className="flex items-center justify-between mb-4 px-4">
      <button
        onClick={onPrevious}
        className="p-2 rounded-lg bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
        aria-label="Semaine précédente"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
      
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {weekRange}
        </h2>
        {weekOffset === 0 && (
          <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
            Cette semaine
          </span>
        )}
      </div>
      
      <button
        onClick={onNext}
        disabled={weekOffset === 0}
        className={`p-2 rounded-lg shadow-md transition-all duration-300 ${
          weekOffset === 0
            ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed opacity-50'
            : 'bg-white dark:bg-gray-700 cursor-pointer hover:shadow-lg active:scale-95'
        }`}
        aria-label="Semaine suivante"
      >
        <ChevronRight className={`w-5 h-5 ${
          weekOffset === 0 
            ? 'text-gray-400' 
            : 'text-gray-700 dark:text-gray-300'
        }`} />
      </button>
    </div>
  );
}