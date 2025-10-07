import React, { useState } from 'react';
import Header from './components/Header';
import ViewToggle from './components/ViewToggle';
import WeekNavigation from './components/WeekNavigation';
import MonthNavigation from './components/MonthNavigation';
import WeekOverview from './components/WeekOverview';
import MonthOverview from './components/MonthOverview';
import MoodSelectionPanel from './components/MoodSelectionPanel';
import StatisticsSection from './components/StatisticsSection';
import DarkModeToggle from './components/DarkModeToggle';
import { useMoodData } from './hooks/useMoodData';
import { useDarkMode } from './hooks/useDarkMode';
import { getMoodById, getChartData, getPieData } from './utils/moodCalculations';
import { getWeekDates, getMonthDates, formatDate, getWeekRange, getMonthName, isFutureDate } from './utils/dateUtils';
import './index.css';

export default function App() {
  const { moods, updateMood } = useMoodData();
  const { isDark, toggle } = useDarkMode();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentView, setCurrentView] = useState('week'); // 'week' ou 'month'
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);

  const weekDates = getWeekDates(weekOffset);
  const monthDates = getMonthDates(monthOffset);
  const weekRange = getWeekRange(weekDates);
  const monthName = getMonthName(monthOffset);

  const handleMoodSelect = (dateKey, moodId) => {
    const date = new Date(dateKey);
    if (!isFutureDate(date)) {
      updateMood(dateKey, moodId);
      setSelectedDate(null);
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    setSelectedDate(null);
  };

  // Navigation semaine
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

  // Navigation mois
  const goToPreviousMonth = () => {
    setMonthOffset(prev => prev - 1);
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    if (monthOffset < 0) {
      setMonthOffset(prev => prev + 1);
      setSelectedDate(null);
    }
  };

  const currentDates = currentView === 'week' ? weekDates : monthDates;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-8 transition-colors duration-300">
      <DarkModeToggle isDark={isDark} onToggle={toggle} />
      
      <div className="max-w-4xl mx-auto pt-6 sm:pt-8">
        <Header />
        
        <ViewToggle currentView={currentView} onViewChange={handleViewChange} />
        
        {currentView === 'week' ? (
          <>
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
          </>
        ) : (
          <>
            <MonthNavigation
              monthOffset={monthOffset}
              onPrevious={goToPreviousMonth}
              onNext={goToNextMonth}
              monthName={monthName}
            />
            
            <div className="px-4">
              <MonthOverview 
                moods={moods}
                selectedDate={selectedDate}
                onDaySelect={setSelectedDate}
                getMoodById={getMoodById}
                monthDates={monthDates}
              />
            </div>
          </>
        )}

        <div className="px-4">
          <MoodSelectionPanel
            selectedDate={selectedDate}
            currentMood={moods[selectedDate]}
            onMoodSelect={handleMoodSelect}
          />
        </div>

        <StatisticsSection
          chartData={getChartData(moods, currentDates, formatDate)}
          pieData={getPieData(moods, currentDates, formatDate)}
          getMoodById={getMoodById}
          isDark={isDark}
        />
      </div>
    </div>
  );
}