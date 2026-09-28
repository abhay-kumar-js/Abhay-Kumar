import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface ContactProps {
  selectedServicePreset?: string;
}

export const Contact: React.FC<ContactProps> = ({ selectedServicePreset }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceRequired: 'MERN Stack Development',
    projectDetails: '',
    budget: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedServicePreset) {
      setFormData((prev) => ({
        ...prev,
        serviceRequired: selectedServicePreset,
      }));
    }
  }, [selectedServicePreset]);

  const serviceOptions = [
    'MERN Stack Development',
    'Shopify Development',
    'WordPress Development',
    'SEO (Search Engine Optimization)',
    'Graphic Design',
    'Website Optimization',
    'Full-Stack / Custom Solution',
  ];

  const budgetOptions = [
    'Flexible / Let’s Discuss',
    'Under $1,000 / ₹50k',
    '$1,000 - $3,000 / ₹50k - ₹1.5L',
    '$3,000 - $5,000 / ₹1.5L - ₹3L',
    '$5,000+ / ₹3L+',
  ];

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = 'Please provide your name.';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      err.email = 'Please provide a valid email address.';
    }
    if (!formData.projectDetails.trim() || formData.projectDetails.length < 10) {
      err.projectDetails = 'Please share a few details about your project (at least 10 characters).';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate brief processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceRequired: 'MERN Stack Development',
      projectDetails: '',
      budget: '',
    });
    setSubmitted(false);
    setErrors({});
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative border-t border-slate-800/80 bg-[#070A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Context */}
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-2 font-mono">
              09. Get in Touch
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white mb-4 text-balance">
              Have a Project in Mind?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Let's build something modern, fast, and impactful together.
            </p>

            {/* Availability Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] border border-slate-800 space-y-4 mb-8">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-semibold text-white">Current Availability</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Available for freelance projects, collaborations, and professional opportunities.
              </p>
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Location: India</span>
                <span className="text-slate-600">·</span>
                <span>Timezone: IST (UTC+5:30)</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>NDA &amp; Intellectual Property Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Fast turnaround &amp; continuous communication</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Full-cycle deployment &amp; post-launch support</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] border border-slate-800 shadow-2xl shadow-black/60 relative">
              {submitted ? (
                /* Success Message State */
                <div className="text-center py-10 px-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white mb-2">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your project inquiry for{' '}
                    <strong className="text-blue-400">{formData.serviceRequired}</strong> has been logged. Abhay will get back to you shortly at <strong className="text-white">{formData.email}</strong>.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 max-w-md mx-auto text-left text-xs text-slate-400 mb-8 space-y-1">
                    <p className="text-slate-300 font-mono font-semibold">Summary of details:</p>
                    <p className="truncate">• Details: {formData.projectDetails}</p>
                    {formData.budget && <p>• Budget: {formData.budget}</p>}
                    {formData.phone && <p>• Phone: {formData.phone}</p>}
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-2">
                        Your Name <span className="text-blue-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.name ? 'border-rose-500' : 'border-slate-800'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-400 mt-1 font-mono">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-2">
                        Email Address <span className="text-blue-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.email ? 'border-rose-500' : 'border-slate-800'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 mt-1 font-mono">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-2">
                        Phone (Optional)
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      />
                    </div>

                    {/* Service Required */}
                    <div>
                      <label htmlFor="contact-service" className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-2">
                        Service Required <span className="text-blue-400">*</span>
                      </label>
                      <select
                        id="contact-service"
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      >
                        {serviceOptions.map((s) => (
                          <option key={s} value={s} className="bg-slate-900 text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget (Optional) */}
                  <div>
                    <label htmlFor="contact-budget" className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-2">
                      Project Budget Range (Optional)
                    </label>
                    <select
                      id="contact-budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      <option value="">Select budget range...</option>
                      {budgetOptions.map((b) => (
                        <option key={b} value={b} className="bg-slate-900 text-white">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label htmlFor="contact-details" className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-2">
                      Project Details <span className="text-blue-400">*</span>
                    </label>
                    <textarea
                      id="contact-details"
                      rows={4}
                      required
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      placeholder="Briefly describe your goals, required features, timeline, or current website URL..."
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.projectDetails ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                    {errors.projectDetails && (
                      <p className="text-xs text-rose-400 mt-1 font-mono">{errors.projectDetails}</p>
                    )}
                  </div>

                  {/* Submit CTA Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Processing Inquiry...</span>
                      ) : (
                        <>
                          <span>Start a Project</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
