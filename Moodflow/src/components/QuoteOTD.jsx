import React, { useState, useEffect } from 'react';
import { useMoodData } from '../hooks/useMoodData';
import { quotes } from '../constants/quotes';

const getDayName = (date) => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[date.getDay()];
};

const defaultQuote = {
  quote: "Merci de renseigner votre humeur du jour pour accéder à la citation du jour personnalisée",
  author: ""
};

const QuoteOTD = ({ selectedDate: propSelectedDate, moods: propMoods }) => {
  // fallback to hook-based moods if no prop provided
  const hook = useMoodData();
  const effectiveMoods = propMoods || hook.moods;
  const [currentQuote, setCurrentQuote] = useState(defaultQuote);

  useEffect(() => {
    try {
      // Si pas de date sélectionnée, utiliser la date du jour
      const effectiveDate = propSelectedDate || new Date().toISOString().split('T')[0];
      const date = new Date(effectiveDate);
      const moodId = effectiveMoods[effectiveDate];
      const dayName = getDayName(date);

      // Si pas d'humeur enregistrée pour cette date
      if (!moodId) {
        setCurrentQuote(defaultQuote);
        return;
      }

      const moodMap = {
        1: 'excellent',
        2: 'good',
        3: 'neutral',
        4: 'bad',
        5: 'terrible'
      };

      const moodKey = moodMap[moodId];

      // Vérifier que l'humeur est valide et qu'une citation existe
      if (!moodKey || !quotes[dayName] || !quotes[dayName][moodKey]) {
        setCurrentQuote(defaultQuote);
        return;
      }

      // Mettre à jour la citation
      setCurrentQuote(quotes[dayName][moodKey]);
    } catch (error) {
      console.error('Erreur dans QuoteOTD:', error);
      setCurrentQuote(defaultQuote);
    }
  }, [propSelectedDate, propMoods, hook.moods]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        La citation du jour
      </h2>
      <div className="text-gray-600 dark:text-gray-300 mb-4 italic">
        "{currentQuote.quote}"
      </div>
      {currentQuote.author && (
        <div className="text-gray-500 dark:text-gray-400 text-right">
          — {currentQuote.author}
        </div>
      )}
    </div>
  );
};

export default QuoteOTD;