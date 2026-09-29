import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  Search,
  MessageSquare,
  ArrowRight,
  Code2,
  ShoppingBag,
  Zap,
  Globe,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FAQ_ITEMS = [
  {
    id: 'specialization',
    category: 'MERN Stack',
    icon: Code2,
    question: 'What web development stacks and platforms do you specialize in?',
    answer:
      'I specialize in MERN full-stack engineering (MongoDB, Express.js, React.js, Node.js with TypeScript and Tailwind CSS), high-converting custom Shopify storefronts (Liquid theme engineering, custom dynamic sections, custom app integrations), bespoke WordPress/WooCommerce websites, and technical Core Web Vitals optimization.',
  },
  {
    id: 'shopify-speed',
    category: 'Shopify',
    icon: ShoppingBag,
    question: 'Can you customize or build a Shopify store without using slow third-party apps?',
    answer:
      'Yes, absolutely. My engineering philosophy is performance-first. Instead of relying on bloated monthly subscription apps that inject heavy tracking scripts and degrade conversion rates, I handcraft native Liquid sections, responsive cart drawers, custom variant pickers, and filter systems directly in theme code to maintain 90+ Google PageSpeed scores.',
  },
  {
    id: 'mern-apps',
    category: 'MERN Stack',
    icon: Code2,
    question: 'Do you build custom full-stack web applications with authentication and dashboards?',
    answer:
      'Yes. I build production-ready full-stack applications with robust architecture: secure JWT and cookie-based authentication, role-based access control (RBAC), scalable RESTful APIs, optimized MongoDB aggregation pipelines, responsive client-side dashboards, and clean error-handling middleware.',
  },
  {
    id: 'core-web-vitals',
    category: 'SEO & Speed',
    icon: Zap,
    question: 'How do you optimize websites for Google Core Web Vitals and SEO rankings?',
    answer:
      'I audit and resolve technical performance bottlenecks: eliminating render-blocking CSS and JS, optimizing image delivery (next-gen WebP/AVIF formats and lazy loading), stabilizing Cumulative Layout Shift (CLS), reducing Largest Contentful Paint (LCP) under 1.2s, and structuring semantic HTML with Schema.org JSON-LD metadata for organic search indexing.',
  },
  {
    id: 'timeline-process',
    category: 'Workflow',
    icon: Clock,
    question: 'What is your typical project delivery timeline and development process?',
    answer:
      'Delivery timelines depend on scope: performance tuning or custom landing pages take 3–5 days; full custom Shopify or WordPress storefronts typically take 1–2 weeks; comprehensive full-stack MERN applications take 2–4 weeks. Every milestone includes live staging previews, transparent progress updates, cross-device QA, and dedicated post-launch support.',
  },
  {
    id: 'wordpress-custom',
    category: 'WordPress',
    icon: Globe,
    question: 'Do you work with custom WordPress themes and WooCommerce stores?',
    answer:
      'Yes. I build custom, lightweight WordPress themes and WooCommerce stores without heavy page-builder bloat. I focus on clean PHP/JavaScript architecture, custom post types, ACF (Advanced Custom Fields), secure payment gateway integrations, and fast database caching.',
  },
  {
    id: 'getting-started',
    category: 'Workflow',
    icon: MessageSquare,
    question: 'How do we get started, and what are your collaboration models?',
    answer:
      'You can reach out through the Contact form, email me directly at algoaxisoftech@gmail.com, or message on WhatsApp/Phone at +91-7379289932. I provide clear upfront estimates with milestone-based fixed pricing for defined scopes, as well as hourly/retainer arrangements for ongoing development, maintenance, and technical consulting.',
  },
];

export const FAQSection = () => {
  const [openId, setOpenId] = useState('specialization');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'MERN Stack', 'Shopify', 'WordPress', 'SEO & Speed', 'Workflow'];

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="relative py-12 sm:py-16" aria-label="Frequently Asked Questions">
      <div className="space-y-8">
        {/* Main 2-Column Responsive Layout: Left Aesthetic Visual Panel + Right Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================
              LEFT SIDE: Aesthetic FAQ Card, Visual & Trust Metrics
              ======================================================== */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Top Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions &amp; Direct Answers</span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Frequently Asked <span className="text-blue-600 dark:text-blue-400">Questions</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                Everything you need to know about my web engineering services, Shopify custom builds, MERN stack solutions, and project delivery timelines.
              </p>
            </div>

            {/* Aesthetic FAQ Illustration & Info Card */}
            <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/60 dark:from-[#0F172A]/90 dark:via-[#0D131F]/90 dark:to-[#171A2E]/90 border border-blue-200/70 dark:border-blue-500/20 shadow-xl shadow-blue-500/5 overflow-hidden group">
              {/* Soft Ambient Radial Glow */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

              {/* Visual FAQ Composition Graphic */}
              <div className="relative z-10 flex flex-col gap-4">
                {/* Visual Header with Developer Profile & Status */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="/assets/images/abhay-hero-bg-7379.png"
                        alt="Abhay Kumar"
                        className="w-12 h-12 rounded-2xl object-cover object-top border-2 border-blue-500/30 shadow-md bg-slate-100 dark:bg-slate-800"
                        onError={(e) => {
                          e.target.src = '/assets/images/hero_developer_visual_1790582186038.jpg';
                        }}
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                        Abhay Kumar
                      </h4>
                      <p className="text-xs font-mono text-blue-600 dark:text-blue-400">
                        Web Developer
                      </p>
                    </div>
                  </div>

                  <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Online</span>
                  </div>
                </div>

                {/* Floating Interactive FAQ Badges */}
                <div className="space-y-2.5 pt-1">
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="p-3 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 text-xs flex items-center gap-3 shadow-xs"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block">
                        Fast 24h Response
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Direct 1-on-1 consultation without agency delays
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    className="p-3 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 text-xs flex items-center gap-3 shadow-xs"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block">
                        100% Fixed Scope &amp; Milestones
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Transparent contracts with clear deliverables
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    className="p-3 rounded-xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 text-xs flex items-center gap-3 shadow-xs"
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white block">
                        Code Quality Guarantee
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Clean architecture, 90+ PageSpeed &amp; full testing
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Direct Action Prompt */}
                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Have a unique requirement?
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-all shadow-md shadow-blue-600/25 shrink-0"
                  >
                    <span>Let's Talk</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT SIDE: Search, Category Filters, Accordion List
              ======================================================== */}
          <div className="lg:col-span-7 space-y-6">
            {/* Search Input Bar */}
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions or keywords (e.g., Shopify, speed, MERN)..."
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs sm:text-sm font-mono text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 border border-blue-500'
                      : 'bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ Accordion List */}
            <div className="space-y-3.5">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                  const isOpen = openId === faq.id;
                  const Icon = faq.icon;
                  return (
                    <div
                      key={faq.id}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isOpen
                          ? 'bg-white dark:bg-[#0E1526] border-blue-500/50 shadow-md shadow-blue-500/5'
                          : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                              isOpen
                                ? 'bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 group-hover:text-blue-500'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold block mb-0.5">
                              {faq.category}
                            </span>
                            <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                              {faq.question}
                            </h3>
                          </div>
                        </div>

                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                            isOpen
                              ? 'bg-blue-600 text-white border-blue-600 rotate-180'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <p className="text-xs font-mono text-slate-500">No questions found matching "{searchQuery}".</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="mt-3 px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-mono font-semibold"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
