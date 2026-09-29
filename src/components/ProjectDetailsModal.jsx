import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Layers,
  Zap,
  Globe,
  Gauge,
  Calendar,
  Share2,
  Code2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/portfolioData.ts';

export const ProjectDetailsModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const techList = project.technologies || project.tags || [];
  const fallbackMatch = PROJECTS.find(
    (p) =>
      p.id === (project.slug || project.id) ||
      p.name.toLowerCase() === (project.title || project.name || '').toLowerCase()
  );
  const highlights = project.highlights || fallbackMatch?.highlights || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.35, bounce: 0.1 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-white dark:bg-[#0E1526] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10 text-slate-900 dark:text-slate-100"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Top Bar Header */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-[#0A0F1D]/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Project Deep Dive &bull; View Details
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close project details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Project Image Banner */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 group">
              {project.image ? (
                <img
                  src={project.image}
                  alt={`${project.title || project.name} mockup`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-400">
                  <Code2 className="w-12 h-12 text-blue-400" />
                </div>
              )}

              {/* Status Pill */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-white/10 text-white text-xs font-mono font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Production Live</span>
              </div>
            </div>

            {/* Title & Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                  {project.category}
                </p>
                <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                  {project.title || project.name}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-all shadow-md shadow-blue-600/30"
                  >
                    <span>Launch Store / App</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <Link
                  to={`/projects/${project.slug || project.id}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 transition-colors"
                >
                  <span>Full Case Study Page</span>
                </Link>
              </div>
            </div>

            {/* Project Overview Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                Project Overview &amp; Objectives
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Applied Tech Stack */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-2.5">
                Technologies &amp; Architecture
              </h3>
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

            {/* Key Deliverables & Engineering Highlights */}
            {highlights && highlights.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
                  Key Deliverables &amp; Impact
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Performance & Quality Benchmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 text-center">
                <p className="text-xl font-bold font-display text-blue-600 dark:text-blue-400">95+</p>
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">PageSpeed Score</p>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-center">
                <p className="text-xl font-bold font-display text-emerald-600 dark:text-emerald-400">&lt; 1.2s</p>
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">LCP Benchmark</p>
              </div>
              <div className="p-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/40 text-center">
                <p className="text-xl font-bold font-display text-cyan-600 dark:text-cyan-400">100%</p>
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">Responsive UI</p>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 text-center">
                <p className="text-xl font-bold font-display text-amber-600 dark:text-amber-400">Clean</p>
                <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">Semantic Code</p>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#0A0F1D]/80 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Verified Production Project by Abhay Kumar
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
