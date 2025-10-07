import React, { useState } from 'react';
import Header from './components/Header';
import WeekNavigation from './components/WeekNavigation';
import WeekOverview from './components/WeekOverview';
import MoodSelectionPanel from './components/MoodSelectionPanel';
import StatisticsSection from './components/StatisticsSection';
import DarkModeToggle from './components/DarkModeToggle';
import { useMoodData } from './hooks/useMoodData';
import { useDarkMode } from './hooks/useDarkMode';
import { getMoodById, getChartData, getPieData } from './utils/moodCalculations';
import { getWeekDates, formatDate, getWeekRange, isFutureDate } from './utils/dateUtils';
import './index.css';

export default function App() {
  const { moods, updateMood } = useMoodData();
  const { isDark, toggle } = useDarkMode();
  const [selectedDate, setSelectedDate] = useState(null);
  const [weekOffset, setWeekOffset] = useState(0);

  const weekDates = getWeekDates(weekOffset);
  const weekRange = getWeekRange(weekDates);

  const handleMoodSelect = (dateKey, moodId) => {
    // Vérifier si la date n'est pas dans le futur
    const date = new Date(dateKey);
    if (!isFutureDate(date)) {
      updateMood(dateKey, moodId);
      setSelectedDate(null);
    }
  };

  const goToPreviousWeek = () => {
    setWeekOffset(prev => prev - 1);
    setSelectedDate(null);
  };

  const goToNextWeek = () => {
    if (weekOffset < 0) {
      setWeekOffset(prev => prev + 1);
      setSelectedDate(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-8 transition-colors duration-300">
      <DarkModeToggle isDark={isDark} onToggle={toggle} />
      
      <div className="max-w-4xl mx-auto pt-6 sm:pt-8">
        <Header />
        
        <WeekNavigation
          weekOffset={weekOffset}
          onPrevious={goToPreviousWeek}
          onNext={goToNextWeek}
          weekRange={weekRange}
        />
        
        <div className="px-4">
          <WeekOverview 
            moods={moods}
            selectedDate={selectedDate}
            onDaySelect={setSelectedDate}
            getMoodById={getMoodById}
            weekDates={weekDates}
          />
        </div>

        <div className="px-4">
          <MoodSelectionPanel
            selectedDate={selectedDate}
            currentMood={moods[selectedDate]}
            onMoodSelect={handleMoodSelect}
          />
        </div>

        <StatisticsSection
          chartData={getChartData(moods, weekDates, formatDate)}
          pieData={getPieData(moods, weekDates, formatDate)}
          getMoodById={getMoodById}
          isDark={isDark}
        />
      </div>
    </div>
  );
}