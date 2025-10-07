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
  const hook = useMoodData();
  const effectiveMoods = propMoods || hook.moods;
  const [currentQuote, setCurrentQuote] = useState(defaultQuote);

  useEffect(() => {
    try {
      const effectiveDate = propSelectedDate || new Date().toISOString().split('T')[0];
      const date = new Date(effectiveDate);
      const moodId = effectiveMoods ? effectiveMoods[effectiveDate] : undefined;
      const dayName = getDayName(date);

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

      if (!moodKey || !quotes[dayName] || !quotes[dayName][moodKey]) {
        setCurrentQuote(defaultQuote);
        return;
      }

      setCurrentQuote(quotes[dayName][moodKey]);
    } catch (error) {
      console.error('Erreur dans QuoteOTD:', error);
      setCurrentQuote(defaultQuote);
    }
  }, [propSelectedDate, propMoods, hook.moods]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1 w-10">
          <svg
            className="w-10 h-10 text-indigo-500 dark:text-indigo-400 opacity-95"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9.2 7.5C9.2 5.1 11.1 3 13.5 3v6.5H9.2V7.5zM3.2 7.5C3.2 5.1 5.1 3 7.5 3v6.5H3.2V7.5z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="flex-1">
          <div className="inline-block mx-auto pr-14">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100 text-left">
              La citation du jour
            </h2>

            <div className="mb-4">
              <p
                className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg sm:text-base lg:text-lg italic from-transparent via-indigo-50/40 to-transparent dark:via-indigo-900/20 py-3 rounded text-left"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
              >
                "{currentQuote.quote}"
              </p>
            </div>
          </div>

          {currentQuote.author && (
            <div className="text-indigo-600 dark:text-indigo-300 text-right font-semibold">
              — {currentQuote.author}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default QuoteOTD;