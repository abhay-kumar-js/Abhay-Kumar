import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Code2,
  Gauge,
  Layers,
  ShoppingBag,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProjectDetailSection = ({ projects = [], activeSlug = null, onSelectProject = null }) => {
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);

  if (!projects || projects.length === 0) return null;

  // Find active project by slug if provided, else use index
  let activeIndex = internalActiveIndex;
  if (activeSlug) {
    const foundIndex = projects.findIndex((p) => (p.slug || p.id) === activeSlug);
    if (foundIndex !== -1) {
      activeIndex = foundIndex;
    }
  }

  const currentProject = projects[activeIndex] || projects[0];
  const techList = currentProject.technologies || currentProject.tags || [];

  const handleSelect = (idx) => {
    setInternalActiveIndex(idx);
    if (onSelectProject) {
      onSelectProject(projects[idx]);
    }
  };

  return (
    <section className="rounded-3xl bg-gradient-to-b from-white to-slate-100 dark:from-[#0E1526] dark:to-[#090D17] border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-900/5 dark:shadow-black/40 space-y-10 transition-colors duration-200">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Case Study &bull; View Details</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
            Project In-Depth Showcase
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
            Select any project below to inspect its architecture, engineering highlights, and live conversion results.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
          {projects.slice(0, 5).map((proj, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={proj._id || proj.slug || idx}
                onClick={() => handleSelect(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {proj.title || proj.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Details Presentation Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject.slug || currentProject.title || activeIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          {/* Left Column: Browser Mockup Frame */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-2xl">
              {/* Browser chrome header */}
              <div className="px-4 py-3 bg-slate-100 dark:bg-[#0A0F1D] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                    {currentProject.url ? new URL(currentProject.url).hostname : 'production-release.web'}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>SSL Secure</span>
                </span>
              </div>

              {/* Mockup Preview Image */}
              <div className="relative aspect-[16/10] overflow-hidden group bg-slate-900">
                {currentProject.image ? (
                  <img
                    src={currentProject.image}
                    alt={`${currentProject.title || currentProject.name} showcase`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-slate-400">
                    <Code2 className="w-12 h-12 text-blue-400 mb-2" />
                    <p className="font-display font-bold text-white text-lg">
                      {currentProject.title || currentProject.name}
                    </p>
                  </div>
                )}

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-white/10 text-white text-xs font-mono font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{currentProject.category}</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
                <p className="text-lg font-bold font-display text-blue-600 dark:text-blue-400">95-100</p>
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">Core Web Vitals</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
                <p className="text-lg font-bold font-display text-emerald-600 dark:text-emerald-400">&lt; 1.2s</p>
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">Load Speed</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
                <p className="text-lg font-bold font-display text-cyan-600 dark:text-cyan-400">100%</p>
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">Mobile Fluidity</p>
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Project Specifications */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                Selected Case Study
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                {currentProject.title || currentProject.name}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
                {currentProject.description}
              </p>
            </div>

            {/* Technologies Applied */}
            <div className="space-y-2">
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Core Technologies &amp; Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {techList.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Engineering Highlights */}
            {currentProject.highlights && currentProject.highlights.length > 0 && (
              <div className="space-y-2.5">
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Key Deliverables
                </p>
                <div className="space-y-2">
                  {currentProject.highlights.map((hl, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {hl}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions CTA buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {currentProject.url && (
                <a
                  href={currentProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-all shadow-md shadow-blue-600/30 hover:-translate-y-0.5"
                >
                  <span>Visit Production Website</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <Link
                to={`/projects/${currentProject.slug || currentProject.id}`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-semibold transition-colors"
              >
                <span>Full Case Study</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default ProjectDetailSection;
