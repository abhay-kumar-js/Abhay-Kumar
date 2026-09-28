import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Terminal,
  Code2,
  Sparkles,
  Zap,
  Globe,
  Briefcase,
} from 'lucide-react';
import { api } from '../services/api.js';
import ProjectCard from '../components/ProjectCard.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Loader from '../components/Loader.jsx';

export const Home = () => {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    document.title = 'Abhay Kumar | Web Developer | MERN Stack, Shopify & WordPress';

    const loadData = async () => {
      try {
        const [projRes, servRes] = await Promise.all([
          api.projects.getAll().catch(() => ({ data: [] })),
          api.services.getAll().catch(() => ({ data: [] })),
        ]);

        if (projRes.data) {
          setProjects(projRes.data);
        }
        if (servRes.data) {
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

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);
  const highlightServices = services.slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-12 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-medium text-slate-200">Available for New Projects</span>
                <span className="text-slate-500" aria-hidden="true">·</span>
                <span className="text-slate-400">4+ Years Experience</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.12] mb-6 max-w-3xl text-balance">
                Building Modern Websites &amp; Digital Experiences That Grow Businesses.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-2xl">
                I'm Abhay Kumar, a Web Developer with 4+ years of experience building modern websites, e-commerce experiences, and full-stack web applications.
              </p>

              {/* Technologies Line */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-slate-400 mb-8 border-l-2 border-blue-500 pl-4 py-1">
                <span>MERN Stack</span>
                <span className="text-blue-400" aria-hidden="true">•</span>
                <span>Shopify</span>
                <span className="text-blue-400" aria-hidden="true">•</span>
                <span>WordPress</span>
                <span className="text-blue-400" aria-hidden="true">•</span>
                <span>SEO</span>
                <span className="text-blue-400" aria-hidden="true">•</span>
                <span>Graphic Design</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
                <Link
                  to="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 hover:-translate-y-0.5"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-200 bg-slate-900/80 hover:bg-slate-800 hover:text-white border border-slate-700/80 rounded-xl transition-all hover:-translate-y-0.5"
                >
                  <span>Let's Work Together</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-800/80 w-full flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-slate-200">4+ Years Experience</span>
                </div>
                <span className="hidden sm:inline text-slate-600" aria-hidden="true">•</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-300">Web Development</span>
                  <span className="text-slate-600" aria-hidden="true">•</span>
                  <span className="text-slate-300">E-Commerce</span>
                  <span className="text-slate-600" aria-hidden="true">•</span>
                  <span className="text-slate-300">SEO</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Visual Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/30 to-cyan-500/20 blur-xl opacity-75" />

                <div className="relative rounded-2xl bg-[#0D1322] border border-slate-700/60 overflow-hidden shadow-2xl shadow-black/80">
                  <div className="px-4 py-3 bg-[#090D17] border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                      <Terminal className="w-3.5 h-3.5 text-blue-400" />
                      <span>abhay-developer.ts</span>
                    </div>
                    <div className="w-12" />
                  </div>

                  <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square bg-slate-950 overflow-hidden group">
                    {!imageError ? (
                      <img
                        src="/src/assets/images/hero_developer_visual_1790582186038.jpg"
                        alt="Abhay Kumar Modern Developer Workstation"
                        referrerPolicy="no-referrer"
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-900 text-center">
                        <Code2 className="w-16 h-16 text-blue-400 mb-4 stroke-1" />
                        <p className="font-display font-bold text-white text-lg mb-1">Abhay Kumar</p>
                        <p className="text-xs text-slate-400">Full-Stack Web Developer · 4+ Years</p>
                      </div>
                    )}

                    <div className="absolute inset-x-3 bottom-3 p-3.5 rounded-xl bg-[#090D17]/85 backdrop-blur-md border border-white/10 shadow-lg text-left">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-400" />
                          <span className="font-mono text-slate-200 font-semibold">Specialization</span>
                        </div>
                        <span className="font-mono text-[11px] text-blue-300">v4.0+</span>
                      </div>
                      <div className="text-xs text-slate-300 font-mono space-y-1">
                        <p className="text-slate-400">
                          const <span className="text-blue-300">stack</span> = [<br />
                          &nbsp;&nbsp;<span className="text-emerald-300">"React"</span>,{' '}
                          <span className="text-emerald-300">"Node.js"</span>,{' '}
                          <span className="text-emerald-300">"Shopify"</span>,{' '}
                          <span className="text-emerald-300">"WordPress"</span>
                          <br />
                          ];
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#0A0F1D] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-slate-300">Location: India</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-emerald-400">Client-Focused Code</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-800">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold mb-1">
              Selected Work
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Featured Client Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <Loader message="Loading projects from API..." />
        ) : displayProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project) => (
              <ProjectCard key={project._id || project.slug} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-10 font-mono text-sm">No projects found.</p>
        )}
      </section>

      {/* CORE SERVICES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-800">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold mb-1">
              Core Capabilities
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              What I Deliver For Clients
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300"
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

      {/* CALL TO ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#0E1628] to-slate-900 border border-blue-500/20 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Ready to build something impactful together?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
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
