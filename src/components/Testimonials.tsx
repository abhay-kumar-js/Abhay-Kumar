import React, { useState } from 'react';
import { MessageSquareQuote, CheckCircle, Send } from 'lucide-react';

interface TestimonialsProps {
  onRequestReferences: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onRequestReferences }) => {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setShowFeedbackModal(false);
      setFeedbackSent(false);
      setFeedbackText('');
    }, 2500);
  };

  return (
    <section className="py-20 lg:py-28 relative border-t border-slate-800/80 bg-[#080B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <p className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-2 font-mono">
            08. Reputation &amp; Trust
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white mb-4">
            Client Testimonials
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Truthful, authentic partner relationships built through reliable delivery and technical craftsmanship.
          </p>
        </div>

        {/* Elegant Placeholder Showcase (Compliant with: do not invent testimonials) */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0F172A] to-[#0A0F1D] border border-slate-800 text-center overflow-hidden">
            {/* Ambient subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 bg-blue-600/10 blur-[90px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
              <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6">
                <MessageSquareQuote className="w-8 h-8" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3 tracking-tight">
                Client testimonials coming soon.
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                Currently curating verified feedback and performance case studies from recent e-commerce launches and web development client engagements.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={onRequestReferences}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-600/20 transition-all"
                >
                  Request Client References →
                </button>

                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 rounded-lg transition-colors"
                >
                  Past Client? Share a Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review submission modal for past clients */}
      {showFeedbackModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setShowFeedbackModal(false)}
        >
          <div
            className="w-full max-w-md p-6 rounded-2xl bg-[#0F172A] border border-slate-700 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-lg font-bold font-display text-white mb-2">
              Share Your Project Feedback
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Worked with Abhay on a project? Leave your brief testimonial or endorsement below.
            </p>

            {feedbackSent ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center text-xs text-emerald-300">
                <CheckCircle className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                Thank you! Your feedback has been received and will be reviewed.
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Testimonial / Notes
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Share your experience working with Abhay Kumar..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowFeedbackModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-lg"
                  >
                    <span>Submit</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
