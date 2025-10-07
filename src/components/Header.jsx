import React from 'react';
import { Heart } from 'lucide-react';

export default function Header() {
  return (
    <header className="text-center mb-6 px-4">
      <div className="flex items-center justify-center mb-2">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          MoodFlow
        </h1>
      </div>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Suivez votre bien-être au quotidien</p>
    </header>
  );
}