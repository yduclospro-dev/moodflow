import { useState, useEffect } from 'react';

export function useMoodData() {
  const [moods, setMoods] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('moodTrackerData');
    if (saved) {
      try {
        setMoods(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading data:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('moodTrackerData', JSON.stringify(moods));
  }, [moods]);

  const updateMood = (dateKey, moodId) => {
    setMoods(prev => ({
      ...prev,
      [dateKey]: moodId
    }));
  };

  return { moods, updateMood };
}