import React, { useState } from 'react';
import Header from './components/Header';
import ViewToggle from './components/ViewToggle';
import WeekNavigation from './components/WeekNavigation';
import MonthNavigation from './components/MonthNavigation';
import WeekOverview from './components/WeekOverview';
import MonthOverview from './components/MonthOverview';
import MoodSelectionModal from './components/MoodSelectionModal';
import StatisticsSection from './components/StatisticsSection';
import DarkModeToggle from './components/DarkModeToggle';
import QuoteOTD from './components/QuoteOTD';
import { useMoodData } from './hooks/useMoodData';
import { useDarkMode } from './hooks/useDarkMode';
import { getMoodById, getChartData, getPieData } from './utils/moodCalculations';
import { getWeekDates, getMonthDates, formatDate, getWeekRange, getMonthName, isFutureDate } from './utils/dateUtils';
import './index.css';

export default function App() {
  const { moods, updateMood } = useMoodData();
  const { isDark, toggle } = useDarkMode();
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeDate, setActiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('week');
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);

  const weekDates = getWeekDates(weekOffset);
  const monthDates = getMonthDates(monthOffset);
  const weekRange = getWeekRange(weekDates);
  const monthName = getMonthName(monthOffset);

  const handleDaySelect = (dateKey) => {
    if (dateKey) {
      setSelectedDate(dateKey);
      setActiveDate(dateKey);
      setIsModalOpen(true);
    } else {
      setSelectedDate(null);
      setIsModalOpen(false);
    }
  };

  const handleMoodSelect = (dateKey, moodId) => {
    const date = new Date(dateKey);
    if (!isFutureDate(date)) {
      updateMood(dateKey, moodId);
      // Fermer la modal immédiatement après la sélection pour une expérience
      // où le clic sur une humeur applique la modification et ferme l'overlay.
      setActiveDate(dateKey);
      setIsModalOpen(false);
      setSelectedDate(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    setSelectedDate(null);
    setIsModalOpen(false);
  };

  const goToPreviousWeek = () => {
    setWeekOffset(prev => prev - 1);
    setSelectedDate(null);
    setIsModalOpen(false);
  };

  const goToNextWeek = () => {
    if (weekOffset < 0) {
      setWeekOffset(prev => prev + 1);
      setSelectedDate(null);
      setIsModalOpen(false);
    }
  };

  const goToPreviousMonth = () => {
    setMonthOffset(prev => prev - 1);
    setSelectedDate(null);
    setIsModalOpen(false);
  };

  const goToNextMonth = () => {
    if (monthOffset < 0) {
      setMonthOffset(prev => prev + 1);
      setSelectedDate(null);
      setIsModalOpen(false);
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
                onDaySelect={handleDaySelect}
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
                onDaySelect={handleDaySelect}
                getMoodById={getMoodById}
                monthDates={monthDates}
              />
            </div>
          </>
        )}

        <MoodSelectionModal
          isOpen={isModalOpen}
          selectedDate={selectedDate}
          currentMood={moods[selectedDate]}
          onMoodSelect={handleMoodSelect}
          onClose={handleModalClose}
        />

        <StatisticsSection
          chartData={getChartData(moods, currentDates, formatDate)}
          pieData={getPieData(moods, currentDates, formatDate)}
          getMoodById={getMoodById}
          isDark={isDark}
        />

        <div className="px-4 mt-6">
          <QuoteOTD selectedDate={activeDate} moods={moods} />
        </div>
      </div>
    </div>
  );
}