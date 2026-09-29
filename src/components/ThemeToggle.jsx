import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.jsx';

export const ThemeToggle = ({ className = '', size = 'default', showLabel = false }) => {
  const { theme, isDark, toggleTheme } = useTheme();

  const isSmall = size === 'small';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center gap-2 rounded-xl transition-all cursor-pointer border ${
        isDark
          ? 'bg-slate-900/90 hover:bg-slate-800 text-amber-400 border-slate-800 hover:border-slate-700 shadow-sm'
          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-slate-950 border-slate-300 hover:border-slate-400 shadow-sm'
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
            className="flex items-center justify-center gap-1.5 text-amber-400"
          >
            <Sun className={isSmall ? 'w-4 h-4' : 'w-4 h-4 sm:w-4.5 sm:h-4.5'} />
            {showLabel && <span className="text-xs font-mono font-medium text-slate-200">Light Mode</span>}
          </motion.div>
        ) : (
          <motion.div
            key="moon-icon"
            initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center gap-1.5 text-slate-800 hover:text-slate-950"
          >
            <Moon className={`${isSmall ? 'w-4 h-4' : 'w-4 h-4 sm:w-4.5 sm:h-4.5'} text-blue-600`} />
            {showLabel && <span className="text-xs font-mono font-medium text-slate-800">Dark Mode</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
