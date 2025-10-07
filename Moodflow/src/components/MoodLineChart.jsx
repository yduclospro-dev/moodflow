import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function MoodLineChart({ chartData, getMoodById }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
        Évolution de la semaine
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#888" style={{ fontSize: '12px' }} />
          <YAxis domain={[0, 6]} ticks={[1, 2, 3, 4, 5]} stroke="#888" style={{ fontSize: '12px' }} />
          <Tooltip 
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
            dot={{ fill: '#8b5cf6', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
