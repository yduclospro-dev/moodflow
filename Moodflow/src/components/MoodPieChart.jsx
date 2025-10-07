import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function MoodPieChart({ pieData }) {
  if (pieData.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Répartition des humeurs</h3>
        <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
          Pas encore de données
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Répartition des humeurs</h3>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={60}
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
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
              <span>{item.name}</span>
            </div>
            <span className="font-semibold">{item.value} jour{item.value > 1 ? 's' : ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
}