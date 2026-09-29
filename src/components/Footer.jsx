import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Lock, GitBranch } from 'lucide-react';

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
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#06080D] relative transition-colors duration-200">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800/80">
          {/* Brand & Subtitle */}
          <div className="text-center md:text-left">
            <Link to="/" className="text-xl font-bold font-display text-slate-900 dark:text-white tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Abhay Kumar
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-mono mt-1">
              Web Developer • MERN Stack • Shopify • WordPress • SEO
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <a href="mailto:algoaxisoftech@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                algoaxisoftech@gmail.com
              </a>
              <span className="text-slate-400 dark:text-slate-600">·</span>
              <a href="tel:+917379289932" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                +91-7379289932
              </a>
              <span className="text-slate-400 dark:text-slate-600">·</span>
              <a
                href="https://github.com/abhay-kumar-js"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 hover:underline"
              >
                <GitBranch className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                <span>github.com/abhay-kumar-js</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-xs uppercase tracking-wider font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Back to top button */}
          <div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg hover:border-slate-400 dark:hover:border-slate-700 transition-colors cursor-pointer shadow-sm"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
            </button>
          </div>
        </div>

        {/* Bottom row: Copyright + Admin Access Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <p>© 2026 Abhay Kumar. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-500 dark:text-slate-400">
              Crafted for speed, modern aesthetics, and measurable impact.
            </span>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-slate-200 transition-colors"
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
