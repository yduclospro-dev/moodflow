import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function MoodPieChart({ pieData, isDark }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Add CSS to remove focus outline from chart elements
    const style = document.createElement('style');
    style.textContent = `
      .recharts-surface:focus,
      .recharts-wrapper:focus,
      .recharts-sector:focus {
        outline: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (pieData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
        <div 
          className="flex items-center justify-between cursor-pointer select-none"
          onClick={toggleCollapse}
        >
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
              <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
            </svg>
            Répartition des humeurs
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
          <div className="flex items-center justify-center h-48 text-gray-400 dark:text-gray-500 text-sm">
            Pas encore de données pour cette semaine
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
      <div 
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={toggleCollapse}
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
          <svg className="w-5 h-5 mr-2 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
            <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
          </svg>
          Répartition des humeurs
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
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100 mt-3 sm:mt-4'
        }`}
      >
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={60}
              dataKey="value"
              label={{
                fill: isDark ? '#f3f4f6' : '#000',
                fontSize: 12
              }}
              stroke="none"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#fff',
                border: `1px solid ${isDark ? '#374151' : '#ddd'}`,
                borderRadius: '8px',
                color: isDark ? '#f3f4f6' : '#000'
              }}
              itemStyle={{
                color: isDark ? '#f3f4f6' : '#000'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded mr-2" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{item.value} jour{item.value > 1 ? 's' : ''}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}