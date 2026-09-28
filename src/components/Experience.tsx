import React from 'react';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';

export const Experience: React.FC = () => {
  const keyAreas = [
    'Full-stack web development',
    'E-commerce development',
    'Shopify',
    'WordPress',
    'SEO',
    'Website performance',
    'Responsive UI development',
    'Graphic design',
  ];

  return (
    <section id="experience" className="py-20 lg:py-28 relative border-t border-slate-800/80 bg-[#070A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <p className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-2 font-mono">
            05. Career &amp; Track Record
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mb-4">
            4+ Years of Experience
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A proven record of delivering high-performing web platforms, e-commerce storefronts, and digital solutions.
          </p>
        </div>

        {/* Professional Timeline Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-500/40 pb-4">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#070A0F]" />

            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] border border-slate-800 shadow-xl">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                      Web Developer
                    </h3>
                    <p className="text-xs text-blue-400 font-mono font-medium">
                      Full-Stack &amp; E-Commerce Specialist
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-semibold text-white">4+ Years</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Experienced in designing, developing, optimizing, and maintaining modern websites and web applications for businesses and brands.
              </p>

              {/* Key Competency Areas */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Key Focus Areas &amp; Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {keyAreas.map((area) => (
                    <div
                      key={area}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs sm:text-sm text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
