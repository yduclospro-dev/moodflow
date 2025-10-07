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
import { MOODS } from './constants/moods';
import './index.css';

/**
 * Transform a hex color into a pastel (lighter) or dark variant
 * @param {string} hex - original color, e.g., "#10b981"
 * @param {number} intensity - proportion of original color (0 = all white/black, 1 = original color)
 * @param {boolean} isDark - whether to create a dark variant instead of pastel
 */
function dynamicColor(hex, intensity = 1, isDark = false) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  
  if (isDark) {
    // Mix with dark gray/black for dark mode
    const newR = Math.round(r * intensity * 0.3);
    const newG = Math.round(g * intensity * 0.3);
    const newB = Math.round(b * intensity * 0.3);
    return `rgb(${newR},${newG},${newB})`;
  } else {
    // Mix with white for super pastel (light mode) - only 15% color, 85% white
    const colorIntensity = intensity * 0.15;
    const newR = Math.round(r * colorIntensity + 255 * (1 - colorIntensity));
    const newG = Math.round(g * colorIntensity + 255 * (1 - colorIntensity));
    const newB = Math.round(b * colorIntensity + 255 * (1 - colorIntensity));
    return `rgb(${newR},${newG},${newB})`;
  }
}

export default function App() {
  const { moods, updateMood } = useMoodData();
  const { isDark, toggle } = useDarkMode();
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeDate, setActiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('week');
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lastMoodId, setLastMoodId] = useState(null);

  const weekDates = getWeekDates(weekOffset);
  const monthDates = getMonthDates(monthOffset);
  const weekRange = getWeekRange(weekDates);
  const monthName = getMonthName(monthOffset);

  // Dynamic background based on last selected mood
  const currentMood = lastMoodId ? MOODS.find(m => m.id === lastMoodId) : null;
  
  const getBackgroundStyle = () => {
    if (!currentMood) {
      return isDark 
        ? { backgroundColor: 'rgb(17, 24, 39)' }
        : { backgroundColor: '#fdf2f8' };
    }
    
    if (isDark) {
      // Dark mode: gradient from default dark bg to mood color (slightly dimmed)
      const bigint = parseInt(currentMood.color.replace('#', ''), 16);
      const r = Math.round(((bigint >> 16) & 255) * 0.5);
      const g = Math.round(((bigint >> 8) & 255) * 0.5);
      const b = Math.round((bigint & 255) * 0.5);
      const moodColor = `rgb(${r}, ${g}, ${b})`;
      return {
        background: `linear-gradient(135deg, rgb(17, 24, 39) 0%, ${moodColor} 100%)`
      };
    } else {
      // Light mode: solid pastel color
      return {
        backgroundColor: dynamicColor(currentMood.color, 0.5, false)
      };
    }
  };

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

  const handleViewChangeWithTransition = (view) => {
    if (view !== currentView) {
      setIsTransitioning(true);
      setTimeout(() => {
        handleViewChange(view);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 300);
    }
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
    <div 
      className="min-h-screen pb-8 transition-all duration-700 ease-in-out"
      style={getBackgroundStyle()}
    >
      <DarkModeToggle isDark={isDark} onToggle={toggle} />
      
      <div className="max-w-4xl mx-auto pt-6 sm:pt-8">
        <Header />
        
        <ViewToggle currentView={currentView} onViewChange={handleViewChangeWithTransition} />
        
        <div className="relative overflow-hidden">
          <div 
            className={`transition-all duration-300 ease-in-out ${
              isTransitioning 
                ? 'opacity-0 transform translate-x-[-20px]' 
                : 'opacity-100 transform translate-x-0'
            }`}
          >
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
          </div>
        </div>

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