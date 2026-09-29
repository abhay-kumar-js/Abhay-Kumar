import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#080B11]/92 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-900/5 dark:shadow-black/40 py-3.5'
          : 'bg-white/80 dark:bg-[#080B11]/60 backdrop-blur-sm border-b border-slate-200/40 dark:border-transparent py-4'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link
            to="/"
            className="text-lg sm:text-xl font-bold font-display tracking-tight text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
            <span>Abhay Kumar</span>
          </Link>

          {/* Desktop Nav Links (Desktop 1024px+) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-wider font-semibold transition-colors duration-150 relative py-1 ${
                    isActive
                      ? 'text-blue-600 dark:text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Admin CMS Indicator */}
            {user ? (
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                title="Go to Admin Dashboard"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin CMS</span>
              </Link>
            ) : null}

            {/* Resume Download CTA */}
            <a
              href="/assets/Abhay_Kumar_Resume.pdf"
              download="Abhay_Kumar_Resume.pdf"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              title="Download Abhay Kumar's Resume (PDF)"
            >
              <Download className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              <span>Resume</span>
            </a>

            {/* Let's Work Together CTA */}
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg transition-all shadow-md shadow-blue-600/20 hover:shadow-blue-500/30 whitespace-nowrap"
            >
              <span>Let's Work Together</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile & Tablet Right-Side Hamburger Button (< 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70 border border-slate-200 dark:border-slate-800/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer (< 1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-white/10 bg-white/98 dark:bg-[#0A0E17]/98 backdrop-blur-xl px-4 sm:px-8 pt-4 pb-6 animate-in slide-in-from-top duration-200 shadow-2xl">
          <nav className="flex flex-col space-y-1.5 mb-5 max-w-xl mx-auto" aria-label="Mobile and Tablet Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2.5 text-sm font-semibold rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-600/15 text-blue-600 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                  </>
                )}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/admin"
                className="px-4 py-2.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 rounded-xl flex items-center justify-between"
              >
                <span>Admin Dashboard</span>
                <ShieldCheck className="w-4 h-4" />
              </NavLink>
            )}
            <a
              href="/assets/Abhay_Kumar_Resume.pdf"
              download="Abhay_Kumar_Resume.pdf"
              className="px-4 py-2.5 text-sm font-semibold rounded-xl text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800/60 transition-all flex items-center justify-between border border-blue-200 dark:border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20"
            >
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                PDF
              </span>
            </a>
          </nav>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 max-w-xl mx-auto sm:hidden flex flex-col gap-3">
            <Link
              to="/contact"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-lg shadow-blue-600/30"
            >
              <span>Let's Work Together</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
