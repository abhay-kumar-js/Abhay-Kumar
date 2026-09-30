import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  CheckCircle,
  ArrowRight,
  Code2,
  ShoppingBag,
  Globe,
  Search,
  Palette,
  ShieldCheck,
  Download,
} from 'lucide-react';

export const About = () => {
  useEffect(() => {
    document.title = 'About Me | Abhay Kumar - Web Developer';
  }, []);

  const domains = [
    {
      title: 'MERN Stack',
      desc: 'MongoDB, Express.js, React.js, and Node.js for scalable, interactive web applications.',
      icon: Code2,
    },
    {
      title: 'Shopify',
      desc: 'Custom storefronts, custom sections, theme engineering, and conversion rate optimization.',
      icon: ShoppingBag,
    },
    {
      title: 'WordPress',
      desc: 'Custom WordPress theme development, performance tuning, and robust CMS workflows.',
      icon: Globe,
    },
    {
      title: 'SEO',
      desc: 'On-page optimization, technical search architecture, Core Web Vitals, and speed benchmarks.',
      icon: Search,
    },
    {
      title: 'Graphic Design',
      desc: 'Visual assets, UI mockups, banners, marketing materials, and digital brand coherence.',
      icon: Palette,
    },
  ];

  const stats = [
    { value: '3+', label: 'Years Experience', note: 'Continuous Web Engineering' },
    { value: 'MERN', label: 'Full-Stack Development', note: 'MongoDB, Express, React, Node' },
    { value: 'Shopify + WP', label: 'E-Commerce & CMS', note: 'Custom themes & storefronts' },
    { value: 'SEO', label: 'Search Optimization', note: 'Architecture & Core Web Vitals' },
  ];

  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 sm:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-5xl">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold mb-2">
          <span>Profile &amp; Background</span>
          <span className="text-slate-400 dark:text-slate-600">·</span>
          <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /> India
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-slate-900 dark:text-white mb-6">
          About Me
        </h1>
        <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
          I'm Abhay Kumar, a Web Developer with 3+ years of experience building modern websites, e-commerce stores, and web applications.
        </p>
      </div>

      {/* Narrative & Philosophy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Core story */}
        <div className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
          <p>
            My approach combines development, design, performance, usability, and SEO to create digital experiences that are visually appealing and useful for businesses.
          </p>

          <p>
            Instead of building generic templates, I focus on clean code structure, smooth responsive behavior across devices, search engine friendliness, and seamless visitor journeys that convert curious prospects into long-term customers.
          </p>

          {/* Core Areas */}
          <div className="pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4 font-mono">
              Core Technologies &amp; Skill Areas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {domains.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-slate-700 transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0" />
                      <span className="font-semibold text-slate-900 dark:text-white text-sm">{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-6 flex flex-wrap gap-3 sm:gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition-all"
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href="/assets/Abhay_Kumar_Web-Dev-CV.pdf"
              download="Abhay_Kumar_Web-Dev-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 rounded-lg transition-all shadow-sm"
              title="Download Abhay Kumar's CV (PDF)"
            >
              <Download className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              <span>Download CV (PDF)</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/40 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-transparent"
            >
              <span>Get in Touch</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Key Stats & Metric Highlights */}
        <div className="lg:col-span-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`p-6 rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#0F172A] dark:to-[#0A0F1D] border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all shadow-sm ${
                  idx === 0 ? 'sm:col-span-2' : ''
                }`}
              >
                <p className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight tabular-nums mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">{stat.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{stat.note}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 flex items-start gap-3 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-700 dark:text-blue-200 leading-relaxed">
              Committed to authentic, maintainable engineering: strictly zero fake awards, statistics, or invented credentials. Every project is crafted to perform in real-world production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
