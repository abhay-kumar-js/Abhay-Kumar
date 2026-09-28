import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code, Server, ShoppingCart, TrendingUp, Paintbrush } from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <Code className="w-4 h-4 text-blue-400" />;
      case 'Backend':
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 'CMS & E-Commerce':
        return <ShoppingCart className="w-4 h-4 text-cyan-400" />;
      case 'Marketing & Optimization':
        return <TrendingUp className="w-4 h-4 text-amber-400" />;
      case 'Design':
        return <Paintbrush className="w-4 h-4 text-rose-400" />;
      default:
        return <Code className="w-4 h-4 text-blue-400" />;
    }
  };

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.category)];

  const displayedCategories =
    activeTab === 'All'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.category === activeTab);

  return (
    <section id="skills" className="py-20 lg:py-28 relative border-t border-slate-800/80 bg-[#080B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-2 font-mono">
            04. Toolset &amp; Technologies
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A battle-tested stack spanning full-stack web development, e-commerce engines, design, and search optimization.
          </p>
        </div>

        {/* Category Filter Controls (Functional Segmented Buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800/80 max-w-2xl mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((catGroup) => (
            <div
              key={catGroup.category}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#0F172A]/80 to-[#0A0F1D]/80 border border-slate-800 hover:border-slate-700 transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-800">
                  <div className="p-2 rounded-lg bg-slate-800/70 border border-slate-700/60">
                    {getCategoryIcon(catGroup.category)}
                  </div>
                  <h3 className="text-base font-bold font-display text-white">
                    {catGroup.category}
                  </h3>
                </div>

                {/* Skills Chips / Badges (Progress-free, unboxed or clean chips) */}
                <div className="flex flex-wrap gap-2">
                  {catGroup.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 hover:border-blue-500/40 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Subdued metric note */}
              <div className="mt-6 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Production Ready</span>
                <span className="text-blue-400 font-semibold">{catGroup.skills.length} competencies</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
