import React, { useEffect } from 'react';
import { Briefcase, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Experience = () => {
  useEffect(() => {
    document.title = 'Experience | Abhay Kumar Web Developer';
  }, []);

  const areas = [
    {
      title: 'Full-Stack Web Development',
      desc: 'Architecting scalable web apps with React.js, Node.js, Express, and MongoDB with modern authentication flows.',
    },
    {
      title: 'E-Commerce Storefronts',
      desc: 'Developing fast, high-converting digital shopping experiences with bespoke product discovery journeys.',
    },
    {
      title: 'Shopify Engineering',
      desc: 'Liquid theme customization, custom sections, app integrations, and conversion-focused checkout optimizations.',
    },
    {
      title: 'WordPress & CMS',
      desc: 'Building responsive, manageable business websites with secure plugin architecture and custom layouts.',
    },
    {
      title: 'Search Engine Optimization (SEO)',
      desc: 'Technical site audits, structural semantic HTML, meta tuning, and mobile indexing optimization.',
    },
    {
      title: 'Website Performance & Core Web Vitals',
      desc: 'Asset optimization, script deferral, latency reduction, and smooth 90+ mobile Lighthouse scores.',
    },
    {
      title: 'Responsive Design',
      desc: 'Pixel-perfect mobile, tablet, and high-DPI desktop viewports with fluid CSS grid and flexbox layouts.',
    },
    {
      title: 'Graphic Design & Digital Branding',
      desc: 'High-impact social creatives, web banners, marketing assets, and cohesive visual identities.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-2 font-mono">
          Track Record &amp; Focus
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-4">
          4+ Years of Web Development Experience
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          Experienced in designing, developing, optimizing, and maintaining modern websites and web applications for businesses, startups, and brands.
        </p>
      </div>

      {/* Professional Timeline Card */}
      <div className="max-w-4xl">
        <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-500/40 pb-4">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#080B11]" />

          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] border border-slate-800 shadow-xl space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-display text-white">
                    Web Developer
                  </h2>
                  <p className="text-xs font-mono text-blue-400">
                    Full-Stack &amp; E-Commerce Engineering
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-white self-start sm:self-auto">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>4+ Years Cumulative Experience</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Demonstrated capability designing and delivering production-ready digital products across the MERN stack, Shopify, and WordPress. Focused on measurable performance, search visibility, maintainable code, and clean user experience.
            </p>

            {/* Competency Deliverables */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 font-semibold">
                Areas of Applied Experience
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {areas.map((area) => (
                  <div
                    key={area.title}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white mb-0.5">{area.title}</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{area.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Professional &amp; Truthful Representation</span>
              </span>

              <Link
                to="/contact"
                className="text-blue-400 hover:text-blue-300 font-semibold uppercase tracking-wider"
              >
                Hire Abhay →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
