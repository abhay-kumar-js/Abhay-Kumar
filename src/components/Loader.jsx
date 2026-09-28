import React from 'react';

export const Loader = ({ message = 'Loading...', size = 'default' }) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    default: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  }[size] || 'w-8 h-8 border-3';

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-3" role="status">
      <div
        className={`${sizeClasses} border-slate-700 border-t-blue-500 rounded-full animate-spin`}
      />
      {message && <p className="text-xs font-mono text-slate-400">{message}</p>}
      <span className="sr-only">Loading</span>
    </div>
  );
};

export default Loader;
