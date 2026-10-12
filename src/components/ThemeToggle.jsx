import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-200 
        text-gray-300 hover:text-white hover:bg-white/10 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10
        light:text-gray-700 light:hover:text-gray-900 light:hover:bg-gray-200
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${className}`}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`w-5 h-5 transition-all duration-300 transform ${
            isDark
              ? 'opacity-0 rotate-90 scale-0 absolute'
              : 'opacity-100 rotate-0 scale-100 text-amber-500'
          }`}
          aria-hidden="true"
        />
        <Moon
          className={`w-5 h-5 transition-all duration-300 transform ${
            isDark
              ? 'opacity-100 rotate-0 scale-100 text-cyan-400'
              : 'opacity-0 -rotate-90 scale-0 absolute'
          }`}
          aria-hidden="true"
        />
      </div>
      <span className="sr-only">
        {isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      </span>
    </button>
  );
};

export default ThemeToggle;
