import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Trash2,
  Volume2,
  Calendar,
  Clock,
  Eye,
  Banknote,
  Pill,
  UtensilsCrossed,
  Type,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Camera,
  Check
} from 'lucide-react';
import { useScanHistory } from '../hooks/useScanHistory';
import { useSpeech } from '../hooks/useSpeech';

const MODE_CONFIG = {
  general: { label: 'Scene', icon: Eye, color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30' },
  currency: { label: 'Currency', icon: Banknote, color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' },
  medicine: { label: 'Medicine', icon: Pill, color: 'text-rose-400 bg-rose-400/10 border-rose-400/30' },
  food: { label: 'Food', icon: UtensilsCrossed, color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' },
  text: { label: 'Text OCR', icon: Type, color: 'text-violet-400 bg-violet-400/10 border-violet-400/30' }
};

export default function History() {
  const { history, deleteScan, clearHistory } = useScanHistory();
  const { speak, stop } = useSpeech();

  const [expandedId, setExpandedId] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleSpeak = (text) => {
    stop();
    speak(text);
  };

  const handleCopy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleClearAll = () => {
    clearHistory();
    setShowClearConfirm(false);
  };

  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return 'Recent';
    }
  };

  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-midnight-950 text-white flex flex-col font-sans selection:bg-cyan-500 selection:text-midnight-950">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-midnight-950/90 border-b border-white/10 backdrop-blur-md px-4 sm:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/app"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400"
              aria-label="Back to EchoSight dashboard"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Scan History
              </h1>
              <p className="text-xs text-gray-400">
                {history.length} {history.length === 1 ? 'scan' : 'scans'} recorded on this device
              </p>
            </div>
          </div>

          {/* Clear History Button */}
          {history.length > 0 && (
            <div>
              {showClearConfirm ? (
                <div className="flex items-center gap-2 animate-in fade-in duration-150">
                  <span className="text-xs text-rose-300 font-semibold hidden sm:inline">
                    Clear all scans?
                  </span>
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="px-3 py-1.5 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-colors focus-visible:outline-2 focus-visible:outline-white"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(false)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 text-gray-300 text-xs font-semibold hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-white"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/30 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400"
                  aria-label="Clear all scan history"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                  <span>Clear All</span>
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 space-y-4 pb-20">
        {/* Empty State */}
        {history.length === 0 && (
          <div className="glass-card p-12 flex flex-col items-center justify-center text-center space-y-5 my-12 border-dashed border-white/10">
            <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center">
              <Camera className="w-8 h-8" aria-hidden="true" />
            </div>

            <div className="space-y-2 max-w-sm">
              <h2 className="text-xl font-bold text-white">
                No Scans Yet
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Start by capturing an image or uploading a photo in the EchoSight camera view. Your previous descriptions will appear here.
              </p>
            </div>

            <Link
              to="/app"
              className="btn-primary min-h-[48px] px-6 mt-2"
              aria-label="Start scanning in camera view"
            >
              Start Scanning Now
            </Link>
          </div>
        )}

        {/* Scan List */}
        {history.length > 0 && (
          <div className="space-y-4" role="list" aria-label="Previous image scans">
            {history.map((scan) => {
              const isExpanded = expandedId === scan.id;
              const modeInfo = MODE_CONFIG[scan.mode] || MODE_CONFIG.general;
              const ModeIcon = modeInfo.icon;

              return (
                <article
                  key={scan.id}
                  className="glass-card overflow-hidden transition-all duration-200 border-white/10 hover:border-white/20"
                  role="listitem"
                >
                  {/* Item Header / Collapsed View */}
                  <div
                    tabIndex={0}
                    role="button"
                    aria-expanded={isExpanded}
                    onClick={() => toggleExpand(scan.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleExpand(scan.id);
                      }
                    }}
                    className="p-4 sm:p-5 flex items-start gap-4 cursor-pointer hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400"
                  >
                    {/* Thumbnail or Icon */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center">
                      {scan.imageData ? (
                        <img
                          src={scan.imageData}
                          alt={`Thumbnail for ${modeInfo.label} scan`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ModeIcon className="w-8 h-8 text-cyan-400" aria-hidden="true" />
                      )}
                    </div>

                    {/* Metadata & Preview */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${modeInfo.color}`}
                        >
                          <ModeIcon className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{modeInfo.label}</span>
                        </span>

                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{formatDate(scan.timestamp)}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{formatTime(scan.timestamp)}</span>
                          </span>
                        </div>
                      </div>

                      {/* Truncated Text Preview */}
                      <p className={`text-sm text-gray-200 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                        {scan.description}
                      </p>
                    </div>

                    {/* Toggle Chevron */}
                    <div className="text-gray-400 p-1 flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-5 h-5" aria-hidden="true" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Detail View */}
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-white/10 space-y-4 bg-white/5">
                      {/* Full Full-Resolution Preview if available */}
                      {scan.imageData && (
                        <div className="max-w-md rounded-2xl overflow-hidden border border-white/10 max-h-64 mb-3">
                          <img
                            src={scan.imageData}
                            alt="Full captured scan preview"
                            className="w-full h-full object-contain bg-black"
                          />
                        </div>
                      )}

                      {/* Full description */}
                      <div className="p-4 rounded-xl bg-midnight-950/60 border border-white/10 text-gray-100 text-sm sm:text-base leading-relaxed whitespace-pre-wrap select-text">
                        {scan.description}
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                        <div className="flex items-center gap-2">
                          {/* Speak Button */}
                          <button
                            type="button"
                            onClick={() => handleSpeak(scan.description)}
                            className="btn-primary min-h-[44px] py-2 px-4 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2"
                            aria-label="Speak description aloud"
                          >
                            <Volume2 className="w-4 h-4" aria-hidden="true" />
                            <span>Read Aloud</span>
                          </button>

                          {/* Copy Button */}
                          <button
                            type="button"
                            onClick={() => handleCopy(scan.id, scan.description)}
                            className="min-h-[44px] py-2 px-4 text-xs sm:text-sm font-medium rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 transition-colors flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-cyan-400"
                            aria-label="Copy description to clipboard"
                          >
                            {copiedId === scan.id ? (
                              <>
                                <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                                <span className="text-emerald-400 font-semibold">Copied</span>
                              </>
                            ) : (
                              <span>Copy Text</span>
                            )}
                          </button>
                        </div>

                        {/* Delete Single Item */}
                        <button
                          type="button"
                          onClick={() => deleteScan(scan.id)}
                          className="min-h-[44px] py-2 px-3 text-xs font-semibold rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 border border-transparent hover:border-rose-500/30 transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-cyan-400"
                          aria-label="Delete this scan from history"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
