import Header from '../components/global/Header';
import ViewToggle from '../components/calendar/navigation/ViewToggle';
import WeekNavigation from '../components/calendar/navigation/WeekNavigation';
import MonthNavigation from '../components/calendar/navigation/MonthNavigation';
import WeekOverview from '../components/calendar/views/WeekOverview';
import MonthOverview from '../components/calendar/views/MonthOverview';
import MoodSelectionModal from '../components/mood/MoodSelectionModal';
import StatisticsSection from '../components/analytics/StatisticsSection';
import DarkModeToggle from '../components/global/DarkModeToggle';
import DailyQuote from '../components/global/DailyQuote';
import NotificationManager from '../components/notification/NotificationManager';
import { useMoodData } from '../hooks/useMoodData';
import { useDarkMode } from '../hooks/useDarkMode';
import { useNavigation } from '../hooks/useNavigation';
import { useMoodModal } from '../hooks/useMoodModal';
import { getMoodById, getChartData, getPieData } from '../utils/moodCalculations';
import { getWeekDates, getMonthDates, formatDate, getWeekRange, getMonthName } from '../utils/dateUtils';
import { getBackgroundStyle } from '../utils/colorUtils';
import { MOODS } from '../constants/moods';
import { useState, useEffect } from 'react';

export default function Home() {
  const { moods, updateMood } = useMoodData();
  const { isDark, toggle } = useDarkMode();
  const {
    currentView,
    weekOffset,
    monthOffset,
    isTransitioning,
    slideDirection,
    handleViewChangeWithTransition,
    goToPreviousWeek,
    goToNextWeek,
    goToPreviousMonth,
    goToNextMonth
  } = useNavigation();
  const {
    selectedDate,
    activeDate,
    isModalOpen,
    handleDaySelect,
    handleMoodSelect,
    handleModalClose,
    resetSelection
  } = useMoodModal();

  const today = formatDate(new Date());
  
  const [backgroundMoodId, setBackgroundMoodId] = useState(() => {
    return moods[today] || null;
  });

  useEffect(() => {
    const todaysMood = moods[today];
    setBackgroundMoodId(todaysMood || null);
  }, [moods[today], today]);

  const weekDates = getWeekDates(weekOffset);
  const monthDates = getMonthDates(monthOffset);
  const weekRange = getWeekRange(weekDates);
  const monthName = getMonthName(monthOffset);

  const currentMood = backgroundMoodId ? MOODS.find(m => m.id === backgroundMoodId) : null;
  const currentDates = currentView === 'week' ? weekDates : monthDates;
  
  const getAnimationClass = () => {
    if (!isTransitioning) {
      return 'opacity-100 transform translate-x-0';
    }
    
    if (slideDirection === 'left') {
      return 'opacity-0 transform translate-x-[-100px]';
    } else if (slideDirection === 'right') {
      return 'opacity-0 transform translate-x-[100px]';
    } else {
      return 'opacity-0 transform translate-x-[-20px]';
    }
  };
  
  return (
    <div 
      className="min-h-screen pb-8 transition-all duration-700 ease-in-out"
      style={getBackgroundStyle(currentMood, isDark)}
    >
      <DarkModeToggle isDark={isDark} onToggle={toggle} />
      
      <div className="max-w-4xl mx-auto pt-6 sm:pt-8">
        <Header />
        
        <ViewToggle currentView={currentView} onViewChange={handleViewChangeWithTransition} />
        
        {currentView === 'week' ? (
          <>
            <WeekNavigation
              weekOffset={weekOffset}
              onPrevious={() => goToPreviousWeek(resetSelection)}
              onNext={() => goToNextWeek(resetSelection)}
              weekRange={weekRange}
            />
            
            <div className="px-4 mt-4 relative overflow-hidden">
              <div 
                className={`transition-all duration-300 ease-in-out ${getAnimationClass()}`}
              >
                <WeekOverview 
                  moods={moods}
                  selectedDate={selectedDate}
                  onDaySelect={handleDaySelect}
                  getMoodById={getMoodById}
                  weekDates={weekDates}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <MonthNavigation
              monthOffset={monthOffset}
              onPrevious={() => goToPreviousMonth(resetSelection)}
              onNext={() => goToNextMonth(resetSelection)}
              monthName={monthName}
            />
            
            <div className="px-4 mt-4 relative overflow-hidden">
              <div 
                className={`transition-all duration-300 ease-in-out ${getAnimationClass()}`}
              >
                <MonthOverview 
                  moods={moods}
                  selectedDate={selectedDate}
                  onDaySelect={handleDaySelect}
                  getMoodById={getMoodById}
                  monthDates={monthDates}
                />
              </div>
            </div>
          </>
        )}

        <MoodSelectionModal
          isOpen={isModalOpen}
          selectedDate={selectedDate}
          currentMood={moods[selectedDate]}
          onMoodSelect={(dateKey, moodId) => handleMoodSelect(dateKey, moodId, updateMood)}
          onClose={handleModalClose}
        />

        <StatisticsSection
          chartData={getChartData(moods, currentDates, formatDate)}
          pieData={getPieData(moods, currentDates, formatDate)}
          getMoodById={getMoodById}
          isDark={isDark}
        />

        <div className="px-4 mt-6">
          <DailyQuote selectedDate={activeDate} moods={moods} />
        </div>

        <NotificationManager />
      </div>
    </div>
  );
}