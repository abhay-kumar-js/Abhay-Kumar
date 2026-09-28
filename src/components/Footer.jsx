import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Lock } from 'lucide-react';

export const Footer = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-800 bg-[#06080D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          {/* Brand & Subtitle */}
          <div className="text-center md:text-left">
            <Link to="/" className="text-xl font-bold font-display text-white tracking-tight hover:text-blue-400 transition-colors">
              Abhay Kumar
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              Web Developer • MERN Stack • Shopify • WordPress • SEO
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Back to top button */}
          <div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>
        </div>

        {/* Bottom row: Copyright + Admin Access Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>© 2026 Abhay Kumar. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              Crafted for speed, modern aesthetics, and measurable impact.
            </span>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
