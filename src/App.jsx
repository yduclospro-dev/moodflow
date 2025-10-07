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
import { useNavigation } from './hooks/useNavigation';
import { useMoodModal } from './hooks/useMoodModal';
import { getMoodById, getChartData, getPieData } from './utils/moodCalculations';
import { getWeekDates, getMonthDates, formatDate, getWeekRange, getMonthName } from './utils/dateUtils';
import { getBackgroundStyle } from './utils/colorUtils';
import { MOODS } from './constants/moods';
import './index.css';

export default function App() {
  const { moods, updateMood } = useMoodData();
  const { isDark, toggle } = useDarkMode();
  const {
    currentView,
    weekOffset,
    monthOffset,
    isTransitioning,
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
    lastMoodId,
    handleDaySelect,
    handleMoodSelect,
    handleModalClose,
    resetSelection
  } = useMoodModal();

  const weekDates = getWeekDates(weekOffset);
  const monthDates = getMonthDates(monthOffset);
  const weekRange = getWeekRange(weekDates);
  const monthName = getMonthName(monthOffset);

  // Dynamic background based on last selected mood
  const currentMood = lastMoodId ? MOODS.find(m => m.id === lastMoodId) : null;

  const currentDates = currentView === 'week' ? weekDates : monthDates;

  return (
    <div 
      className="min-h-screen pb-8 transition-all duration-700 ease-in-out"
      style={getBackgroundStyle(currentMood, isDark)}
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
                  onPrevious={() => goToPreviousWeek(resetSelection)}
                  onNext={() => goToNextWeek(resetSelection)}
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
                  onPrevious={() => goToPreviousMonth(resetSelection)}
                  onNext={() => goToNextMonth(resetSelection)}
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
          <QuoteOTD selectedDate={activeDate} moods={moods} />
        </div>
      </div>
    </div>
  );
}