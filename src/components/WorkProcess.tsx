import React from 'react';
import { WORK_PROCESS } from '../data/portfolioData';
import { ArrowRight } from 'lucide-react';

export const WorkProcess: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 relative border-t border-slate-800/80 bg-[#070A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-2 font-mono">
            07. Collaboration Methodology
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mb-4">
            How I Work
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A clear, collaborative four-stage engineering process designed for transparency and zero surprises.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {WORK_PROCESS.map((step, idx) => (
            <div
              key={step.step}
              className="relative p-6 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <span className="font-mono text-sm font-bold text-blue-400">
                    Step {step.step}
                  </span>
                  {idx < WORK_PROCESS.length - 1 && (
                    <ArrowRight className="hidden lg:block w-4 h-4 text-slate-400" />
                  )}
                </div>

                <h3 className="text-xl font-bold font-display text-white mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60">
                <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Deliverables
                </p>
                <p className="text-xs text-slate-400 leading-tight">
                  {step.deliverables}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
