import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Terminal,
  Code2,
  Sparkles,
  Zap,
  Globe,
  Briefcase,
  Download,
} from 'lucide-react';
import { api } from '../services/api.js';
import { PROJECTS } from '../data/portfolioData.ts';
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectCategoryFilter, { matchesProjectCategory } from '../components/ProjectCategoryFilter.jsx';
import ProjectDetailsModal from '../components/ProjectDetailsModal.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import TestimonialCarousel from '../components/TestimonialCarousel.jsx';
import GitHubActivitySection from '../components/GitHubActivitySection.jsx';
import TechStackSection from '../components/TechStackSection.jsx';
import FAQSection from '../components/FAQSection.jsx';
import FeatureSection from '../components/FeatureSection/FeatureSection.jsx';
import Loader from '../components/Loader.jsx';

export const Home = () => {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.title = 'Abhay Kumar | Web Developer | MERN Stack, Shopify & WordPress';

    const loadData = async () => {
      try {
        const [projRes, servRes] = await Promise.all([
          api.projects.getAll().catch(() => ({ data: [] })),
          api.services.getAll().catch(() => ({ data: [] })),
        ]);

        if (projRes.data && projRes.data.length > 0) {
          setProjects(projRes.data);
        } else {
          // Fallback to rich static projects list
          setProjects(
            PROJECTS.map((p, idx) => ({
              _id: `proj_${idx + 1}`,
              title: p.name,
              slug: p.id,
              description: p.description,
              category: p.category,
              image: p.image,
              url: p.url,
              technologies: p.tags,
              highlights: p.highlights,
              featured: true,
            }))
          );
        }

        if (servRes.data && servRes.data.length > 0) {
          setServices(servRes.data.filter((s) => s.active !== false));
        }
      } catch (err) {
        console.error('Home data load error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProjects = projects.filter((p) => matchesProjectCategory(p, selectedCategory));
  const displayProjects = filteredProjects.slice(0, 6);
  const highlightServices = services.slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      {/* Interactive Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-12 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 shadow-sm mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-medium text-slate-800 dark:text-slate-200">Available for New Projects</span>
                <span className="text-slate-400 dark:text-slate-500" aria-hidden="true">·</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold font-mono">3+ Years Experience</span>
              </div>

              {/* Sleek, responsive hierarchy */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-[1.2] mb-5 max-w-3xl text-balance">
                Building Modern Websites &amp; Digital Experiences That Grow Businesses.
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 max-w-2xl">
                I'm Abhay Kumar, a Web Developer with 3+ years of experience building modern websites, e-commerce stores, and high-performance full-stack web applications.
              </p>

              {/* Technologies Line */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mb-8 border-l-2 border-blue-500 pl-4 py-1">
                <span className="text-slate-800 dark:text-slate-200 font-semibold">MERN Stack</span>
                <span className="text-blue-500" aria-hidden="true">•</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">Shopify</span>
                <span className="text-blue-500" aria-hidden="true">•</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">WordPress</span>
                <span className="text-blue-500" aria-hidden="true">•</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">SEO</span>
                <span className="text-blue-500" aria-hidden="true">•</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">Graphic Design</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
                <Link
                  to="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 hover:-translate-y-0.5"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="/assets/Abhay_Kumar_Resume.pdf"
                  download="Abhay_Kumar_Resume.pdf"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 bg-white hover:bg-slate-100 dark:bg-slate-900/90 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-white border border-slate-300 dark:border-slate-700/80 rounded-xl transition-all hover:-translate-y-0.5 shadow-sm"
                  title="Download Abhay Kumar's Official Resume"
                >
                  <Download className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  <span>Download Resume</span>
                </a>

                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60 border border-slate-200 dark:border-transparent hover:border-slate-300 dark:hover:border-slate-800 rounded-xl transition-all"
                >
                  <span>Contact Me</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 w-full flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">3+ Years Experience</span>
                </div>
                <span className="hidden sm:inline text-slate-400 dark:text-slate-600" aria-hidden="true">•</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">MERN Stack</span>
                  <span className="text-slate-400 dark:text-slate-600" aria-hidden="true">•</span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Shopify Expert</span>
                  <span className="text-slate-400 dark:text-slate-600" aria-hidden="true">•</span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">SEO &amp; Performance</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Right Side Banner Frame */}
            <div className="lg:col-span-5 relative">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative mx-auto max-w-md lg:max-w-none"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.65, 0.85, 0.65],
                  }}
                  transition={{
                    duration: 6.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-purple-600/20 blur-xl opacity-75"
                />

                <div className="relative rounded-2xl bg-white dark:bg-[#0D1322] border border-slate-200 dark:border-slate-700/60 overflow-hidden shadow-xl shadow-slate-900/10 dark:shadow-2xl dark:shadow-black/80 transition-colors duration-200">
                  <div className="px-4 py-3 bg-slate-100/90 dark:bg-[#090D17] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                      <Terminal className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                      <span>abhay-developer.ts</span>
                    </div>
                    <div className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Online</span>
                    </div>
                  </div>

                  <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-slate-100 dark:bg-slate-950 overflow-hidden group">
                    {!imageError ? (
                      <motion.img
                        src="/assets/images/abhay-hero-bg-7379.png"
                        alt="Abhay Kumar - Professional Web Developer"
                        referrerPolicy="no-referrer"
                        onError={() => setImageError(true)}
                        animate={{
                          y: [0, -3, 0],
                          scale: [1, 1.015, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="w-full h-full object-cover object-top filter brightness-105 contrast-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-100 dark:bg-slate-900 text-center">
                        <Code2 className="w-16 h-16 text-blue-500 dark:text-blue-400 mb-3 stroke-1" />
                        <h3 className="font-display font-bold text-slate-900 dark:text-white text-xl">Abhay Kumar</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1">Web Developer &amp; MERN Engineer</p>
                      </div>
                    )}

                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-[11px] font-bold text-blue-600 dark:text-blue-200 font-mono">3+ Yrs Exp</span>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                      className="absolute inset-x-3 bottom-3 p-3.5 rounded-xl bg-white/95 dark:bg-[#090D17]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg text-left"
                    >
                      <div className="flex items-center justify-between text-xs mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">Specialization</span>
                        </div>
                        <span className="font-mono text-[11px] text-cyan-600 dark:text-cyan-300 font-bold">MERN &bull; Shopify</span>
                      </div>
                      <div className="text-xs text-slate-700 dark:text-slate-300 font-mono space-y-1">
                        <p className="text-slate-500 dark:text-slate-400">
                          const <span className="text-blue-600 dark:text-blue-300">stack</span> = [<br />
                          &nbsp;&nbsp;<span className="text-emerald-600 dark:text-emerald-300">"Shopify"</span>,{' '}
                          <span className="text-emerald-600 dark:text-emerald-300">"React"</span>,{' '}
                          <span className="text-emerald-600 dark:text-emerald-300">"Node.js"</span>,{' '}
                          <span className="text-emerald-600 dark:text-emerald-300">"WordPress"</span>
                          <br />
                          ];
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-[#0A0F1D] border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400">
                    <span className="text-slate-700 dark:text-slate-300">Location: India</span>
                    <span className="text-slate-300 dark:text-slate-500">|</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">High-Conversion E-Commerce</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK & APPLIED TOOLING (INFINITE MARQUEE & GRID) */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <TechStackSection />
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold mb-1">
              Selected Work
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
              Featured Client Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Project Category Filter */}
        <div className="mb-8">
          <ProjectCategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            projects={projects}
          />
        </div>

        {loading ? (
          <Loader message="Loading projects from API..." />
        ) : displayProjects.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {displayProjects.map((project) => (
                <motion.div
                  key={project._id || project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28 }}
                >
                  <ProjectCard
                    project={project}
                    onViewDetails={(p) => setSelectedProject(p)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-12 p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <p className="text-slate-600 dark:text-slate-400 font-mono text-sm">No projects found in "{selectedCategory}".</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-mono font-semibold hover:bg-blue-500 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}
      </section>

      {/* SHOPIFY CLIENT TESTIMONIALS & SUCCESS STORIES CAROUSEL */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <TestimonialCarousel />
      </section>

      {/* CORE SERVICES PREVIEW */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold mb-1">
              Core Capabilities
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
              What I Deliver For Clients
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <Loader message="Loading services..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlightServices.map((service, index) => (
              <ServiceCard key={service._id || service.slug} service={service} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* GITHUB CONTRIBUTION GRAPH & ONGOING ACTIVITY SECTION */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <GitHubActivitySection />
      </section>

      {/* MODERN SAAS FEATURE SHOWCASE SECTION */}
      <FeatureSection />

      {/* FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <FAQSection />
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-50 via-slate-100 to-blue-100/50 dark:from-blue-950/40 dark:via-[#0E1628] dark:to-slate-900 border border-blue-200 dark:border-blue-500/20 text-center relative overflow-hidden shadow-xl shadow-slate-900/5 dark:shadow-none">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
              Ready to build something impactful together?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Whether you need a custom MERN stack web app, a high-converting Shopify store, or performance-optimized WordPress site, let's talk.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5"
              >
                <span>Let's Work Together</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
