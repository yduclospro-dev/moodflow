import React, { useRef, useState, useEffect } from 'react';
import { Calendar, CalendarDays } from 'lucide-react';

export default function ViewToggle({ currentView, onViewChange }) {
  const weekRef = useRef(null);
  const monthRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      const activeButton = currentView === 'week' ? weekRef.current : monthRef.current;
      if (activeButton) {
        setIndicatorStyle({
          width: activeButton.offsetWidth,
          left: activeButton.offsetLeft
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [currentView]);

  return (
    <div className="flex justify-center mb-6 px-4">
      <div className="inline-flex bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg relative">
        {/* Animated background indicator */}
        <div
          className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-md transition-all duration-300 ease-out"
          style={{
            width: `${indicatorStyle.width}px`,
            transform: `translateX(${indicatorStyle.left}px)`
          }}
        />
        
        <button
          ref={weekRef}
          onClick={() => onViewChange('week')}
          className={`relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
            currentView === 'week'
              ? 'text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span className="text-sm sm:text-base">Semaine</span>
        </button>
        <button
          ref={monthRef}
          onClick={() => onViewChange('month')}
          className={`relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
            currentView === 'month'
              ? 'text-white'
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