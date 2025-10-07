import { useState } from 'react';

export function useNavigation() {
  const [currentView, setCurrentView] = useState('week');
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleViewChange = (view) => {
    setCurrentView(view);
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

  const goToPreviousWeek = (resetSelection) => {
    setWeekOffset(prev => prev - 1);
    if (resetSelection) resetSelection();
  };

  const goToNextWeek = (resetSelection) => {
    if (weekOffset < 0) {
      setWeekOffset(prev => prev + 1);
      if (resetSelection) resetSelection();
    }
  };

  const goToPreviousMonth = (resetSelection) => {
    setMonthOffset(prev => prev - 1);
    if (resetSelection) resetSelection();
  };

  const goToNextMonth = (resetSelection) => {
    if (monthOffset < 0) {
      setMonthOffset(prev => prev + 1);
      if (resetSelection) resetSelection();
    }
  };

  return {
    currentView,
    weekOffset,
    monthOffset,
    isTransitioning,
    handleViewChangeWithTransition,
    goToPreviousWeek,
    goToNextWeek,
    goToPreviousMonth,
    goToNextMonth
  };
}