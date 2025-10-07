import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import MoodButton from './MoodButton';
import { MOODS } from '../constants/moods';

export default function MoodModal({ isOpen, onClose, selectedDate, currentMood, onMoodSelect }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !selectedDate) return null;

  const date = new Date(selectedDate);
  const dateStr = date.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long',
    year: 'numeric'
  });

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
              Comment te sens-tu ?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 capitalize">
              {dateStr}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Body - Mood Selection */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {MOODS.map(mood => (
              <MoodButton
                key={mood.id}
                mood={mood}
                isSelected={currentMood === mood.id}
                onSelect={(moodId) => {
                  onMoodSelect(selectedDate, moodId);
                  onClose();
                }}
              />
            ))}
          </div>
        </div>

        {/* Footer - Optional: Delete option if mood exists */}
        {currentMood && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <button
              onClick={() => {
                onMoodSelect(selectedDate, null);
                onClose();
              }}
              className="w-full py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              Supprimer l'humeur
            </button>
          </div>
        )}
      </div>
    </div>
  );
}