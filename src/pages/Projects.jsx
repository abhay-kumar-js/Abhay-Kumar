import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import ProjectCard from '../components/ProjectCard.jsx';
import Loader from '../components/Loader.jsx';
import { Filter } from 'lucide-react';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    document.title = 'Projects | Abhay Kumar Web Developer';

    const fetchProjects = async () => {
      try {
        const res = await api.projects.getAll();
        if (res.data) {
          setProjects(res.data);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-2 font-mono">
          Portfolio &amp; Case Studies
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-4">
          Selected Work
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          A selection of websites, e-commerce storefronts, and digital projects I've built and optimized.
        </p>
      </div>

      {/* Category filter tabs */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800/80 max-w-2xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      {loading ? (
        <Loader message="Loading portfolio from API..." size="large" />
      ) : error ? (
        <div className="p-8 rounded-2xl bg-rose-950/30 border border-rose-800 text-center text-rose-300">
          <p className="text-sm font-semibold">{error}</p>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id || project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
          <p className="text-slate-400 font-mono text-sm">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
