import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.jsx';

export const ThemeToggle = ({ className = '', size = 'default' }) => {
  const { theme, isDark, toggleTheme } = useTheme();

  const isSmall = size === 'small';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center rounded-xl transition-all cursor-pointer border ${
        isDark
          ? 'bg-slate-900/90 hover:bg-slate-800 text-amber-400 border-slate-800 hover:border-slate-700 shadow-sm'
          : 'bg-white hover:bg-slate-100 text-blue-600 border-slate-200 hover:border-slate-300 shadow-sm shadow-slate-200'
      } ${
        isSmall ? 'p-1.5' : 'p-2'
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun-icon"
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Sun className={isSmall ? 'w-4 h-4' : 'w-4 h-4 sm:w-4.5 sm:h-4.5'} />
          </motion.div>
        ) : (
          <motion.div
            key="moon-icon"
            initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Moon className={isSmall ? 'w-4 h-4' : 'w-4 h-4 sm:w-4.5 sm:h-4.5'} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
