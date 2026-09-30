import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp,
  Lock,
  GitBranch,
  Mail,
  Phone,
  MapPin,
  Download,
  Copy,
  Check,
  ChevronDown,
} from 'lucide-react';

export const Footer = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [openMenus, setOpenMenus] = useState({
    nav: true,
    capabilities: true,
    connect: true,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = (key) => {
    // Only allow toggle on mobile and tablet size
    if (window.innerWidth >= 1024) return;
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  const serviceLinks = [
    { name: 'MERN Stack Applications', path: '/contact?service=MERN+Stack+Development' },
    { name: 'Custom Shopify Stores & Liquid', path: '/contact?service=Shopify+E-Commerce+Store' },
    { name: 'WordPress & WooCommerce', path: '/contact?service=WordPress+Development' },
    { name: 'Core Web Vitals & Speed Optimization', path: '/contact?service=Website+Optimization' },
    { name: 'SEO Architecture & Indexing', path: '/contact?service=SEO' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#070A11] relative transition-colors duration-200 pt-16 pb-12">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          {/* Column 1: Brand & Availability (Col Span 5) */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <Link
                to="/"
                className="text-2xl font-bold font-display text-slate-900 dark:text-white tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Abhay Kumar</span>
              </Link>
              <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold mt-1">
                Full-Stack Web Developer &bull; MERN &bull; Shopify &bull; WordPress
              </p>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
              Engineering high-performance web applications, bespoke Shopify storefronts, and search-optimized digital platforms that convert visitors into loyal customers.
            </p>

            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-slate-700 dark:text-slate-300 font-medium">
                Available for New Client Projects &amp; Contracts
              </span>
            </div>

            {/* Direct Copy Email Action */}
            <div className="pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard('algoaxisoftech@gmail.com')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 transition-all cursor-pointer shadow-xs group"
                  title="Click to copy email address"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                  <span>algoaxisoftech@gmail.com</span>
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500 ml-1" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 ml-1" />
                  )}
                </button>
                {copiedEmail && (
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium animate-in fade-in">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (Col Span 2) - Menu with Toggle (Mobile/Tablet only) */}
          <div className="lg:col-span-2 space-y-3">
            <button
              onClick={() => toggleMenu('nav')}
              className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-wider font-semibold text-slate-900 dark:text-slate-200 group/toggle cursor-pointer lg:cursor-default py-1 select-none border-b border-slate-100 dark:border-slate-800/60 pb-2"
              aria-expanded={openMenus.nav}
            >
              <span className="group-hover/toggle:text-blue-600 dark:group-hover/toggle:text-blue-400 transition-colors">
                Navigation
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 lg:hidden ${
                  openMenus.nav ? 'rotate-180 text-blue-500' : 'text-slate-400'
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {(!isMobileOrTablet || openMenus.nav) && (
                <motion.ul
                  initial={isMobileOrTablet ? { height: 0, opacity: 0 } : false}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="space-y-2.5 text-xs sm:text-sm font-medium overflow-hidden pt-1"
                >
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors block py-0.5"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Column 3: Services (Col Span 3) - Menu with Toggle (Mobile/Tablet only) */}
          <div className="lg:col-span-3 space-y-3">
            <button
              onClick={() => toggleMenu('capabilities')}
              className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-wider font-semibold text-slate-900 dark:text-slate-200 group/toggle cursor-pointer lg:cursor-default py-1 select-none border-b border-slate-100 dark:border-slate-800/60 pb-2"
              aria-expanded={openMenus.capabilities}
            >
              <span className="group-hover/toggle:text-blue-600 dark:group-hover/toggle:text-blue-400 transition-colors">
                Core Capabilities
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 lg:hidden ${
                  openMenus.capabilities ? 'rotate-180 text-blue-500' : 'text-slate-400'
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {(!isMobileOrTablet || openMenus.capabilities) && (
                <motion.ul
                  initial={isMobileOrTablet ? { height: 0, opacity: 0 } : false}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="space-y-2.5 text-xs sm:text-sm overflow-hidden pt-1"
                >
                  {serviceLinks.map((service) => (
                    <li key={service.name}>
                      <Link
                        to={service.path}
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors block py-0.5 line-clamp-1"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Column 4: Direct Connect & Downloads (Col Span 2) - Menu with Toggle (Mobile/Tablet only) */}
          <div className="lg:col-span-2 space-y-3">
            <button
              onClick={() => toggleMenu('connect')}
              className="w-full flex items-center justify-between text-xs font-mono uppercase tracking-wider font-semibold text-slate-900 dark:text-slate-200 group/toggle cursor-pointer lg:cursor-default py-1 select-none border-b border-slate-100 dark:border-slate-800/60 pb-2"
              aria-expanded={openMenus.connect}
            >
              <span className="group-hover/toggle:text-blue-600 dark:group-hover/toggle:text-blue-400 transition-colors">
                Connect &amp; Specs
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 lg:hidden ${
                  openMenus.connect ? 'rotate-180 text-blue-500' : 'text-slate-400'
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {(!isMobileOrTablet || openMenus.connect) && (
                <motion.div
                  initial={isMobileOrTablet ? { height: 0, opacity: 0 } : false}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="space-y-3 text-xs overflow-hidden pt-1"
                >
                  <a
                    href="https://github.com/abhay-kumar-js"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors group"
                  >
                    <GitBranch className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="font-mono truncate">github.com/abhay-kumar-js</span>
                  </a>

                  <a
                    href="tel:+917379289932"
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="font-mono">+91-7379289932</span>
                  </a>

                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    <span className="font-mono">India (Remote Global)</span>
                  </div>

                  <div className="pt-2">
                    <a
                      href="/assets/Abhay_Kumar_Web-Dev-CV.pdf"
                      download="Abhay_Kumar_Web-Dev-CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-all shadow-md shadow-blue-600/20"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>CV (PDF)</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Code Standards & Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <p>© 2026 Abhay Kumar. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-center sm:text-left">
            <span>Built with React 19, Tailwind CSS &amp; Node.js</span>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">&bull;</span>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Admin Portal</span>
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-xs"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-500" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
