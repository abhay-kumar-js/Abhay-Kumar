import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Code2, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData.ts';

export const ProjectCard = ({ project, onViewDetails }) => {
  const [imageError, setImageError] = useState(false);
  const [fallbackAttempt, setFallbackAttempt] = useState(0);

  // Normalize image path so that both /assets/images/, /src/assets/images/ and Netlify preview resolve properly
  const getNormalizedImage = () => {
    if (!project.image) return '';
    let img = project.image.replace(/^\/src\/assets\/images\//, '/assets/images/');
    if (fallbackAttempt === 1) {
      // Netlify relative fallback
      const filename = img.split('/').pop();
      return `/assets/images/${filename}`;
    }
    return img;
  };

  const resolvedImage = getNormalizedImage();

  const handleImageError = () => {
    if (fallbackAttempt === 0 && project.image) {
      setFallbackAttempt(1);
    } else {
      setImageError(true);
    }
  };

  // Retrieve brief highlights from project object or fallback to portfolio data
  const fallbackMatch = PROJECTS.find(
    (p) =>
      p.id === (project.slug || project.id) ||
      p.name.toLowerCase() === (project.title || project.name || '').toLowerCase()
  );
  let highlights = project.highlights || fallbackMatch?.highlights || [];
  if ((!highlights || highlights.length === 0) && project.description) {
    const sentences = project.description.split('.').map((s) => s.trim()).filter((s) => s.length > 10);
    highlights = sentences.slice(0, 2);
  }

  const handleDetailsClick = (e) => {
    if (onViewDetails) {
      e.preventDefault();
      onViewDetails(project);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{
        y: -8,
        transition: { type: 'spring', stiffness: 350, damping: 22 },
      }}
      whileTap={{ scale: 0.985 }}
      className="rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F1626]/95 dark:to-[#0A0E18]/95 border border-slate-200 dark:border-slate-800/90 hover:border-blue-500/60 dark:hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/10 transition-colors duration-300 overflow-hidden shadow-md shadow-slate-900/5 dark:shadow-xl dark:shadow-black/40 flex flex-col justify-between group"
    >
      <div>
        {/* Preview Image Container - subtle motion zoom without obstructing overlay */}
        <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-950 overflow-hidden border-b border-slate-200 dark:border-slate-800/80">
          {!imageError && resolvedImage ? (
            <motion.img
              key={resolvedImage}
              src={resolvedImage}
              alt={`${project.title || project.name} project showcase`}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover object-top will-change-transform"
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
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-blue-600/90 backdrop-blur-md text-[11px] font-mono font-semibold text-white uppercase tracking-wider shadow-md"
            >
              Featured
            </motion.div>
          )}
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

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Brief View Details & Highlights Section */}
          {highlights && highlights.length > 0 && (
            <div className="mb-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-semibold">
                Brief Specifications &amp; Scope:
              </p>
              <ul className="space-y-1.5">
                {highlights.slice(0, 2).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-snug">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {(project.technologies || project.tags || []).map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.08, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40 cursor-default transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-6 pb-6 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
        {onViewDetails ? (
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDetailsClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-white transition-colors cursor-pointer group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
          </motion.button>
        ) : (
          <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.97 }}>
            <Link
              to={`/projects/${project.slug || project.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-white transition-colors group/btn"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        )}

        {project.url && (
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-600/10 hover:bg-blue-600 text-blue-600 dark:text-blue-400 hover:text-white text-xs font-semibold uppercase tracking-wider border border-blue-200 dark:border-blue-500/20 hover:border-blue-500 transition-all shadow-xs hover:shadow-md hover:shadow-blue-500/20"
          >
            <span>Visit</span>
            <ExternalLink className="w-3 h-3" />
          </motion.a>
        )}
      </div>
    </motion.article>
  );
};

export default ProjectCard;
