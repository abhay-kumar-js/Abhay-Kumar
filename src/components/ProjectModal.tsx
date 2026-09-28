import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Globe } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0B101D] border border-slate-700/80 shadow-2xl shadow-black p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 mb-2">
            {project.category}
          </p>
          <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
            {project.name}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Image Preview Container */}
        <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 mb-6 aspect-video">
          <img
            src={project.image}
            alt={`${project.name} live preview`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute bottom-3 right-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-black/60 transition-colors"
            >
              <span>Visit Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Deliverables & Technology Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Key Engineering Deliverables
            </h4>
            <div className="space-y-2.5">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Technologies &amp; Scope
            </h4>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300 font-mono mb-4">
              {project.tags.map((tag, idx) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Live Destination:</span>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline break-all block"
              >
                {project.url}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
