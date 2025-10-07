import { useState, useEffect } from 'react';

export function useMoodData() {
  const [moods, setMoods] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('moodTrackerData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMoods(parsed);
      } catch (e) {
        console.error('Error loading data:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('moodTrackerData', JSON.stringify(moods));
    }
  }, [moods, isLoaded]);

  const updateMood = (dateKey, moodId) => {
    setMoods(prev => {
      const newMoods = {
        ...prev,
        [dateKey]: moodId
      };

      return newMoods;
    });
  };

  return { moods, updateMood, selectedDate, setSelectedDate };
}