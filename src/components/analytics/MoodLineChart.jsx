import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function MoodLineChart({ chartData, getMoodById, isDark }) {
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
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
        Évolution de la semaine
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData} margin={{ left: -20, right: 10, top: 5, bottom: 5 }}>
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
            stroke={isDark ? '#9ca3af' : '#888'}
            style={{ fontSize: '12px' }}
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
  );
}