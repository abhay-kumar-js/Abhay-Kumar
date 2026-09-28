import React from 'react';
import { WHY_WORK_WITH_ME } from '../data/portfolioData';
import { Briefcase, Zap, Gauge, ShieldCheck } from 'lucide-react';

export const WhyWorkWithMe: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-blue-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      default:
        return <Zap className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section className="py-20 lg:py-28 relative border-t border-slate-800/80 bg-[#080B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-2 font-mono">
            06. Value Proposition
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mb-4">
            Why Work With Me?
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A developer who treats your website as a revenue and growth asset, not just a technical checklist.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_WORK_WITH_ME.map((card, idx) => (
            <div
              key={card.title}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#0F172A]/80 to-[#0A0F1D]/80 border border-slate-800 hover:border-blue-500/40 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60">
                    {getIcon(card.iconName)}
                  </div>
                  <span className="font-mono text-xs text-slate-400 font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/60">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Guaranteed Quality
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
