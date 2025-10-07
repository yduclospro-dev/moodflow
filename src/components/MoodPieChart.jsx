import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function MoodPieChart({ pieData, isDark }) {
  if (pieData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">Répartition des humeurs</h3>
        <div className="flex items-center justify-center h-48 text-gray-400 dark:text-gray-500 text-sm">
          Pas encore de données pour cette semaine
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">Répartition des humeurs</h3>
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
  );
}