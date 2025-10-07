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
import { useMoodData } from './hooks/useMoodData';
import { useDarkMode } from './hooks/useDarkMode';
import { getMoodById, getChartData, getPieData } from './utils/moodCalculations';
import { getWeekDates, getMonthDates, formatDate, getWeekRange, getMonthName, isFutureDate } from './utils/dateUtils';
import { MOODS } from './constants/moods';
import './index.css';

/**
 * Transforme une couleur hex en version pastel (plus claire)
 * * @param {string} hex - couleur originale, ex: "#10b981"
 * @param {number} intensity - proportion de la couleur originale (0 = tout blanc, 1 = couleur originale)
 * 
 */
function pastelColor(hex, intensity = 0.1) {
  // intensity = 0.1 → 10% couleur originale, 90% blanc → très pastel
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = Math.round(((bigint >> 16) & 255) * intensity + 255 * (1 - intensity));
  const g = Math.round(((bigint >> 8) & 255) * intensity + 255 * (1 - intensity));
  const b = Math.round((bigint & 255) * intensity + 255 * (1 - intensity));
  return `rgb(${r},${g},${b})`;
}

export default function App() {
  const { moods, updateMood } = useMoodData();
  const { isDark, toggle } = useDarkMode();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('week');
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [lastMoodId, setLastMoodId] = useState(null);

  const weekDates = getWeekDates(weekOffset);
  const monthDates = getMonthDates(monthOffset);
  const weekRange = getWeekRange(weekDates);
  const monthName = getMonthName(monthOffset);

  const currentMood = lastMoodId ? MOODS.find(m => m.id === lastMoodId) : null;
  const bgColor = currentMood ? pastelColor(currentMood.color, 0.5) : '#fdf2f8';

  const handleDaySelect = (dateKey) => {
    if (dateKey) {
      setSelectedDate(dateKey);
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
      setIsModalOpen(false);
      setLastMoodId(moodId);
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
    <div className="min-h-screen pb-8 transition-colors duration-700 ease-in-out"
    style={{ backgroundColor: bgColor }}>
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
            
            <div className="px-4 mt-4">
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
            
            <div className="px-4 mt-4">
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
      </div>
    </div>
  );
}