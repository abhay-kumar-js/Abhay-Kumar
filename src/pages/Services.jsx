import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import ServiceCard from '../components/ServiceCard.jsx';
import Loader from '../components/Loader.jsx';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Web Development Services | Abhay Kumar';

    const fetchServices = async () => {
      try {
        const res = await api.services.getAll();
        if (res.data) {
          setServices(res.data.filter((s) => s.active !== false));
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-12 sm:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-5xl">
        <p className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-2 font-mono">
          Services &amp; Offerings
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-4">
          What I Do
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          From idea to launch, I help businesses build, optimize, and maintain their digital presence using modern web technologies.
        </p>
      </div>

      {/* Services Grid */}
      {loading ? (
        <Loader message="Loading service offerings from API..." size="large" />
      ) : error ? (
        <div className="p-8 rounded-2xl bg-rose-950/30 border border-rose-800 text-center text-rose-300">
          <p className="text-sm font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 text-xs font-mono uppercase bg-rose-600 hover:bg-rose-500 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service._id || service.slug} service={service} index={index} />
          ))}
        </div>
      )}

      {/* Process summary banner */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-xl font-bold font-display text-white">
            Need a tailored scope or custom integration?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            I deliver end-to-end solutions combining custom full-stack development, headless e-commerce, and high-performance search optimization.
          </p>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition-all whitespace-nowrap"
        >
          <span>Request Custom Proposal</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default Services;
