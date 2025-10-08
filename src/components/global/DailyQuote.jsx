import { useState, useEffect } from 'react';
import { useMoodData } from '../../hooks/useMoodData';
import { quotes } from '../../constants/quotes';

const getDayName = (date) => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[date.getDay()];
};

const defaultQuote = {
  quote: "Merci de renseigner votre humeur du jour pour accéder à la citation personnalisée du jour.",
  author: "",
  isInfo: true
};

export default function DailyQuote({ moods: propMoods }) {
  const hook = useMoodData();
  const effectiveMoods = propMoods || hook.moods;
  const [currentQuote, setCurrentQuote] = useState(defaultQuote);

  useEffect(() => {
    try {
      const effectiveDate = new Date().toISOString().split('T')[0];
      const date = new Date(effectiveDate);
      const moodId = effectiveMoods ? effectiveMoods[effectiveDate] : undefined;
      const dayName = getDayName(date);

      if (!moodId) {
        setCurrentQuote(defaultQuote);
        return;
      }

      const moodMap = {
        1: 'terrible',
        2: 'bad',
        3: 'neutral',
        4: 'good',
        5: 'excellent'
      };

      const moodKey = moodMap[moodId];

      if (!moodKey || !quotes[dayName] || !quotes[dayName][moodKey]) {
        setCurrentQuote(defaultQuote);
        return;
      }

      setCurrentQuote({ ...quotes[dayName][moodKey], isInfo: false });
    } catch (error) {
      console.error('Erreur dans DailyQuote:', error);
      setCurrentQuote(defaultQuote);
    }
  }, [propMoods, hook.moods]);

  const isInfoMessage = currentQuote.isInfo;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 self-start mt-0">
          {isInfoMessage ? (
            <svg
              className="w-full h-full text-amber-500 dark:text-amber-400"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              style={{ display: 'block' }}
            >
              <path
                fill="currentColor"
                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                style={{ transform: 'scale(0.8)', transformOrigin: 'center' }}
              />
            </svg>
          ) : (
            <svg
              className="w-full h-full text-indigo-500 dark:text-indigo-400 opacity-95"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              style={{ display: 'block' }}
            >
              <path
                d="M9.2 7.5C9.2 5.1 11.1 3 13.5 3v6.5H9.2V7.5zM3.2 7.5C3.2 5.1 5.1 3 7.5 3v6.5H3.2V7.5z"
                fill="currentColor"
                style={{
                  transform: 'scale(1.2) translate(1.5px, 2px)',
                  transformOrigin: 'center'
                }}
              />
            </svg>
          )}
        </div>

        <div className="flex-1">
          <div className="inline-block mx-auto pr-14">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100 text-left">
              La citation du jour
            </h2>

            <div className="mb-4">
              {isInfoMessage ? (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-300 p-3 rounded-md text-left text-sm sm:text-base font-medium">
                  {currentQuote.quote}
                </div>
              ) : (
                <p
                  className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg sm:text-base lg:text-lg italic from-transparent via-indigo-50/40 to-transparent dark:via-indigo-900/20 rounded text-left"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
                >
                  "{currentQuote.quote}"
                </p>
              )}
            </div>
          </div>

          {!isInfoMessage && currentQuote.author && (
            <div className="text-indigo-600 dark:text-indigo-300 text-right font-semibold">
              — {currentQuote.author}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}