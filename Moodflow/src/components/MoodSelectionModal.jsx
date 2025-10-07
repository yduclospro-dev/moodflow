import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import MoodButton from './MoodButton';
import { MOODS } from '../constants/moods';

export default function MoodSelectionModal({ isOpen, selectedDate, currentMood, onMoodSelect, onClose }) {
  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Bloquer le scroll
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

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

  const handleMoodClick = (moodId) => {
    onMoodSelect(selectedDate, moodId);
    // Ne pas fermer automatiquement pour permettre de changer d'avis
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex items-start justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
              Comment te sens-tu ?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {dateStr}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
            {MOODS.map(mood => (
              <MoodButton
                key={mood.id}
                mood={mood}
                isSelected={currentMood === mood.id}
                onSelect={handleMoodClick}
                immediateUpdate={true}
              />
            ))}
          </div>
        </div>

        {/* Footer intentionally removed: selection immédiate sur clic d'une humeur */}
      </div>
    </div>
  );
}