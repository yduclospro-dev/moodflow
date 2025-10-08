import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { MOODS } from '../../constants/moods';
import { MOODS } from '../../constants/moods';

export default function MoodLineChart({ chartData, getMoodById, isDark }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('moodChartCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const getMoodLabel = (value) => {
    if (isMobile) {
      const mood = MOODS.find(m => m.id === value);
      return mood ? mood.emoji : '';
    } else {
      const moodLabels = {
        1: 'Difficile',
        2: 'Pas terrible',
        3: 'Neutre',
        4: 'Bien',
        5: 'Excellent'
      };
      return moodLabels[value] || '';
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const getMoodLabel = (value) => {
    if (isMobile) {
      const mood = MOODS.find(m => m.id === value);
      return mood ? mood.emoji : '';
    } else {
      const moodLabels = {
        1: 'Difficile',
        2: 'Pas terrible',
        3: 'Neutre',
        4: 'Bien',
        5: 'Excellent'
      };
      return moodLabels[value] || '';
    }
  };

  useEffect(() => {
    localStorage.setItem('moodChartCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderDot = (props) => {
    const { cx, cy, payload } = props;
    if (!payload.humeur || payload.humeur === 0) {
      return null;
    }
    return (
      <circle cx={cx} cy={cy} r={4} key={payload.name} fill="#8b5cf6" />
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={toggleCollapse}
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
          Évolution de la semaine
        </h3>
        <button
          className="text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
          aria-label={isCollapsed ? "Expand chart" : "Collapse chart"}
        >
          {isCollapsed ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronUp className="w-5 h-5" />
          )}
        </button>
      </div>
     
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[300px] opacity-100 mt-3 sm:mt-4'
        }`}
      >
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData} margin={{ right: 10, top: 5, bottom: 5 }}>
          <LineChart data={chartData} margin={{ right: 10, top: 5, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? '#4b5563' : '#f0f0f0'}
            />
            <XAxis
              dataKey="name"
              stroke={isDark ? '#9ca3af' : '#888'}
              style={{ fontSize: '12px' }}
            />
            <YAxis
              domain={[0, 6]}
              ticks={[1, 2, 3, 4, 5]}
              interval={0}
              tickFormatter={getMoodLabel}
              stroke={isDark ? '#9ca3af' : '#888'}
              style={{ fontSize: isMobile ? '16px' : '11px' }}
              width={isMobile ? 30 : 80}
              style={{ fontSize: isMobile ? '16px' : '11px' }}
              width={isMobile ? 30 : 80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#fff',
                border: `1px solid ${isDark ? '#374151' : '#ddd'}`,
                borderRadius: '8px',
                color: isDark ? '#f3f4f6' : '#000'
              }}
              formatter={(value) => {
                const mood = getMoodById(value);
                return mood ? mood.name : 'Non défini';
              }}
            />
            <Line
              type="monotone"
              dataKey="humeur"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={renderDot}
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}