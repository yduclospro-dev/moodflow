import React from 'react';
import MoodLineChart from './MoodLineChart';
import MoodPieChart from './MoodPieChart';

export default function StatisticsSection({ showStats, onToggle, chartData, pieData, getMoodById }) {
  return (
    <>
      <div className="flex justify-center mb-4 sm:mb-6 px-4">
        <button
          onClick={onToggle}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-lg active:scale-95 transition-all duration-300 text-sm sm:text-base"
        >
          {showStats ? 'Masquer' : 'Voir'} les statistiques
        </button>
      </div>

      {showStats && (
        <div className="px-4 animate-fade-in">
          <MoodLineChart chartData={chartData} getMoodById={getMoodById} />
          <MoodPieChart pieData={pieData} />
        </div>
      )}
    </>
  );
}