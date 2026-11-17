import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const IndustrialLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-charcoal font-sans antialiased selection:bg-industrial-orange selection:text-white">
      <Navbar />
      <main className="flex-grow pt-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
