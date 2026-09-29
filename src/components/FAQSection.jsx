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
      <div className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions &amp; Direct Answers</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              Everything you need to know about my web engineering services, Shopify custom builds, MERN stack solutions, and project delivery timelines.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Category Filters */}
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
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
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

        {/* Need More Assistance Prompt */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-gradient-to-r dark:from-[#0E1526] dark:to-[#0B101D] border border-slate-200 dark:border-slate-800 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold font-display text-slate-900 dark:text-white">
              Have a question about your specific project?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              I reply within 24 hours with architecture advice and a tailored project proposal.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold transition-all shadow-md shadow-blue-600/30 whitespace-nowrap shrink-0 hover:-translate-y-0.5"
          >
            <span>Ask a Question</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
