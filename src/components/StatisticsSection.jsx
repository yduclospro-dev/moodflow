import MoodLineChart from './MoodLineChart';
import MoodPieChart from './MoodPieChart';

export default function StatisticsSection({ chartData, pieData, getMoodById, isDark }) {
  return (
    <div className="px-4">
      <MoodLineChart chartData={chartData} getMoodById={getMoodById} isDark={isDark} />
      <MoodPieChart pieData={pieData} isDark={isDark} />
    </div>
  );
}
