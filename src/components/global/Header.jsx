export default function Header() {
  return (
    <header className="text-center mb-6 px-4">
      <div className="flex items-center justify-center mb-2">
        <img 
          src="/public/assets/moodflow-logo.png" 
          alt="MoodFlow" 
          className="h-12 sm:h-16 w-auto transition-all duration-300 dark:invert"
        />
      </div>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Suivez votre bien-être au quotidien</p>
    </header>
  );
}