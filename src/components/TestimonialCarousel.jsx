import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Play,
  Pause,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SHOPIFY_TESTIMONIALS } from '../data/portfolioData.ts';

export const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const timerRef = useRef(null);

  const testimonials = SHOPIFY_TESTIMONIALS;
  const current = testimonials[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoPlay || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, isPaused, testimonials.length]);

  return (
    <section
      className="relative py-8 sm:py-12"
      aria-label="Shopify Client Testimonials and Success Stories"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Shopify Success Stories &amp; Proof</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-slate-900 dark:text-white">
              Client Feedback &amp; Measurable Store Impact
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              Real results from high-growth Shopify stores, luxury brands, and custom e-commerce experiences.
            </p>
          </div>

          {/* Controls: Prev/Next & AutoPlay */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-700 transition-all cursor-pointer shadow-sm"
              title={autoPlay ? 'Pause auto-slide' : 'Resume auto-slide'}
              aria-label={autoPlay ? 'Pause auto-slide' : 'Resume auto-slide'}
            >
              {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 p-1 rounded-xl shadow-sm">
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="px-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="text-slate-900 dark:text-white font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="text-slate-400 dark:text-slate-600 mx-1">/</span>
                <span>{String(testimonials.length).padStart(2, '0')}</span>
              </div>
              <button
                onClick={handleNext}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Store Tabs Quick Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800/80">
          {testimonials.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium font-mono whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-600/20 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-500/50 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-blue-500' : 'bg-slate-400 dark:bg-slate-600'}`} />
                <span>{item.storeName}</span>
              </button>
            );
          })}
        </div>

        {/* Main Testimonial Card */}
        <div className="relative rounded-3xl bg-white dark:bg-gradient-to-br dark:from-[#0F172A] dark:via-[#0D1527] dark:to-[#0A0F1D] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-900/5 dark:shadow-2xl overflow-hidden group">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Client Feedback & Identity */}
            <div className="lg:col-span-7 space-y-6">
              {/* Top Meta: Stars + Store Category */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 ml-1.5">
                    5.0 Verified Store
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span>{current.storeCategory}</span>
                </div>
              </div>

              {/* Quote text */}
              <div className="relative">
                <Quote className="w-10 h-10 text-blue-500/15 dark:text-blue-500/20 absolute -top-4 -left-2 -z-0" />
                <p className="text-lg sm:text-xl lg:text-2xl text-slate-800 dark:text-slate-100 font-medium leading-relaxed relative z-10">
                  "{current.quote}"
                </p>
              </div>

              {/* Client Info + Store Link */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold font-display text-base shadow-md shadow-blue-600/30 shrink-0">
                    {current.clientName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base font-display">
                      {current.clientName}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {current.clientRole} ·{' '}
                      <span className="text-blue-600 dark:text-blue-400">{current.clientCompany}</span>
                    </p>
                  </div>
                </div>

                {current.storeUrl ? (
                  <a
                    href={current.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all self-start sm:self-auto group/btn shadow-sm"
                  >
                    <span>Visit Live Store</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 self-start sm:self-auto">
                    Private Client Deployment
                  </span>
                )}
              </div>
            </div>

            {/* Right: Quantified Business Metrics Box */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-slate-50 dark:bg-[#090E1A]/90 border border-slate-200 dark:border-slate-800/90 p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-xs font-mono text-slate-700 dark:text-slate-300 uppercase tracking-wider font-semibold">
                      Quantified Result
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-500/20 font-semibold">
                    Shopify
                  </span>
                </div>

                {/* Primary Huge Metric */}
                <div>
                  <div className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
                    {current.highlightMetric}
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-300 mt-1">
                    {current.metricLabel}
                  </p>
                </div>

                {/* Secondary Metric */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400">Benchmark:</span>
                  <span className="font-semibold text-slate-900 dark:text-white bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md shadow-xs">
                    {current.secondaryMetric}
                  </span>
                </div>

                {/* Technical Stack Tags */}
                <div className="pt-2">
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-medium">
                    Technical Scope
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {current.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom mini CTA */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
                  <Link
                    to={`/contact?subject=${encodeURIComponent('Shopify Store Development - ' + current.storeName)}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-600/20 dark:hover:bg-blue-600/30 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-white text-xs font-mono font-semibold transition-all"
                  >
                    <span>Request Similar Store Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-center gap-2">
            {testimonials.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  dotIdx === currentIndex
                    ? 'w-8 h-2 bg-blue-500'
                    : 'w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
                aria-label={`Go to testimonial ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
