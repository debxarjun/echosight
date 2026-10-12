import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import History from './pages/History';
import Help from './pages/Help';

export default function App() {
  return (
    <div className="min-h-screen bg-midnight-950 text-white font-sans selection:bg-cyan-500 selection:text-midnight-950">
      {/* Universal Screen Reader Skip Link */}
      <a href="#main-dashboard-content" className="skip-link sr-only focus:not-sr-only">
        Skip to main content
      </a>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/settings" element={<Settings />} />
        <Route path="/app/history" element={<History />} />
        <Route path="/app/help" element={<Help />} />
      </Routes>
    </div>
  );
}
