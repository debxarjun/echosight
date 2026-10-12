import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Square,
  Copy,
  Check,
  Trash2,
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react';

export default function DescriptionPanel({
  result,
  isAnalyzing,
  error,
  onSpeak,
  onRepeat,
  onStop,
  isSpeaking,
  isPaused,
  onPause,
  onResume,
  onClear
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handlePlayToggle = () => {
    if (isSpeaking) {
      if (isPaused && onResume) {
        onResume();
      } else if (!isPaused && onPause) {
        onPause();
      }
    } else if (onSpeak && result) {
      onSpeak(result);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-violet-400/20 text-violet-300 flex items-center justify-center">
            <Volume2 className="w-4 h-4" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-wide">
            Audio Description
          </h2>
        </div>

        {/* Clear Button */}
        {result && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400"
            aria-label="Clear current description"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col justify-between overflow-y-auto space-y-4"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* State 1: Analyzing */}
        {isAnalyzing && (
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[220px]">
            <div className="relative flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-cyan-400/20 animate-ping absolute" />
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center text-midnight-950 shadow-lg shadow-cyan-400/30">
                <Sparkles className="w-6 h-6 animate-spin" aria-hidden="true" />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-base font-semibold text-white">
                Analyzing image...
              </p>
              <p className="text-xs text-gray-400">
                EchoSight is processing visual cues and preparing voice output.
              </p>
            </div>

            {/* Pulsing indicator dots */}
            <div className="flex items-center gap-2 pt-2" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* State 2: Error */}
        {!isAnalyzing && error && (
          <div
            role="alert"
            className="glass-card p-6 border-rose-500/30 bg-rose-500/10 text-rose-200 flex flex-col space-y-3"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-rose-400 flex-shrink-0" aria-hidden="true" />
              <h3 className="text-base font-bold text-white">
                Analysis Notice
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-rose-200/90">
              {error}
            </p>
          </div>
        )}

        {/* State 3: Result Ready */}
        {!isAnalyzing && result && (
          <div className="glass-card p-6 flex-1 flex flex-col justify-between space-y-6 border-cyan-400/20 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  Description
                </span>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400"
                  aria-label={copied ? 'Description copied to clipboard' : 'Copy description to clipboard'}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Spoken Text Body */}
              <p className="text-base sm:text-lg leading-relaxed text-gray-100 font-normal tracking-wide whitespace-pre-wrap select-text">
                {result}
              </p>
            </div>

            {/* Speech Playback Controls Bar */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 rounded-2xl p-3 border border-white/10">
                {/* Play / Pause Toggle Button */}
                <button
                  type="button"
                  onClick={handlePlayToggle}
                  className="btn-primary flex-1 min-h-[48px] py-2.5 px-4 text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
                  aria-label={
                    isSpeaking
                      ? isPaused
                        ? 'Resume speech narration'
                        : 'Pause speech narration'
                      : 'Play speech narration'
                  }
                >
                  {isSpeaking && !isPaused ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" aria-hidden="true" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                      <span>{isPaused ? 'Resume' : 'Play Voice'}</span>
                    </>
                  )}
                </button>

                {/* Stop Narration Button */}
                <button
                  type="button"
                  onClick={onStop}
                  disabled={!isSpeaking && !isPaused}
                  className={`min-h-[48px] px-3.5 py-2.5 rounded-xl border flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                    isSpeaking || isPaused
                      ? 'border-white/20 bg-white/5 text-gray-200 hover:bg-white/10'
                      : 'border-transparent text-gray-600 cursor-not-allowed'
                  }`}
                  aria-label="Stop speech narration"
                  title="Stop Speech"
                >
                  <Square className="w-4 h-4 fill-current" aria-hidden="true" />
                  <span className="sr-only">Stop</span>
                </button>

                {/* Repeat Button */}
                <button
                  type="button"
                  onClick={onRepeat}
                  className="min-h-[48px] px-3.5 py-2.5 rounded-xl border border-white/20 bg-white/5 text-gray-200 hover:bg-white/10 flex items-center justify-center transition-all focus-visible:outline-2 focus-visible:outline-cyan-400"
                  aria-label="Repeat speech from beginning"
                  title="Repeat Speech"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span className="sr-only">Repeat</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* State 4: Placeholder (No Result yet & Not analyzing) */}
        {!isAnalyzing && !result && !error && (
          <div className="glass-card p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[260px] border-dashed border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
              <Info className="w-7 h-7" aria-hidden="true" />
            </div>

            <div className="space-y-1.5 max-w-xs">
              <p className="text-base font-semibold text-gray-200">
                Ready for Analysis
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Capture an image or upload a picture to see its spoken description here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
