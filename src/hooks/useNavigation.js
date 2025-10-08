import { useState } from 'react';

export function useNavigation() {
  const [currentView, setCurrentView] = useState('week');
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('none'); // 'left', 'right', or 'none'

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleViewChangeWithTransition = (view) => {
    if (view !== currentView) {
      setIsTransitioning(true);
      setSlideDirection('none');
      setTimeout(() => {
        handleViewChange(view);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 300);
    }
  };

  const goToPreviousWeek = (resetSelection) => {
    setSlideDirection('right');
    setIsTransitioning(true);
    
    setTimeout(() => {
      setWeekOffset(prev => prev - 1);
      setSlideDirection('none');
      setTimeout(() => setIsTransitioning(false), 50);
      if (resetSelection) resetSelection();
    }, 300);
  };

  const goToNextWeek = (resetSelection) => {
    if (weekOffset < 0) {
      setSlideDirection('left');
      setIsTransitioning(true);
      
      setTimeout(() => {
        setWeekOffset(prev => prev + 1);
        setSlideDirection('none');
        setTimeout(() => setIsTransitioning(false), 50);
        if (resetSelection) resetSelection();
      }, 300);
    }
  };

  const goToPreviousMonth = (resetSelection) => {
    setSlideDirection('right');
    setIsTransitioning(true);
    
    setTimeout(() => {
      setMonthOffset(prev => prev - 1);
      setSlideDirection('none');
      setTimeout(() => setIsTransitioning(false), 50);
      if (resetSelection) resetSelection();
    }, 300);
  };

  const goToNextMonth = (resetSelection) => {
    if (monthOffset < 0) {
      setSlideDirection('left');
      setIsTransitioning(true);
      
      setTimeout(() => {
        setMonthOffset(prev => prev + 1);
        setSlideDirection('none');
        setTimeout(() => setIsTransitioning(false), 50);
        if (resetSelection) resetSelection();
      }, 300);
    }
  };

  return {
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
  };
}