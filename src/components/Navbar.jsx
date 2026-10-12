import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Menu, X, ArrowRight, User } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'About', href: '#about' },
  ];

  const handleLinkClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  };

  return (
    <>
      {/* Skip to main content link for screen reader and keyboard accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-40 w-full backdrop-blur-lg border-b transition-colors duration-200 ${
          theme === 'dark'
            ? 'bg-midnight-950/80 border-white/5 text-white'
            : 'bg-white/80 border-gray-200 text-gray-900 shadow-sm'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <a
                href="#hero"
                className="group flex items-center gap-3 text-2xl font-bold tracking-tight rounded-xl p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                aria-label="EchoSight Home"
              >
                <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-400 to-violet-500 text-midnight-950 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
                  <Eye className="w-6 h-6 stroke-[2.5]" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                    EchoSight
                  </span>
                  {/* Stylized sound wave accent */}
                  <span
                    className="inline-flex items-center gap-0.5 ml-1 h-5"
                    aria-hidden="true"
                    title="Audio sensory feedback enabled"
                  >
                    <span className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="w-1 h-4 bg-cyan-300 rounded-full animate-pulse delay-75" />
                    <span className="w-1 h-3 bg-violet-400 rounded-full animate-pulse delay-150" />
                    <span className="w-1 h-1.5 bg-violet-300 rounded-full animate-pulse" />
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden md:flex items-center gap-8"
              aria-label="Primary navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 rounded-md px-1 py-0.5 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Action Buttons & Theme Toggle */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />

              <button
                type="button"
                className="btn-secondary text-sm px-4 py-2"
                onClick={() => {
                  /* Optional modal or future auth trigger */
                }}
                aria-label="Sign in to your EchoSight account"
              >
                <User className="w-4 h-4" aria-hidden="true" />
                <span>Sign In</span>
              </button>

              <Link
                to="/app"
                className="btn-primary text-sm px-4 py-2 group"
                aria-label="Start Using EchoSight application"
              >
                <span>Start Using EchoSight</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />

              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-xl transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-white hover:bg-white/10'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-menu"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full Screen Menu Overlay */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-menu"
            ref={mobileMenuRef}
            className={`fixed inset-0 top-20 z-50 md:hidden flex flex-col p-6 backdrop-blur-2xl transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-midnight-950/95 text-white'
                : 'bg-white/95 text-gray-900 shadow-2xl'
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-400"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <nav
              className="flex flex-col space-y-4"
              aria-label="Mobile primary navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`text-2xl font-semibold py-3 border-b transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                    theme === 'dark'
                      ? 'border-white/10 text-gray-200 hover:text-cyan-400'
                      : 'border-gray-200 text-gray-800 hover:text-cyan-600'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="mt-8 flex flex-col gap-4">
              <button
                type="button"
                onClick={handleLinkClick}
                className="btn-secondary w-full justify-center text-base py-3.5"
                aria-label="Sign In to your account"
              >
                <User className="w-5 h-5" aria-hidden="true" />
                <span>Sign In</span>
              </button>

              <Link
                to="/app"
                onClick={handleLinkClick}
                className="btn-primary w-full justify-center text-base py-3.5"
                aria-label="Start Using EchoSight application"
              >
                <span>Start Using EchoSight</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-auto pt-6 text-center text-xs text-gray-500">
              EchoSight &bull; AI Vision & Multilingual Audio Assistant
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
