import React from 'react';
import { Sun, Moon } from 'lucide-react';
import type { Theme } from '../types/chat';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 md:top-6 md:right-32 z-50 group p-2 md:p-3 rounded-full 
                 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 
                 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 
                 hover:scale-110 hover:rotate-12 active:scale-95"
      aria-label="Basculer le thème"
    >
      <div className="relative w-5 h-5 md:w-6 md:h-6">
        <Sun 
          className={`absolute inset-0 w-5 h-5 md:w-6 md:h-6 text-yellow-500 transition-all duration-500 transform
                     ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-50'}`}
        />
        <Moon 
          className={`absolute inset-0 w-5 h-5 md:w-6 md:h-6 text-blue-300 transition-all duration-500 transform
                     ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'}`}
        />
      </div>
    </button>
  );
};