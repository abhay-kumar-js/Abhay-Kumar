import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export const PublicLayout = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080B11] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-white transition-colors duration-200">
      {/* Top sticky navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
