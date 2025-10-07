import { useState, useEffect } from 'react';

export function useMoodData() {
  const [moods, setMoods] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger les données au montage du composant
  useEffect(() => {
    const saved = localStorage.getItem('moodTrackerData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log('Données chargées:', parsed);
        setMoods(parsed);
      } catch (e) {
        console.error('Error loading data:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder les données à chaque changement (mais pas au premier chargement)
  useEffect(() => {
    if (isLoaded) {
      console.log('Sauvegarde des données:', moods);
      localStorage.setItem('moodTrackerData', JSON.stringify(moods));
    }
  }, [moods, isLoaded]);

  const updateMood = (dateKey, moodId) => {
    setMoods(prev => {
      const newMoods = {
        ...prev,
        [dateKey]: moodId
      };
      console.log('Mise à jour:', dateKey, moodId, newMoods);
      return newMoods;
    });
  };

  return { moods, updateMood, selectedDate, setSelectedDate };
}