import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../services/api.js';
import { PROJECTS } from '../data/portfolioData.ts';
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectCategoryFilter, { matchesProjectCategory } from '../components/ProjectCategoryFilter.jsx';
import Loader from '../components/Loader.jsx';
import { Sparkles, Layers } from 'lucide-react';

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
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('API fetch failed, falling back to static portfolio data:', err.message);
      }

      // Fallback to static portfolio data
      const fallbackList = PROJECTS.map((p, index) => ({
        _id: `proj_${index + 1}`,
        title: p.name,
        slug: p.id,
        description: p.description,
        category: p.category,
        image: p.image,
        url: p.url,
        technologies: p.tags,
        featured: true,
      }));
      setProjects(fallbackList);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) => matchesProjectCategory(p, selectedCategory));

  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Portfolio &amp; Case Studies</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-3">
            Selected Work
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Explore scalable MERN applications, high-converting Shopify storefronts, bespoke WordPress sites, and Core Web Vitals optimization projects.
          </p>
        </div>

        {/* Total stats pill */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl self-start md:self-auto">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>Showing <strong className="text-white">{filteredProjects.length}</strong> of {projects.length} Projects</span>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Filter by Technology Stack:</span>
          <span className="sm:hidden text-[11px] text-blue-400">{filteredProjects.length} projects</span>
        </div>
        <ProjectCategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          projects={projects}
        />
      </div>

      {/* Projects Grid */}
      {loading ? (
        <Loader message="Loading portfolio from API..." size="large" />
      ) : error ? (
        <div className="p-8 rounded-2xl bg-rose-950/30 border border-rose-800 text-center text-rose-300">
          <p className="text-sm font-semibold">{error}</p>
        </div>
      ) : filteredProjects.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id || project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
          <p className="text-slate-400 font-mono text-sm">No projects found for "{selectedCategory}".</p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-mono font-semibold hover:bg-blue-500 transition-colors"
          >
            Reset Filter to All
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
