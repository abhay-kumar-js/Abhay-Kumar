import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold uppercase tracking-wider rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 focus-visible:outline-blue-500',
    secondary:
      'bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 hover:-translate-y-0.5 focus-visible:outline-slate-400',
    outline:
      'bg-transparent hover:bg-blue-600/10 text-blue-400 hover:text-blue-300 border border-blue-500/50 hover:border-blue-400',
    danger:
      'bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white shadow-md shadow-rose-600/20',
    ghost:
      'bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs px-5 py-2.5 gap-2',
    lg: 'text-sm px-6 py-3.5 gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      <span>{children}</span>
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
};

export default Button;
