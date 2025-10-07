export default function MoodButton({ mood, isSelected, onSelect }) {
  const Icon = mood.icon;
  
  return (
    <button
      onClick={() => onSelect(mood.id)}
      className="p-3 sm:p-4 rounded-xl transition-all duration-300 transform active:scale-95 hover:shadow-lg dark:hover:shadow-gray-700"
      style={{
        backgroundColor: `${mood.color}15`,
        border: isSelected ? `3px solid ${mood.color}` : 'none'
      }}
    >
      <div className="text-center">
        <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{mood.emoji}</div>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2" style={{ color: mood.color }} />
        <div className="text-xs sm:text-sm font-medium" style={{ color: mood.color }}>
          {mood.name}
        </div>
      </div>
    </button>
  );
}