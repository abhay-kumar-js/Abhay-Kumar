import React from 'react';
import { PORTFOLIO_INFO } from '../data/portfolioData';
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react';

interface AboutProps {
  onExploreServices: () => void;
}

export const About: React.FC<AboutProps> = ({ onExploreServices }) => {
  const specializations = [
    { name: 'MERN Stack', desc: 'React, Node.js, Express, MongoDB applications' },
    { name: 'Shopify', desc: 'Custom stores, liquid themes, conversion layouts' },
    { name: 'WordPress', desc: 'Custom CMS, performance, scalable setups' },
    { name: 'SEO', desc: 'Technical SEO, search ranking & Core Web Vitals' },
    { name: 'Graphic Design', desc: 'Digital brand identity, marketing & UI assets' },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative border-t border-slate-800/80 bg-[#070A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-2 font-mono">
            01. Background &amp; Philosophy
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mb-4">
            About Me
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>Based in India</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Serving Global Clients &amp; Companies</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative Prose */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base sm:text-lg">
            <p className="text-white font-medium text-lg sm:text-xl leading-relaxed">
              {PORTFOLIO_INFO.aboutParagraph1}
            </p>

            <p>
              {PORTFOLIO_INFO.aboutParagraph2}
            </p>

            <div className="pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">
                Core Domains of Expertise
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specializations.map((item) => (
                  <div
                    key={item.name}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/90 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                      <span className="font-semibold text-white text-sm">{item.name}</span>
                    </div>
                    <p className="text-xs text-slate-400 pl-6">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onExploreServices}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group"
              >
                <span>Explore all technical services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Statistics Grid with Tabular Numerals */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PORTFOLIO_INFO.stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className={`p-6 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] border border-slate-800 hover:border-blue-500/30 transition-all ${
                    idx === 0 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <p className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight tabular-nums mb-1 bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-slate-200 mb-1">{stat.label}</p>
                  <p className="text-xs text-slate-400 font-mono">{stat.note}</p>
                </div>
              ))}
            </div>

            {/* Quote Card */}
            <div className="mt-4 p-5 rounded-2xl bg-blue-950/20 border border-blue-900/30">
              <p className="text-xs text-blue-200 leading-relaxed italic">
                "Whether launching a flagship e-commerce storefront or engineering a full-stack platform, my objective is clear: deliver measurable speed, user clarity, and real business results."
              </p>
              <p className="mt-2 text-[11px] font-mono text-blue-400 font-semibold">— Abhay Kumar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
