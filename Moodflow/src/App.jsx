import React, { useState } from 'react';
import Header from './components/Header';
import WeekOverview from './components/WeekOverview';
import MoodSelectionPanel from './components/MoodSelectionPanel';
import StatisticsSection from './components/StatisticsSection';
import { useMoodData } from './hooks/useMoodData';
import { getMoodById, getChartData, getPieData } from './utils/moodCalculations';
import './index.css';

export default function App() {
  const { moods, updateMood } = useMoodData();
  const [selectedDay, setSelectedDay] = useState(null);
  const [showStats, setShowStats] = useState(false);

  const handleMoodSelect = (dayIndex, moodId) => {
    updateMood(dayIndex, moodId);
    setSelectedDay(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-8">
      <div className="max-w-4xl mx-auto pt-6 sm:pt-8">
        <Header />
        
        <div className="px-4">
          <WeekOverview 
            moods={moods}
            selectedDay={selectedDay}
            onDaySelect={setSelectedDay}
            getMoodById={getMoodById}
          />
        </div>

        <div className="px-4">
          <MoodSelectionPanel
            selectedDay={selectedDay}
            currentMood={moods[selectedDay]}
            onMoodSelect={handleMoodSelect}
          />
        </div>

        <StatisticsSection
          showStats={showStats}
          onToggle={() => setShowStats(!showStats)}
          chartData={getChartData(moods)}
          pieData={getPieData(moods)}
          getMoodById={getMoodById}
        />
      </div>
    </div>
  );
}