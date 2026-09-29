import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/portfolioData';
import { ExternalLink, Eye, ArrowUpRight } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="projects" className="py-20 lg:py-28 relative border-t border-slate-800/80 bg-[#070A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-2 font-mono">
            03. Portfolio Showcase
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mb-4">
            Selected Work
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A selection of websites and digital projects I've worked on.
          </p>
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-12 sm:space-y-16">
          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className="rounded-2xl bg-gradient-to-b from-[#0F1626]/90 to-[#0A0E18]/90 border border-slate-800/90 hover:border-slate-700 transition-all duration-300 overflow-hidden shadow-xl shadow-black/40 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
                {/* Visual Preview Container */}
                <div className="lg:col-span-7 relative bg-slate-950 aspect-[16/9] lg:aspect-[16/10] overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
                  {!failedImages[project.id] ? (
                    <img
                      src={project.image}
                      alt={`${project.name} e-commerce website showcase`}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(project.id)}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-900 text-center">
                      <p className="font-display font-bold text-white text-xl mb-2">{project.name}</p>
                      <p className="text-xs text-slate-400 max-w-sm">{project.description}</p>
                    </div>
                  )}
                </div>

                {/* Project Description & Details */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Unboxed Metadata (Zero-Pill Discipline) */}
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
                      <span className="text-blue-400 font-semibold uppercase">Project 0{index + 1}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{project.category}</span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3 tracking-tight">
                      {project.name}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>

                    {/* Technology & Service Tags - Clean unboxed text with bullets */}
                    <div className="mb-8">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Technologies &amp; Scope
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-mono">
                        {project.tags.map((tag, tIdx) => (
                          <React.Fragment key={tag}>
                            <span className="text-slate-200">{tag}</span>
                            {tIdx < project.tags.length - 1 && (
                              <span className="text-slate-600" aria-hidden="true">/</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5"
                    >
                      <span>Visit Website</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-800/70 border border-slate-700/80 rounded-lg transition-colors"
                    >
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Fullscreen Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
