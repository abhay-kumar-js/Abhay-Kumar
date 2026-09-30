import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  ShoppingBag,
  Globe,
  Gauge,
  Sparkles,
  Download,
  Eye,
  Layers,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Cpu,
  Search,
  Zap,
  SlidersHorizontal,
  Flame,
  CreditCard,
  Layout,
  BarChart3,
  GitBranch,
} from 'lucide-react';
import ResumeModal from './ResumeModal.jsx';

// Detailed tech stack data across MERN, Shopify, WordPress, SEO Tools & Platforms
export const TECH_STACK_ITEMS = [
  // MERN Stack & Frontend
  {
    name: 'React.js & Redux',
    category: 'MERN',
    role: 'Frontend UI & State',
    desc: 'Component architecture, Hooks, Redux Toolkit, reactive state flows.',
    color: '#61DAFB',
    bg: 'rgba(97, 218, 251, 0.1)',
    border: 'rgba(97, 218, 251, 0.25)',
    icon: Code2,
  },
  {
    name: 'Node.js & Express',
    category: 'MERN',
    role: 'Backend Runtime & APIs',
    desc: 'High-concurrency RESTful APIs, JWT authentication, server architecture.',
    color: '#68A063',
    bg: 'rgba(104, 160, 99, 0.1)',
    border: 'rgba(104, 160, 99, 0.25)',
    icon: Terminal,
  },
  {
    name: 'MongoDB',
    category: 'MERN',
    role: 'NoSQL Database',
    desc: 'Scalable document schema design, Mongoose aggregation pipelines.',
    color: '#13AA52',
    bg: 'rgba(19, 170, 82, 0.1)',
    border: 'rgba(19, 170, 82, 0.25)',
    icon: Layers,
  },
  {
    name: 'TypeScript',
    category: 'MERN',
    role: 'Strict Type System',
    desc: 'Enterprise interfaces, static type safety, reliable refactoring.',
    color: '#3178C6',
    bg: 'rgba(49, 120, 198, 0.1)',
    border: 'rgba(49, 120, 198, 0.25)',
    icon: Cpu,
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'MERN',
    role: 'Core Language',
    desc: 'Asynchronous flows, event loops, functional programming principles.',
    color: '#F7DF1E',
    bg: 'rgba(247, 223, 30, 0.1)',
    border: 'rgba(247, 223, 30, 0.25)',
    icon: Sparkles,
  },
  {
    name: 'Tailwind CSS',
    category: 'MERN',
    role: 'Utility-First UI',
    desc: 'Pixel-perfect responsive design, modern dark palettes, fluid layouts.',
    color: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.1)',
    border: 'rgba(56, 189, 248, 0.25)',
    icon: Layout,
  },

  // Shopify
  {
    name: 'Shopify Liquid',
    category: 'Shopify',
    role: 'Theme Engine',
    desc: 'Custom Liquid templates, dynamic sections, predictive search filters.',
    color: '#95BF47',
    bg: 'rgba(149, 191, 71, 0.1)',
    border: 'rgba(149, 191, 71, 0.25)',
    icon: ShoppingBag,
  },
  {
    name: 'Shopify OS 2.0',
    category: 'Shopify',
    role: 'Architecture & Blocks',
    desc: 'Modular JSON templates, custom metafields, app blocks integration.',
    color: '#7AB55C',
    bg: 'rgba(122, 181, 92, 0.1)',
    border: 'rgba(122, 181, 92, 0.25)',
    icon: SlidersHorizontal,
  },
  {
    name: 'Slide-Out Cart & Ajax',
    category: 'Shopify',
    role: 'Conversion UX',
    desc: 'Instant slide-out cart drawers, dynamic quantity updates, upselling.',
    color: '#5E8E3E',
    bg: 'rgba(94, 142, 62, 0.1)',
    border: 'rgba(94, 142, 62, 0.25)',
    icon: Flame,
  },
  {
    name: 'Payment Gateways',
    category: 'Shopify',
    role: 'Checkout & Payments',
    desc: 'Stripe, Razorpay, Cash-On-Delivery, seamless Indian & global checkout.',
    color: '#43B02A',
    bg: 'rgba(67, 176, 42, 0.1)',
    border: 'rgba(67, 176, 42, 0.25)',
    icon: CreditCard,
  },
  {
    name: 'Shopify Apps & Webhooks',
    category: 'Shopify',
    role: 'Integrations',
    desc: 'Custom app integrations, inventory synchronization, automated fulfillment.',
    color: '#96BF48',
    bg: 'rgba(150, 191, 72, 0.1)',
    border: 'rgba(150, 191, 72, 0.25)',
    icon: Cpu,
  },

  // WordPress
  {
    name: 'Custom WordPress',
    category: 'WordPress',
    role: 'CMS Development',
    desc: 'Custom themes, clean PHP templating, bespoke post types & taxonomies.',
    color: '#21759B',
    bg: 'rgba(33, 117, 155, 0.1)',
    border: 'rgba(33, 117, 155, 0.25)',
    icon: Globe,
  },
  {
    name: 'WooCommerce',
    category: 'WordPress',
    role: 'E-Commerce Platform',
    desc: 'Online stores, product catalogs, shipping rules, payment methods.',
    color: '#96588A',
    bg: 'rgba(150, 88, 138, 0.1)',
    border: 'rgba(150, 88, 138, 0.25)',
    icon: ShoppingBag,
  },
  {
    name: 'Elementor Pro',
    category: 'WordPress',
    role: 'Visual Builder & Themes',
    desc: 'Custom Elementor widgets, interactive headers/footers, responsive styling.',
    color: '#92003B',
    bg: 'rgba(146, 0, 59, 0.1)',
    border: 'rgba(146, 0, 59, 0.25)',
    icon: Layout,
  },
  {
    name: 'Plugins & Migration',
    category: 'WordPress',
    role: 'Maintenance & Transfer',
    desc: 'Zero-downtime server migration, database transfers, security hardening.',
    color: '#0073AA',
    bg: 'rgba(0, 115, 170, 0.1)',
    border: 'rgba(0, 115, 170, 0.25)',
    icon: SlidersHorizontal,
  },

  // SEO & Speed Tools
  {
    name: 'Google PageSpeed',
    category: 'SEO Tools',
    role: 'Performance Benchmark',
    desc: '90+ mobile Lighthouse scores, asset minification, script deferral.',
    color: '#4285F4',
    bg: 'rgba(66, 133, 244, 0.1)',
    border: 'rgba(66, 133, 244, 0.25)',
    icon: Gauge,
  },
  {
    name: 'Core Web Vitals',
    category: 'SEO Tools',
    role: 'LCP, FID & CLS',
    desc: 'Sub-second paint times, layout shift prevention, render optimizations.',
    color: '#34A853',
    bg: 'rgba(52, 168, 83, 0.1)',
    border: 'rgba(52, 168, 83, 0.25)',
    icon: Zap,
  },
  {
    name: 'Google Search Console',
    category: 'SEO Tools',
    role: 'Indexing & Crawling',
    desc: 'XML sitemaps, canonical tags, index coverage, crawl anomaly fixes.',
    color: '#EA4335',
    bg: 'rgba(234, 67, 53, 0.1)',
    border: 'rgba(234, 67, 53, 0.25)',
    icon: Search,
  },
  {
    name: 'Schema.org & JSON-LD',
    category: 'SEO Tools',
    role: 'Structured Data',
    desc: 'Product schema, aggregate star ratings, breadcrumbs, rich Google snippets.',
    color: '#FBBC05',
    bg: 'rgba(251, 188, 5, 0.1)',
    border: 'rgba(251, 188, 5, 0.25)',
    icon: Code2,
  },
  {
    name: 'Google Analytics 4',
    category: 'SEO Tools',
    role: 'Tracking & CRO',
    desc: 'Enhanced e-commerce purchase tracking, user drop-off funnel analysis.',
    color: '#E37400',
    bg: 'rgba(227, 116, 0, 0.1)',
    border: 'rgba(227, 116, 0, 0.25)',
    icon: BarChart3,
  },
  {
    name: 'Git & GitHub / Vercel',
    category: 'Tools',
    role: 'DevOps & Deployments',
    desc: 'Branch workflows, CI/CD automated builds, production edge CDN hosting.',
    color: '#F05032',
    bg: 'rgba(240, 80, 50, 0.1)',
    border: 'rgba(240, 80, 50, 0.25)',
    icon: GitBranch,
  },
];

export const TechStackSection = () => {
  const [viewMode, setViewMode] = useState('marquee'); // 'marquee' | 'grid'
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const categories = ['ALL', 'MERN', 'Shopify', 'WordPress', 'SEO Tools', 'Tools'];

  // Split into two rows for infinite marquee
  const half = Math.ceil(TECH_STACK_ITEMS.length / 2);
  const rowOne = TECH_STACK_ITEMS.slice(0, half);
  const rowTwo = TECH_STACK_ITEMS.slice(half);

  const filteredGridItems =
    selectedCategory === 'ALL'
      ? TECH_STACK_ITEMS
      : TECH_STACK_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section className="relative py-12 sm:py-16" aria-label="Technical Stack and Competencies">
      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />

      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack &amp; E-Commerce Toolkit</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
              Tech Stack &amp; Applied Tooling
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              4+ years of professional engineering across MERN Stack, Shopify Liquid, custom WordPress platforms, and Core Web Vitals optimization.
            </p>
          </div>

          {/* Action Bar: Download Resume + View Mode Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Download Resume Button */}
            <a
              href="/assets/Abhay_Kumar_Web-Dev-CV.pdf"
              download="Abhay_Kumar_Web-Dev-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5"
              title="Download Abhay Kumar's Official CV (PDF)"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-blue-800 text-[10px]">
                PDF
              </span>
            </a>

            {/* Preview Resume Button */}
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-mono font-medium transition-all cursor-pointer shadow-sm"
              title="Quick view resume"
            >
              <Eye className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="hidden sm:inline">Preview</span>
            </button>

            {/* Mode Switcher */}
            <div className="flex items-center bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 p-1 rounded-xl shadow-sm">
              <button
                onClick={() => setViewMode('marquee')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  viewMode === 'marquee'
                    ? 'bg-blue-600 text-white dark:bg-blue-600/20 dark:text-blue-400 font-bold border border-blue-500/30 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Stream
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white dark:bg-blue-600/20 dark:text-blue-400 font-bold border border-blue-500/30 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>

        {/* Credibility Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-4 rounded-xl bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:to-[#0A0F1D] border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <p className="text-xl font-bold font-display text-slate-900 dark:text-white">4+ Years</p>
            <p className="text-xs font-mono text-blue-600 dark:text-blue-400 mt-0.5">MERN Full-Stack Dev</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-4 rounded-xl bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:to-[#0A0F1D] border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <p className="text-xl font-bold font-display text-emerald-600 dark:text-emerald-400">3+ Years</p>
            <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-0.5">Shopify &amp; WordPress</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-4 rounded-xl bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:to-[#0A0F1D] border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <p className="text-xl font-bold font-display text-cyan-600 dark:text-cyan-400">95-100</p>
            <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-0.5">Core Web Vitals</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-4 rounded-xl bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:to-[#0A0F1D] border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <p className="text-xl font-bold font-display text-amber-600 dark:text-amber-400">REST &amp; APIs</p>
            <p className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-0.5">Payment &amp; Cart Logic</p>
          </motion.div>
        </div>

        {/* MODE 1: INFINITE MARQUEE STREAM */}
        {viewMode === 'marquee' ? (
          <div className="relative rounded-2xl bg-white/90 dark:bg-[#090E1A]/80 border border-slate-200 dark:border-slate-800/80 p-6 sm:p-8 overflow-hidden marquee-pause shadow-sm">
            {/* Left and Right Gradient Fades */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-white dark:from-[#090E1A] to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-white dark:from-[#090E1A] to-transparent z-10" />

            <div className="space-y-4">
              {/* Row 1: Leftward Infinite Marquee */}
              <div className="overflow-hidden">
                <div className="animate-marquee-left flex gap-4">
                  {[...rowOne, ...rowOne].map((tech, idx) => {
                    const Icon = tech.icon;
                    return (
                      <div
                        key={`r1-${idx}`}
                        className="group shrink-0 w-64 sm:w-72 p-4 rounded-xl bg-slate-50 dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex items-center gap-3.5 shadow-sm"
                      >
                        {/* Floating Tech Icon */}
                        <motion.div
                          animate={{
                            y: [0, idx % 2 === 0 ? -4 : 4, 0],
                            rotate: [0, idx % 3 === 0 ? 2 : -2, 0],
                          }}
                          transition={{
                            duration: 3.5 + (idx % 4) * 0.4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: (idx % 5) * 0.25,
                          }}
                          whileHover={{
                            scale: 1.2,
                            rotate: [0, -6, 6, 0],
                            transition: { duration: 0.3 },
                          }}
                          className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 border cursor-pointer shadow-sm"
                          style={{
                            backgroundColor: tech.bg,
                            borderColor: tech.border,
                            color: tech.color,
                          }}
                        >
                          <Icon className="w-5 h-5 drop-shadow" />
                        </motion.div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900 dark:text-white font-display truncate">
                              {tech.name}
                            </span>
                          </div>
                          <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                            {tech.role}
                          </p>
                          <span
                            className="inline-block mt-1 px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold"
                            style={{ color: tech.color, backgroundColor: tech.bg }}
                          >
                            {tech.category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 2: Rightward Infinite Marquee */}
              <div className="overflow-hidden">
                <div className="animate-marquee-right flex gap-4">
                  {[...rowTwo, ...rowTwo].map((tech, idx) => {
                    const Icon = tech.icon;
                    return (
                      <div
                        key={`r2-${idx}`}
                        className="group shrink-0 w-64 sm:w-72 p-4 rounded-xl bg-slate-50 dark:bg-[#0D1424] border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex items-center gap-3.5 shadow-sm"
                      >
                        {/* Floating Tech Icon */}
                        <motion.div
                          animate={{
                            y: [0, idx % 2 === 0 ? 4 : -4, 0],
                            rotate: [0, idx % 3 === 0 ? -2 : 2, 0],
                          }}
                          transition={{
                            duration: 3.8 + (idx % 4) * 0.4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: (idx % 5) * 0.2,
                          }}
                          whileHover={{
                            scale: 1.2,
                            rotate: [0, -6, 6, 0],
                            transition: { duration: 0.3 },
                          }}
                          className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 border cursor-pointer shadow-sm"
                          style={{
                            backgroundColor: tech.bg,
                            borderColor: tech.border,
                            color: tech.color,
                          }}
                        >
                          <Icon className="w-5 h-5 drop-shadow" />
                        </motion.div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900 dark:text-white font-display truncate">
                              {tech.name}
                            </span>
                          </div>
                          <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                            {tech.role}
                          </p>
                          <span
                            className="inline-block mt-1 px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold"
                            style={{ color: tech.color, backgroundColor: tech.bg }}
                          >
                            {tech.category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Hover anywhere to pause motion &bull; Streaming 20+ specialized technologies</span>
              <button
                onClick={() => setViewMode('grid')}
                className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium"
              >
                Switch to full categorized grid →
              </button>
            </div>
          </div>
        ) : (
          /* MODE 2: CATEGORIZED STRUCTURED GRID */
          <div className="space-y-6">
            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-700 shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid Cards with Framer Motion entry and floating icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredGridItems.map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.035 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="p-5 rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:to-[#0A0E1A] border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-colors duration-200 shadow-md shadow-slate-900/5 dark:shadow-xl flex flex-col justify-between space-y-4 group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <motion.div
                          animate={{
                            y: [0, -4, 0],
                            rotate: [0, idx % 2 === 0 ? 2 : -2, 0],
                          }}
                          transition={{
                            duration: 4 + (idx % 3) * 0.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: (idx % 5) * 0.2,
                          }}
                          whileHover={{
                            scale: 1.18,
                            rotate: [0, -6, 6, 0],
                            transition: { duration: 0.25 },
                          }}
                          className="w-10 h-10 rounded-xl flex items-center justify-center border cursor-pointer shadow-md"
                          style={{
                            backgroundColor: tech.bg,
                            borderColor: tech.border,
                            color: tech.color,
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.div>
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold"
                          style={{ color: tech.color, backgroundColor: tech.bg }}
                        >
                          {tech.category}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                        {tech.name}
                      </h3>
                      <p className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-2 font-medium">
                        {tech.role}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {tech.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Production Ready</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TechStackSection;
