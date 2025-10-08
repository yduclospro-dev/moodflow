import { useState } from 'react';
import { isFutureDate } from '../utils/dateUtils';

export function useMoodModal() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeDate, setActiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleMoodSelect = (dateKey, moodId, updateMood) => {
    const date = new Date(dateKey);
    if (!isFutureDate(date)) {
      updateMood(dateKey, moodId);
      setActiveDate(dateKey);
      setIsModalOpen(false);
      setSelectedDate(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const resetSelection = () => {
    setSelectedDate(null);
    setIsModalOpen(false);
  };

  return {
    selectedDate,
    activeDate,
    isModalOpen,
    handleDaySelect,
    handleMoodSelect,
    handleModalClose,
    resetSelection
  };
}