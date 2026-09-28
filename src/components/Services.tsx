import React from 'react';
import { SERVICES, Service } from '../data/portfolioData';
import {
  Code2,
  ShoppingBag,
  Globe,
  Search,
  Palette,
  Gauge,
  Check,
  ArrowUpRight,
} from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Search':
        return <Search className="w-5 h-5 text-amber-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-rose-400" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5 text-purple-400" />;
      default:
        return <Code2 className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 relative border-t border-slate-800/80 bg-[#080B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-2 font-mono">
            02. Core Capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mb-4">
            What I Do
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            From idea to launch, I help businesses build and improve their digital presence.
          </p>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service: Service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between p-7 rounded-2xl bg-gradient-to-b from-[#0F172A]/90 to-[#0A0E1A]/90 border border-slate-800/90 hover:border-blue-500/40 transition-all duration-200 group shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
            >
              <div>
                {/* Header: Number and Icon */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <span className="font-mono text-xs font-bold text-blue-400 tracking-wider">
                    {service.number}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    {getIcon(service.iconName)}
                  </div>
                </div>

                {/* Service Title & Tagline */}
                <h3 className="text-xl font-bold font-display text-white mb-2.5 group-hover:text-blue-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {service.tagline}
                </p>

                {/* Scope Item Checkmarks */}
                <div className="space-y-2.5 mb-8">
                  {service.items.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <Check className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Trigger */}
              <div className="pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-blue-400 py-1 transition-colors"
                >
                  <span>Request Proposal</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
