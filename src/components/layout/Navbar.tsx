import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock, ChevronRight } from 'lucide-react';
import { LabPortalModal } from './LabPortalModal';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/concepts/industrial';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/concepts/industrial' },
    { label: 'About', path: '/concepts/industrial/about' },
    { label: 'Capabilities', path: '/concepts/industrial/capabilities' },
    { label: 'Process', path: '/concepts/industrial/process' },
  ];

  const isActive = (path: string) => {
    if (path === '/concepts/industrial') {
      return location.pathname === '/concepts/industrial';
    }
    return location.pathname.startsWith(path);
  };

  const isDarkHeroOverlaid = !isScrolled;

  // Auto-close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header 
        className={`fixed top-0 z-40 w-full transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? isDarkHeroOverlaid
              ? 'bg-charcoal-950 border-b border-charcoal-800 text-white shadow-2xl'
              : 'bg-white border-b border-charcoal-200 text-charcoal shadow-xl'
            : isDarkHeroOverlaid
              ? 'bg-transparent border-b border-transparent text-white shadow-none'
              : 'bg-white/90 backdrop-blur-xl border-b border-charcoal-200/60 text-charcoal shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand Identity */}
            <Link 
              to="/concepts/industrial" 
              className="flex items-center space-x-3.5 group focus:outline-none focus:ring-2 focus:ring-industrial-orange rounded p-1"
              aria-label="Danieli Corus Refractory Testing Laboratory"
            >
              {/* Danieli Corus Official Brand Logo with Auto Invert for Dark vs Light Glass */}
              <div className="flex items-center">
                <img 
                  src="/images/danieli-corus-logo.svg" 
                  alt="Danieli Corus" 
                  className={`h-8 sm:h-9 w-auto object-contain transition-all duration-300 ${
                    isDarkHeroOverlaid ? 'brightness-0 invert' : 'brightness-100'
                  }`}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={`px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold tracking-normal transition-all uppercase whitespace-nowrap relative rounded-sm ${
                      active
                        ? 'text-industrial-orange font-bold'
                        : isDarkHeroOverlaid
                          ? 'text-charcoal-200 hover:text-white hover:bg-white/10'
                          : 'text-charcoal-700 hover:text-charcoal-950 hover:bg-industrial-lightGray/70'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 left-2.5 right-2.5 xl:left-3 xl:right-3 h-[2px] bg-industrial-orange animate-fadeIn"></span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right Actions: Lab Portal CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                to="/concepts/industrial/login"
                className={`inline-flex items-center space-x-2 px-3.5 xl:px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase transition-all whitespace-nowrap rounded-sm focus:outline-none focus:ring-2 focus:ring-industrial-orange ${
                  isDarkHeroOverlaid
                    ? 'text-white bg-charcoal-900/80 border border-white/20 hover:border-industrial-orange hover:bg-industrial-orange shadow-sm'
                    : 'text-charcoal bg-white border border-charcoal-300 hover:border-charcoal hover:bg-charcoal hover:text-white shadow-sm'
                }`}
                title="Access Danieli Corus LIMS Portal"
              >
                <Lock className="w-3.5 h-3.5 text-industrial-orange group-hover:text-white" />
                <span>Lab Portal</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <Link
                to="/concepts/industrial/login"
                className={`p-2 transition-colors ${
                  isDarkHeroOverlaid ? 'text-white hover:text-industrial-orange' : 'text-charcoal hover:text-industrial-orange'
                }`}
                aria-label="Lab Portal Login"
              >
                <Lock className="w-5 h-5 text-industrial-orange" />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-industrial-orange ${
                  isDarkHeroOverlaid ? 'text-white hover:text-industrial-orange' : 'text-charcoal hover:text-industrial-orange'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Explicit High-Contrast Styling */}
        {mobileMenuOpen && (
          <div 
            className={`lg:hidden border-b px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-fadeIn ${
              isDarkHeroOverlaid
                ? 'bg-charcoal-950 border-charcoal-800 text-white'
                : 'bg-white border-charcoal-200 text-charcoal-900'
            }`}
          >
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 text-sm font-semibold tracking-wide uppercase border-l-2 transition-colors rounded-sm ${
                    active
                      ? isDarkHeroOverlaid
                        ? 'border-industrial-orange text-industrial-orange bg-industrial-orange/15 font-bold'
                        : 'border-industrial-orange text-industrial-orange bg-industrial-orange/10 font-bold'
                      : isDarkHeroOverlaid
                        ? 'border-transparent text-charcoal-200 hover:text-white hover:bg-white/10'
                        : 'border-transparent text-charcoal-700 hover:text-charcoal-950 hover:bg-charcoal-100'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isDarkHeroOverlaid ? 'text-charcoal-400' : 'text-charcoal-400'}`} />
                </Link>
              );
            })}

            <div className={`pt-4 border-t mt-2 ${isDarkHeroOverlaid ? 'border-charcoal-800' : 'border-charcoal-100'}`}>
              <Link
                to="/concepts/industrial/login"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 text-xs font-mono font-bold tracking-wider uppercase transition-colors rounded-sm ${
                  isDarkHeroOverlaid
                    ? 'text-white bg-charcoal-800 hover:bg-industrial-orange border border-white/20'
                    : 'text-white bg-charcoal hover:bg-industrial-orange'
                }`}
              >
                <Lock className="w-4 h-4 text-industrial-orange" />
                <span>Lab Portal (Internal LIMS)</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Lab Portal Modal */}
      <LabPortalModal
        isOpen={isPortalModalOpen}
        onClose={() => setIsPortalModalOpen(false)}
      />
    </>
  );
};
