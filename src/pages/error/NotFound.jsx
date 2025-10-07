import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';
import DarkModeToggle from '../../components/global/DarkModeToggle';

export default function NotFound() {
  const navigate = useNavigate();
  const { isDark, toggle } = useDarkMode();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <DarkModeToggle isDark={isDark} onToggle={toggle} />
      
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="text-8xl mb-6">
            😵‍💫
          </div>
          
          <h1 className={`text-6xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            404
          </h1>
          
          <h2 className={`text-2xl font-semibold mb-4 ${
            isDark ? 'text-purple-300' : 'text-purple-600'
          }`}>
            Page introuvable
          </h2>
          
          <p className={`text-lg mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Oups ! La page que vous cherchez semble avoir disparu dans les méandres de vos émotions... 
            Retournons à votre suivi d'humeur !
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoHome}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                isDark
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg'
                  : 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg'
              }`}
            >
              <Home className="w-5 h-5 mr-2" />
              Retour à l'accueil
            </button>
          </div>
          
          <div className={`mt-8 p-4 rounded-lg ${
            isDark 
              ? 'bg-purple-800/30 border border-purple-700/50' 
              : 'bg-purple-100 border border-purple-200'
          }`}>
            <p className={`text-sm italic ${
              isDark ? 'text-purple-200' : 'text-purple-700'
            }`}>
              "Même dans la confusion, chaque pas nous rapproche de la clarté." 💜
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}