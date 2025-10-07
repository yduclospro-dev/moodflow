import { Calendar, CalendarDays } from 'lucide-react';

export default function ViewToggle({ currentView, onViewChange }) {
  return (
    <div className="flex justify-center mb-6 px-4">
      <div className="inline-flex bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg">
        <button
          onClick={() => onViewChange('week')}
          className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            currentView === 'week'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span className="text-sm sm:text-base">Semaine</span>
        </button>
        <button
          onClick={() => onViewChange('month')}
          className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            currentView === 'month'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-sm sm:text-base">Mois</span>
        </button>
      </div>
    </div>
  );
}