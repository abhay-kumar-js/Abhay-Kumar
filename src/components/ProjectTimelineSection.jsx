import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Layout,
  Code2,
  PlugZap,
  Gauge,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Clock,
  Layers,
} from 'lucide-react';

const TIMELINE_TRACKS = {
  all: {
    label: 'End-to-End Delivery',
    totalDuration: '2 – 4 Weeks Typical Delivery',
  },
  shopify: {
    label: 'Shopify D2C Store',
    totalDuration: '10 – 18 Days Typical Launch',
  },
  mern: {
    label: 'MERN Web Application',
    totalDuration: '3 – 5 Weeks Typical Delivery',
  },
};

const TIMELINE_STEPS = [
  {
    step: '01',
    title: 'Discovery & Architecture Blueprint',
    icon: Compass,
    duration: {
      all: 'Days 1 – 3',
      shopify: 'Days 1 – 2',
      mern: 'Days 1 – 4',
    },
    phase: 'Strategy & Scope',
    description:
      'Deep-dive into your business goals, target audience, product catalog, and technical requirements to establish a rock-solid execution roadmap.',
    focusByTrack: {
      all: 'Requirements gathering, sitemap planning, and choosing the right architecture.',
      shopify: 'Store structure, collection taxonomy, metafields schema, and D2C app stack.',
      mern: 'Database schema design (MongoDB), REST API specification, and auth workflows.',
    },
    deliverables: ['Technical Scope Document', 'User Flow & Sitemap', 'Milestone Schedule'],
  },
  {
    step: '02',
    title: 'Conversion UI/UX & Wireframing',
    icon: Layout,
    duration: {
      all: 'Days 4 – 7',
      shopify: 'Days 3 – 5',
      mern: 'Days 5 – 9',
    },
    phase: 'Design & Experience',
    description:
      'Crafting mobile-first, high-contrast interfaces engineered for visual clarity, fast navigation, and frictionless customer journeys.',
    focusByTrack: {
      all: 'Responsive layouts, brand typography, and high-converting landing architectures.',
      shopify: 'High-AOV product pages (PDP), slide-out cart UX, and trust-building sections.',
      mern: 'Interactive component states, dashboard layouts, and responsive design system.',
    },
    deliverables: ['Mobile-First UI Layouts', 'Interactive Prototyping', 'Design Tokens'],
  },
  {
    step: '03',
    title: 'Core Engineering & Custom Build',
    icon: Code2,
    duration: {
      all: 'Week 2',
      shopify: 'Days 6 – 10',
      mern: 'Weeks 2 – 3',
    },
    phase: 'Development',
    description:
      'Writing clean, modular, production-grade code—from custom Shopify OS 2.0 Liquid sections to scalable React + Node.js/Express backends.',
    focusByTrack: {
      all: 'Full-stack frontend/backend engineering and custom CMS implementation.',
      shopify: 'Custom Liquid templates, dynamic JSON blocks, Ajax cart drawer & upsells.',
      mern: 'React.js frontend, Express.js API controllers, JWT security, and MongoDB models.',
    },
    deliverables: ['Clean Production Codebase', 'Custom Theme / API Build', 'Admin CMS Controls'],
  },
  {
    step: '04',
    title: 'Checkout, Logistics & Partner Integrations',
    icon: PlugZap,
    duration: {
      all: 'Week 3',
      shopify: 'Days 11 – 14',
      mern: 'Week 3 – 4',
    },
    phase: 'Ecosystem Sync',
    description:
      'Connecting payment gateways, 1-click D2C checkouts, automated shipping dashboards, BNPL financing, and AI sales assistants.',
    focusByTrack: {
      all: 'Third-party APIs, webhooks, payment gateways, and automated workflows.',
      shopify: 'GoKwik / Shiprocket Faster Checkout, Shiprocket Orders, Snapmint, Verifast AI & YourToken.',
      mern: 'Payment gateways (Razorpay/Stripe), OAuth, webhooks, and cloud storage services.',
    },
    deliverables: ['1-Click Checkout Setup', 'Orders & Shipping Sync', 'Payment & BNPL Gateways'],
  },
  {
    step: '05',
    title: 'Speed Optimization, SEO & QA Testing',
    icon: Gauge,
    duration: {
      all: 'Days 18 – 22',
      shopify: 'Days 15 – 16',
      mern: 'Days 22 – 26',
    },
    phase: 'Performance & QA',
    description:
      'Rigorous cross-device testing, Core Web Vitals tuning (LCP, CLS, INP), technical SEO markup, and end-to-end checkout verification.',
    focusByTrack: {
      all: '90+ PageSpeed optimization, Schema.org JSON-LD, and mobile responsiveness QA.',
      shopify: 'Script deferral, image compression, checkout funnel QA, and product schema.',
      mern: 'API load testing, query indexing, bundle splitting, and security validation.',
    },
    deliverables: ['90+ PageSpeed Benchmark', 'Technical SEO & Schema', 'Cross-Device QA Signoff'],
  },
  {
    step: '06',
    title: 'Production Launch & Growth Handover',
    icon: Rocket,
    duration: {
      all: 'Launch & Ongoing',
      shopify: 'Day 17 – Launch',
      mern: 'Week 4 – Launch',
    },
    phase: 'Go-Live & Support',
    description:
      'Zero-downtime live deployment, custom domain & SSL setup, analytics pixel verification, team training, and post-launch support.',
    focusByTrack: {
      all: 'Production deployment, GA4 & Search Console setup, and smooth handover.',
      shopify: 'Live domain switch, Meta/Google pixel verification, and staff store training.',
      mern: 'Cloud deployment, environment hardening, monitoring, and documentation.',
    },
    deliverables: ['Zero-Downtime Go-Live', 'Analytics & Pixel Sync', 'Post-Launch Support'],
  },
];

export const ProjectTimelineSection = () => {
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const currentTrack = TIMELINE_TRACKS[selectedTrack];

  return (
    <section
      className="relative py-4"
      aria-label="Project Execution Timeline and Delivery Roadmap"
    >
      <div className="space-y-10">
        {/* Section Header & Track Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold mb-2">
              Project Execution Roadmap
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
              How Your Project Goes From Idea to Launch
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              A transparent, milestone-driven 6-step engineering workflow designed for fast turnaround, measurable performance, and zero guesswork.
            </p>
          </div>

          {/* Interactive Track Filter Controls */}
          <div className="flex flex-col sm:items-end gap-2">
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-200/70 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800">
              {Object.entries(TIMELINE_TRACKS).map(([key, track]) => {
                const isActive = selectedTrack === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedTrack(key)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {track.label}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{currentTrack.totalDuration}</span>
            </div>
          </div>
        </div>

        {/* Horizontal Step Progress Bar (Desktop & Tablet) */}
        <div className="hidden md:grid md:grid-cols-6 gap-3 relative">
          {TIMELINE_STEPS.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;

            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`group text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-600/10 dark:bg-blue-600/15 border-blue-600 dark:border-blue-500 shadow-sm'
                    : isCompleted
                    ? 'bg-white dark:bg-[#0F172A]/70 border-emerald-500/40 dark:border-emerald-500/30 hover:border-blue-500/50'
                    : 'bg-white dark:bg-[#0F172A]/60 border-slate-200 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isSelected
                        ? 'text-blue-600 dark:text-blue-400'
                        : isCompleted
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    STEP {item.step}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : isCompleted
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold font-display text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.phase}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.duration[selectedTrack]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* 6-Step Detailed Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIMELINE_STEPS.map((item, idx) => {
            const Icon = item.icon;
            const isHighlighted = idx === activeStepIndex;

            return (
              <div
                key={item.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-200 flex flex-col justify-between cursor-pointer border ${
                  isHighlighted
                    ? 'bg-white dark:bg-[#0F172A] border-blue-600 dark:border-blue-500 shadow-xl shadow-blue-600/5 ring-1 ring-blue-600/20'
                    : 'bg-white dark:bg-[#0F172A]/85 border-slate-200 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-slate-700 shadow-sm'
                }`}
              >
                <div>
                  {/* Top Metadata Bar: Step Number · Phase · Duration */}
                  <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isHighlighted
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                            : 'bg-blue-50 dark:bg-slate-800/90 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-slate-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-mono">
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            STEP {item.step}
                          </span>
                          <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
                            &middot;
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            {item.phase}
                          </span>
                        </div>
                        <p className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                          {item.duration[selectedTrack]}
                        </p>
                      </div>
                    </div>

                    {idx < TIMELINE_STEPS.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                    )}
                  </div>

                  {/* Step Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white mb-2.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Track-Specific Focus Callout */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/70 dark:border-slate-800/80 mb-5">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold mb-1">
                      <Layers className="w-3 h-3" />
                      <span>{currentTrack.label} Focus</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item.focusByTrack[selectedTrack]}
                    </p>
                  </div>
                </div>

                {/* Key Deliverables Footer */}
                <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Key Deliverables
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-700 dark:text-slate-300">
                    {item.deliverables.map((deliv, dIdx) => (
                      <React.Fragment key={deliv}>
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500 dark:text-emerald-400 shrink-0" />
                          <span>{deliv}</span>
                        </span>
                        {dIdx < item.deliverables.length - 1 && (
                          <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
                            &middot;
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Summary Bar */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="hidden sm:flex w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold font-display text-slate-900 dark:text-white">
                Ready to kick off Step 01?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Get a tailored project timeline, technical architecture plan, and fixed milestone estimate within 24 hours.
              </p>
            </div>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-blue-600/25 shrink-0"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectTimelineSection;
