import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
  ShoppingBag,
  Globe,
  Search,
  Palette,
  Gauge,
  Check,
  ArrowRight,
} from 'lucide-react';

export const ServiceCard = ({ service, index }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-blue-500 dark:text-blue-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />;
      case 'Search':
        return <Search className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-rose-500 dark:text-rose-400" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5 text-purple-500 dark:text-purple-400" />;
      default:
        return <Code2 className="w-5 h-5 text-blue-500 dark:text-blue-400" />;
    }
  };

  const number = (index !== undefined ? String(index + 1) : String(service.order || 1)).padStart(2, '0');

  return (
    <div className="flex flex-col justify-between p-7 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F172A]/90 dark:to-[#0A0E1A]/90 border border-slate-200 dark:border-slate-800/90 hover:border-blue-500/50 dark:hover:border-blue-500/40 transition-all duration-200 group shadow-lg shadow-slate-900/5 dark:shadow-none hover:shadow-blue-500/10 hover:-translate-y-1">
      <div>
        {/* Header: Number and Icon */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider">
            {number}
          </span>
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50">
            {getIcon(service.icon)}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2.5 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
          {service.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Features Checklist */}
        {service.features && service.features.length > 0 && (
          <div className="space-y-2 mb-8">
            {service.features.map((feature) => (
              <div key={feature} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <Check className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA to Contact Page with preset */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <Link
          to={`/contact?service=${encodeURIComponent(service.title)}`}
          className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 py-1 transition-colors"
        >
          <span>Start This Project</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
