import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Globe, CheckCircle2, Code2 } from 'lucide-react';
import { api } from '../services/api.js';
import Loader from '../components/Loader.jsx';

export const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.projects.getBySlug(slug);
        if (res.data) {
          setProject(res.data);
          document.title = `${res.data.title} | Projects | Abhay Kumar`;
        } else {
          setError('Project not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader message="Loading project specifications..." size="large" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold font-display text-white">Project Not Found</h1>
        <p className="text-slate-400 text-sm">{error || 'The requested project could not be located.'}</p>
        <div className="pt-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold uppercase tracking-wider text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Back button */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase font-semibold">
          <span>{project.category}</span>
          {project.featured && (
            <>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400">Featured Showcase</span>
            </>
          )}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          {project.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Main Preview Image */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video shadow-2xl">
        {!imageError && project.image ? (
          <img
            src={project.image}
            alt={`${project.title} live interface preview`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-900 text-center">
            <Code2 className="w-16 h-16 text-blue-400 mb-3" />
            <p className="text-white font-bold font-display text-xl">{project.title}</p>
            <p className="text-slate-400 text-xs">{project.category}</p>
          </div>
        )}

        {project.url && (
          <div className="absolute bottom-4 right-4">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-black/80 transition-all hover:-translate-y-0.5"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>

      {/* Technical Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-slate-800">
        <div className="md:col-span-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold font-display text-white mb-3">Project Overview</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono mb-3">
              Technologies &amp; Delivery Scope
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-4 space-y-4">
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Live Destination
            </h3>
            <div className="space-y-1">
              <p className="text-xs text-slate-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>External Link</span>
              </p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-blue-400 hover:underline break-all block"
              >
                {project.url}
              </a>
            </div>

            <div className="pt-2">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition-colors"
              >
                <span>Visit Live Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
