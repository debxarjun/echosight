import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Settings,
  Eye,
  Banknote,
  Pill,
  UtensilsCrossed,
  Type
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import CameraView from '../components/CameraView';
import DescriptionPanel from '../components/DescriptionPanel';
import { useAI } from '../hooks/useAI';
import { useSpeech } from '../hooks/useSpeech';
import { useScanHistory } from '../hooks/useScanHistory';
import { useSettings } from '../contexts/SettingsContext';

const QUICK_MODES = [
  { id: 'general', label: 'Describe', icon: Eye },
  { id: 'currency', label: 'Currency', icon: Banknote },
  { id: 'medicine', label: 'Medicine', icon: Pill },
  { id: 'food', label: 'Food', icon: UtensilsCrossed },
  { id: 'text', label: 'Text', icon: Type }
];

const MODE_LABELS = {
  general: 'Describe Surroundings',
  currency: 'Currency Reader',
  medicine: 'Medicine Reader',
  food: 'Food Reader',
  text: 'Text & Sign Reader'
};

export default function Dashboard() {
  const [currentMode, setCurrentMode] = useState('general');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastImage, setLastImage] = useState(null);

  const { autoSpeak } = useSettings();
  const { isAnalyzing, result, error, analyzeImage, clearResult } = useAI();
  const { isSpeaking, isPaused, speak, pause, resume, stop, repeat } = useSpeech();
  const { addScan } = useScanHistory();

  const handleModeChange = useCallback(
    (newMode) => {
      setCurrentMode(newMode);
      // Optional: stop active speech when changing modes
      stop();
    },
    [stop]
  );

  const handleImageCaptured = useCallback(
    async (base64Data) => {
      setLastImage(base64Data);
      try {
        const textResult = await analyzeImage(base64Data, currentMode);
        if (textResult) {
          // Save to persistent scan history
          addScan(currentMode, textResult, base64Data);

          // Auto-speak result if enabled in preferences
          if (autoSpeak) {
            speak(textResult);
          }
        }
      } catch (err) {
        console.error('Analysis error in dashboard:', err);
      }
    },
    [analyzeImage, currentMode, addScan, autoSpeak, speak]
  );

  const handleClear = useCallback(() => {
    stop();
    clearResult();
    setLastImage(null);
  }, [stop, clearResult]);

  return (
    <div className="flex h-screen w-full bg-midnight-950 overflow-hidden text-white font-sans selection:bg-cyan-500 selection:text-midnight-950">
      {/* Sidebar Navigation */}
      <Sidebar
        currentMode={currentMode}
        onModeChange={handleModeChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Mobile Header Bar */}
        <header className="flex md:hidden items-center justify-between px-4 py-3 bg-midnight-950/90 border-b border-white/10 z-20 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-cyan-400"
            aria-label="Open navigation sidebar"
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
              EchoSight
            </span>
            <span className="text-sm font-bold text-white truncate max-w-[180px]">
              {MODE_LABELS[currentMode]}
            </span>
          </div>

          <Link
            to="/app/settings"
            className="p-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-cyan-400"
            aria-label="Open application settings"
          >
            <Settings className="w-6 h-6" aria-hidden="true" />
          </Link>
        </header>

        {/* 2-Column Responsive Body */}
        <main
          className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden p-3 sm:p-5 gap-4"
          id="main-dashboard-content"
          role="main"
          aria-label="Camera and analysis workspace"
        >
          {/* Left/Center Column: Camera and Capture Interface */}
          <section
            aria-label="Camera and controls"
            className="flex-1 flex flex-col min-h-[380px] lg:h-full lg:overflow-y-auto"
          >
            <CameraView
              mode={currentMode}
              onImageCaptured={handleImageCaptured}
              isAnalyzing={isAnalyzing}
              lastCapturedImage={lastImage}
              onModeChange={handleModeChange}
            />
          </section>

          {/* Right Column: Audio & Description Panel */}
          <section
            aria-label="AI Description and Voice Controls"
            className="w-full lg:w-96 flex-shrink-0 flex flex-col pb-16 lg:pb-0 lg:h-full"
          >
            <DescriptionPanel
              result={result}
              isAnalyzing={isAnalyzing}
              error={error}
              onSpeak={(text) => speak(text)}
              onRepeat={repeat}
              onStop={stop}
              isSpeaking={isSpeaking}
              isPaused={isPaused}
              onPause={pause}
              onResume={resume}
              onClear={handleClear}
            />
          </section>
        </main>

        {/* Mobile Quick-Switch Bottom Bar (5 modes) */}
        <nav
          className="md:hidden flex items-center justify-around px-2 py-2 bg-midnight-950/95 border-t border-white/10 z-20 backdrop-blur-lg"
          role="navigation"
          aria-label="Quick mode selector"
        >
          {QUICK_MODES.map((item) => {
            const Icon = item.icon;
            const isActive = currentMode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleModeChange(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[56px] transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                  isActive
                    ? 'text-cyan-300 font-bold bg-cyan-400/10'
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-label={`Switch mode to ${item.label}`}
                aria-pressed={isActive}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? 'text-cyan-400 stroke-[2.5]' : ''}`}
                  aria-hidden="true"
                />
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
