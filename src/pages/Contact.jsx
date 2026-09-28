import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, CheckCircle2, AlertCircle, ArrowRight, Clock, Shield } from 'lucide-react';
import { api } from '../services/api.js';

export const Contact = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'MERN Stack Development',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.title = 'Contact | Abhay Kumar Web Developer';
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    }
  }, [serviceParam]);

  const serviceOptions = [
    'MERN Stack Development',
    'Shopify Development',
    'WordPress Development',
    'SEO',
    'Graphic Design',
    'Website Optimization',
    'Full-Stack / Custom Web Solution',
  ];

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = 'Please provide your full name.';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      err.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      err.message = 'Please share a few details about your project (at least 10 characters).';
    }
    setFormErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await api.contact.sendMessage(formData);
      if (res.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(res.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'MERN Stack Development',
      message: '',
    });
    setStatus('idle');
    setErrorMessage('');
    setFormErrors({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Heading & Context */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-2 font-mono">
              Start a Conversation
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-4 text-balance">
              Have a Project in Mind?
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Let's build something modern, fast, and impactful together.
            </p>
          </div>

          {/* Availability Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] border border-slate-800 space-y-4">
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
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Location: India</span>
              <span className="text-blue-400">Direct Inquiries</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Full confidentiality &amp; clear milestone scopes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Direct communication throughout the development cycle</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Post-launch assistance and technical handover</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] border border-slate-800 shadow-2xl">
            {status === 'success' ? (
              <div className="text-center py-10 px-4 space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold font-display text-white">
                  Message sent successfully.
                </h2>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry for <strong className="text-blue-400">{formData.service}</strong> has been logged in the portfolio system. Abhay will review your requirements and reach out via <strong className="text-white">{formData.email}</strong>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 flex items-start gap-3 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-2">
                      Your Name <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        formErrors.name ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-xs text-rose-400 mt-1 font-mono">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-2">
                      Email Address <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        formErrors.email ? 'border-rose-500' : 'border-slate-800'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-xs text-rose-400 mt-1 font-mono">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="service" className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-2">
                      Service Required <span className="text-blue-400">*</span>
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
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

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono font-semibold uppercase text-slate-300 mb-2">
                    Project Details <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, goals, key features, or link to your current website..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      formErrors.message ? 'border-rose-500' : 'border-slate-800'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-xs text-rose-400 mt-1 font-mono">{formErrors.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    {status === 'sending' ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Start a Project →</span>
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
  );
};

export default Contact;
