import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { api } from '../services/api.js';

const serviceOptions = [
  'MERN Stack Development',
  'Shopify Development',
  'WordPress Development',
  'SEO & Core Web Vitals',
  'Website Optimization',
  'Graphic Design & Branding',
  'Other / Custom Inquiry',
];

export const ContactPopupModal = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'MERN Stack Development',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const isContactPage =
    pathname === '/contact' || pathname.startsWith('/contact/');

  useEffect(() => {
    if (isContactPage) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [pathname, isContactPage]);

  // Handle Escape key & body scroll lock when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (isContactPage || !isOpen) {
    return null;
  }

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please provide your full name';
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please provide details about your project or inquiry';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await api.contact.sendMessage(formData);
      if (res && res.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(res?.message || 'Failed to submit message');
      }
    } catch (err) {
      console.error('Popup contact submission error:', err);
      setStatus('error');
      setErrorMessage(
        err.message || 'Unable to connect to the server. Please try again.'
      );
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (status === 'success') {
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
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-contact-title"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close contact form popup"
          className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6 px-2 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3
              id="popup-contact-title"
              className="text-xl font-bold font-display text-slate-900 dark:text-white"
            >
              Message Sent Successfully
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Thank you,{' '}
              <strong className="text-slate-900 dark:text-white">
                {formData.name}
              </strong>
              . Your inquiry for{' '}
              <strong className="text-blue-600 dark:text-blue-400">
                {formData.service}
              </strong>{' '}
              has been received. Abhay will reach out to you shortly at{' '}
              <strong className="text-slate-900 dark:text-white">
                {formData.email}
              </strong>
              .
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="pr-8">
              <p className="text-xs uppercase tracking-widest font-semibold text-blue-600 dark:text-blue-400 mb-1 font-mono">
                Quick Inquiry
              </p>
              <h2
                id="popup-contact-title"
                className="text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white"
              >
                Have a Project in Mind?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Share your requirements below and let&apos;s build something impactful together.
              </p>
            </div>

            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 flex items-start gap-2.5 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  {errorMessage || 'Something went wrong. Please try again.'}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="popup-name"
                    className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Your Name <span className="text-blue-600 dark:text-blue-400">*</span>
                  </label>
                  <input
                    id="popup-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. John Doe"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      formErrors.name
                        ? 'border-rose-500'
                        : 'border-slate-300 dark:border-slate-800'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-xs text-rose-500 dark:text-rose-400 mt-1 font-mono">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="popup-email"
                    className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Email Address <span className="text-blue-600 dark:text-blue-400">*</span>
                  </label>
                  <input
                    id="popup-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@company.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      formErrors.email
                        ? 'border-rose-500'
                        : 'border-slate-300 dark:border-slate-800'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-xs text-rose-500 dark:text-rose-400 mt-1 font-mono">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label
                    htmlFor="popup-phone"
                    className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    id="popup-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91-00000-00000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>

                {/* Service */}
                <div>
                  <label
                    htmlFor="popup-service"
                    className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Service Required <span className="text-blue-600 dark:text-blue-400">*</span>
                  </label>
                  <select
                    id="popup-service"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    {serviceOptions.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="popup-message"
                  className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Project Details <span className="text-blue-600 dark:text-blue-400">*</span>
                </label>
                <textarea
                  id="popup-message"
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell me about your project, goals, or timeline..."
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    formErrors.message
                      ? 'border-rose-500'
                      : 'border-slate-300 dark:border-slate-800'
                  }`}
                />
                {formErrors.message && (
                  <p className="text-xs text-rose-500 dark:text-rose-400 mt-1 font-mono">
                    {formErrors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-1 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  {status === 'sending' ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPopupModal;
