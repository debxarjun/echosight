import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Key,
  Eye,
  EyeOff,
  Volume2,
  Globe,
  Sliders,
  Sun,
  Moon,
  Contrast,
  ExternalLink,
  RotateCcw,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Settings() {
  const {
    apiKey,
    setApiKey,
    language,
    setLanguage,
    voiceEnabled,
    setVoiceEnabled,
    voiceSpeed,
    setVoiceSpeed,
    autoSpeak,
    setAutoSpeak,
    highContrast,
    setHighContrast,
    resetSettings
  } = useSettings();

  const { theme, toggleTheme } = useTheme();

  const [showApiKey, setShowApiKey] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
    showSavedFeedback();
  };

  const handleSpeedChange = (e) => {
    setVoiceSpeed(parseFloat(e.target.value));
    showSavedFeedback();
  };

  const showSavedFeedback = () => {
    setSaveStatus('Changes saved automatically');
    setTimeout(() => setSaveStatus(''), 2500);
  };

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' }
  ];

  return (
    <div className="min-h-screen bg-midnight-950 text-white flex flex-col font-sans selection:bg-cyan-500 selection:text-midnight-950">
      {/* Settings Navigation Header */}
      <header className="sticky top-0 z-30 bg-midnight-950/90 border-b border-white/10 backdrop-blur-md px-4 sm:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/app"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400"
              aria-label="Back to EchoSight camera workspace"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Settings & Preferences
              </h1>
              <p className="text-xs text-gray-400">
                Configure AI vision models, speech synthesis, and accessibility
              </p>
            </div>
          </div>

          {/* Feedback Pill */}
          <div className="flex items-center gap-2">
            {saveStatus && (
              <span
                role="status"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-full"
              >
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{saveStatus}</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Settings Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 space-y-8 pb-20">
        {/* Section 1: Gemini API Key */}
        <section
          aria-labelledby="api-heading"
          className="glass-card p-6 sm:p-8 space-y-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center">
                <Key className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2 id="api-heading" className="text-lg font-bold text-white">
                  Google Gemini API Key
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">
                  Required for real-time visual scene perception and text OCR
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            EchoSight uses Google Gemini multimodal models to identify objects, read currency, labels, and text. Your key is stored securely in your browser's local storage and is never transmitted to any third-party servers.
          </p>

          <div className="space-y-2">
            <label
              htmlFor="gemini-api-key"
              className="text-xs font-bold uppercase tracking-wider text-gray-300 block"
            >
              Enter API Key
            </label>
            <div className="relative flex items-center">
              <input
                id="gemini-api-key"
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={handleApiKeyChange}
                placeholder="AIzaSy..."
                className="w-full px-4 py-3.5 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus-visible:outline-2 focus-visible:outline-cyan-400 font-mono text-sm"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 p-2 text-gray-400 hover:text-white rounded-lg focus-visible:outline-2 focus-visible:outline-cyan-400"
                aria-label={showApiKey ? 'Hide Gemini API key' : 'Show Gemini API key'}
              >
                {showApiKey ? (
                  <EyeOff className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Eye className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 underline font-medium focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              <span>Get a free Gemini API key at Google AI Studio</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Private & Client-Side Only</span>
            </div>
          </div>
        </section>

        {/* Section 2: Language Selection */}
        <section
          aria-labelledby="lang-heading"
          className="glass-card p-6 sm:p-8 space-y-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-400/20 text-violet-300 flex items-center justify-center">
              <Globe className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="lang-heading" className="text-lg font-bold text-white">
                Spoken Language & Regional Voice
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Choose the preferred language for AI responses and voice speech
              </p>
            </div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            role="radiogroup"
            aria-labelledby="lang-heading"
          >
            {languages.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <label
                  key={lang.code}
                  className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-400/10 text-white shadow-md shadow-cyan-400/10'
                      : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold">{lang.name}</span>
                    <input
                      type="radio"
                      name="language"
                      value={lang.code}
                      checked={isSelected}
                      onChange={() => {
                        setLanguage(lang.code);
                        showSavedFeedback();
                      }}
                      className="accent-cyan-400 w-4 h-4 focus-visible:outline-2 focus-visible:outline-cyan-400"
                    />
                  </div>
                  <span className="text-lg font-semibold text-cyan-300">
                    {lang.native}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Section 3: Speech & Audio Settings */}
        <section
          aria-labelledby="speech-heading"
          className="glass-card p-6 sm:p-8 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center">
              <Volume2 className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="speech-heading" className="text-lg font-bold text-white">
                Speech Output Settings
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Configure voice narration, speech speed, and automatic playback
              </p>
            </div>
          </div>

          <div className="space-y-6 divide-y divide-white/10">
            {/* Toggle 1: Voice Enabled */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <div>
                <label
                  htmlFor="voice-enabled-toggle"
                  className="text-base font-semibold text-white block cursor-pointer"
                >
                  Voice Output
                </label>
                <p className="text-xs sm:text-sm text-gray-400">
                  Read aloud AI scene descriptions and results using text-to-speech
                </p>
              </div>

              <input
                id="voice-enabled-toggle"
                type="checkbox"
                checked={voiceEnabled}
                onChange={(e) => {
                  setVoiceEnabled(e.target.checked);
                  showSavedFeedback();
                }}
                className="w-6 h-6 rounded-md accent-cyan-400 cursor-pointer focus-visible:outline-2 focus-visible:outline-cyan-400"
              />
            </div>

            {/* Toggle 2: Auto-Speak */}
            <div className="flex items-center justify-between gap-4 pt-6">
              <div>
                <label
                  htmlFor="auto-speak-toggle"
                  className="text-base font-semibold text-white block cursor-pointer"
                >
                  Auto-Speak Results
                </label>
                <p className="text-xs sm:text-sm text-gray-400">
                  Automatically start speaking immediately when an AI analysis completes
                </p>
              </div>

              <input
                id="auto-speak-toggle"
                type="checkbox"
                checked={autoSpeak}
                disabled={!voiceEnabled}
                onChange={(e) => {
                  setAutoSpeak(e.target.checked);
                  showSavedFeedback();
                }}
                className="w-6 h-6 rounded-md accent-cyan-400 cursor-pointer disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-cyan-400"
              />
            </div>

            {/* Voice Speed Slider */}
            <div className="space-y-3 pt-6">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="voice-speed-slider"
                  className="text-base font-semibold text-white cursor-pointer"
                >
                  Speech Speed Rate
                </label>
                <span className="text-sm font-mono font-bold text-cyan-300 px-2 py-0.5 rounded bg-white/5 border border-white/10">
                  {voiceSpeed.toFixed(1)}x
                </span>
              </div>

              <input
                id="voice-speed-slider"
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={voiceSpeed}
                disabled={!voiceEnabled}
                onChange={handleSpeedChange}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-cyan-400"
                aria-valuemin={0.5}
                aria-valuemax={2.0}
                aria-valuenow={voiceSpeed}
              />

              <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                <span>0.5x (Slower)</span>
                <span>1.0x (Normal)</span>
                <span>2.0x (Fast)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Display & Visual Accessibility */}
        <section
          aria-labelledby="display-heading"
          className="glass-card p-6 sm:p-8 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-400/20 text-violet-300 flex items-center justify-center">
              <Contrast className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="display-heading" className="text-lg font-bold text-white">
                Display & Contrast
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Visual comfort and high contrast support for low vision users
              </p>
            </div>
          </div>

          <div className="space-y-6 divide-y divide-white/10">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <div>
                <span className="text-base font-semibold text-white block">
                  Application Theme
                </span>
                <p className="text-xs sm:text-sm text-gray-400">
                  Switch between Dark Midnight and High Visibility Light Mode
                </p>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400"
                aria-label={`Toggle theme, current is ${theme}`}
              >
                {theme === 'dark' ? (
                  <>
                    <Moon className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                    <span>Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
                    <span>Light</span>
                  </>
                )}
              </button>
            </div>

            {/* High Contrast Mode Toggle */}
            <div className="flex items-center justify-between gap-4 pt-6">
              <div>
                <label
                  htmlFor="high-contrast-toggle"
                  className="text-base font-semibold text-white block cursor-pointer"
                >
                  High Contrast Mode
                </label>
                <p className="text-xs sm:text-sm text-gray-400">
                  Enforces sharper borders and maximized text contrast for enhanced visibility
                </p>
              </div>

              <input
                id="high-contrast-toggle"
                type="checkbox"
                checked={highContrast}
                onChange={(e) => {
                  setHighContrast(e.target.checked);
                  showSavedFeedback();
                }}
                className="w-6 h-6 rounded-md accent-cyan-400 cursor-pointer focus-visible:outline-2 focus-visible:outline-cyan-400"
              />
            </div>
          </div>
        </section>

        {/* Section 5: About & Credits */}
        <section
          aria-labelledby="about-app-heading"
          className="glass-card p-6 sm:p-8 space-y-4"
        >
          <h2 id="about-app-heading" className="text-lg font-bold text-white">
            About EchoSight
          </h2>
          <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
            <p>
              <strong>EchoSight Version 1.0.0</strong> &mdash; An AI-powered vision companion designed for blind and visually impaired users.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              Built with React 18, Google Gemini Multimodal AI, Web Speech Synthesis, and Tailwind CSS. Specially crafted for Indian currency, medicine boxes, packaging, and multilingual reading.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={resetSettings}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Reset All Settings to Default</span>
            </button>

            <Link
              to="/app/help"
              className="text-xs text-cyan-400 hover:underline font-semibold focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              View Help & Keyboard Shortcuts &rarr;
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
