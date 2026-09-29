import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, Code2, Eye } from 'lucide-react';

export const ProjectCard = ({ project, onViewDetails }) => {
  const [imageError, setImageError] = useState(false);

  const handleDetailsClick = (e) => {
    if (onViewDetails) {
      e.preventDefault();
      onViewDetails(project);
    }
  };

  return (
    <article className="rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F1626]/90 dark:to-[#0A0E18]/90 border border-slate-200 dark:border-slate-800/90 hover:border-blue-500/50 dark:hover:border-blue-500/40 transition-all duration-300 overflow-hidden shadow-lg shadow-slate-900/5 dark:shadow-xl dark:shadow-black/40 flex flex-col justify-between group hover:-translate-y-1">
      <div>
        {/* Preview Image Container */}
        <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-950 overflow-hidden border-b border-slate-200 dark:border-slate-800/80">
          {!imageError && project.image ? (
            <img
              src={project.image}
              alt={`${project.title || project.name} project showcase`}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-100 dark:bg-slate-900 text-center">
              <Code2 className="w-10 h-10 text-blue-500 dark:text-blue-400 mb-2 stroke-1" />
              <p className="font-display font-bold text-slate-900 dark:text-white text-base">
                {project.title || project.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{project.category}</p>
            </div>
          )}

          {project.featured && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-blue-600/90 backdrop-blur-md text-[11px] font-mono font-semibold text-white uppercase tracking-wider shadow-md">
              Featured
            </div>
          )}

          {/* Quick Details Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-xl bg-blue-600/95 backdrop-blur-md text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg">
              <Eye className="w-3.5 h-3.5" />
              <span>View Details</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase font-semibold mb-2">
            {project.category}
          </div>

          <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
            {onViewDetails ? (
              <button
                onClick={handleDetailsClick}
                className="text-left hover:underline decoration-blue-500/40 cursor-pointer"
              >
                {project.title || project.name}
              </button>
            ) : (
              <Link to={`/projects/${project.slug || project.id}`}>
                {project.title || project.name}
              </Link>
            )}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {(project.technologies || project.tags || []).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-6 pb-6 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
        {onViewDetails ? (
          <button
            onClick={handleDetailsClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-white transition-colors cursor-pointer group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        ) : (
          <Link
            to={`/projects/${project.slug || project.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-white transition-colors group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        )}

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-600/10 hover:bg-blue-600 text-blue-600 dark:text-blue-400 hover:text-white text-xs font-semibold uppercase tracking-wider border border-blue-200 dark:border-blue-500/20 hover:border-blue-500 transition-all"
          >
            <span>Visit</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
