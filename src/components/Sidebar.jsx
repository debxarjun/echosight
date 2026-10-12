import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Eye,
  Banknote,
  Pill,
  UtensilsCrossed,
  Type,
  History,
  Settings,
  HelpCircle,
  X,
  Sun,
  Moon,
  Home
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Sidebar({ currentMode, onModeChange, isOpen, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Close sidebar on Escape key press when mobile drawer is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const modeItems = [
    { id: 'general', label: 'Describe Surroundings', icon: Eye },
    { id: 'currency', label: 'Currency Reader', icon: Banknote },
    { id: 'medicine', label: 'Medicine Reader', icon: Pill },
    { id: 'food', label: 'Food Reader', icon: UtensilsCrossed },
    { id: 'text', label: 'Text & Sign Reader', icon: Type }
  ];

  const linkItems = [
    { path: '/app/history', label: 'Scan History', icon: History },
    { path: '/app/settings', label: 'Settings', icon: Settings },
    { path: '/app/help', label: 'Help', icon: HelpCircle }
  ];

  const handleModeClick = (modeId) => {
    if (onModeChange) {
      onModeChange(modeId);
    }
    if (onClose) {
      onClose();
    }
  };

  const navContent = (
    <div className="flex flex-col h-full bg-midnight-950/95 dark:bg-midnight-950/95 border-r border-white/10 text-white backdrop-blur-xl">
      {/* Top Header / Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <Link
          to="/"
          className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-lg p-1"
          aria-label="EchoSight - Return to Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center text-midnight-950 shadow-md shadow-cyan-400/20 group-hover:scale-105 transition-transform">
            <Eye className="w-6 h-6 stroke-[2.5]" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              EchoSight
            </span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
              Vision AI
            </span>
          </div>
        </Link>

        {/* Mobile close button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-cyan-400"
            aria-label="Close navigation sidebar"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav
        className="flex-1 overflow-y-auto px-4 py-5 space-y-6"
        role="navigation"
        aria-label="Dashboard navigation"
      >
        <div>
          <span className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
            AI Vision Modes
          </span>
          <div className="space-y-1.5" role="list">
            {modeItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === '/app' && currentMode === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleModeClick(item.id)}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                    isActive
                      ? 'border-l-4 border-cyan-400 bg-white/10 text-cyan-300 shadow-sm shadow-cyan-400/10'
                      : 'border-l-4 border-transparent text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 ${
                      isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-gray-200'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <span className="px-3 text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
            App & Preferences
          </span>
          <div className="space-y-1.5" role="list">
            {linkItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => onClose && onClose()}
                  className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'border-l-4 border-cyan-400 bg-white/10 text-cyan-300 shadow-sm shadow-cyan-400/10'
                      : 'border-l-4 border-transparent text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 ${
                      isActive ? 'text-cyan-400' : 'text-gray-400'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Footer Section */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400"
          aria-label={`Toggle theme, current theme is ${theme}`}
        >
          <span className="flex items-center gap-3">
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="w-5 h-5 text-cyan-400" aria-hidden="true" />
            )}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </span>
          <span className="text-xs text-gray-500 uppercase font-semibold">{theme}</span>
        </button>

        <Link
          to="/"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400"
          aria-label="Back to Homepage"
        >
          <Home className="w-5 h-5 text-gray-400" aria-hidden="true" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 h-full flex-shrink-0 z-30"
        aria-label="Sidebar navigation"
      >
        {navContent}
      </aside>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Dashboard mobile navigation"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in panel */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
