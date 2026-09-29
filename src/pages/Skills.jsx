import React, { useEffect, useState } from 'react';
import { Code, Server, ShoppingCart, TrendingUp, Paintbrush } from 'lucide-react';

export const Skills = () => {
  useEffect(() => {
    document.title = 'Technical Skills | Abhay Kumar Web Developer';
  }, []);

  const [activeFilter, setActiveFilter] = useState('All');

  const skillGroups = [
    {
      category: 'Frontend',
      description: 'Modern, performant client-side interfaces and responsive typography.',
      icon: Code,
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design', 'Tailwind CSS'],
    },
    {
      category: 'Backend',
      description: 'Robust server logic, RESTful APIs, database schemas, and secure authentication.',
      icon: Server,
      skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'Authentication'],
    },
    {
      category: 'CMS / E-Commerce',
      description: 'Storefront development, custom liquid themes, and scalable content management.',
      icon: ShoppingCart,
      skills: ['Shopify', 'WordPress', 'WooCommerce'],
    },
    {
      category: 'SEO',
      description: 'Organic search visibility, technical crawler accessibility, and Core Web Vitals.',
      icon: TrendingUp,
      skills: [
        'On-Page SEO',
        'Technical SEO',
        'Website Performance',
        'SEO-friendly Architecture',
      ],
    },
    {
      category: 'Design',
      description: 'Brand identity assets, marketing graphics, and responsive UI layouts.',
      icon: Paintbrush,
      skills: ['Graphic Design', 'UI Design', 'Website Design', 'Marketing Creatives'],
    },
  ];

  const categories = ['All', ...skillGroups.map((g) => g.category)];

  const displayedGroups =
    activeFilter === 'All'
      ? skillGroups
      : skillGroups.filter((g) => g.category === activeFilter);

  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-5xl">
        <p className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-2 font-mono">
          Engineering Stack
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-4">
          Technical Skills
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          A battle-tested technology stack spanning full-stack web engineering, e-commerce engines, design, and search optimization.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800/80 max-w-2xl">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeFilter === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedGroups.map((group) => {
          const Icon = group.icon;
          return (
            <div
              key={group.category}
              className="p-7 rounded-2xl bg-gradient-to-b from-[#0F172A]/90 to-[#0A0F1D]/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold font-display text-white">
                      {group.category}
                    </h2>
                    <span className="text-[11px] font-mono text-slate-400">
                      {group.skills.length} core competencies
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  {group.description}
                </p>

                {/* Technology chips without fake percentage bars */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 hover:border-blue-500/40 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Production Standard</span>
                <span className="text-emerald-400">Active Daily</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
