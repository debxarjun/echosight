import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Video,
  VideoOff,
  RefreshCw,
  Upload,
  AlertTriangle,
  Loader2,
  Sparkles,
  Key,
  Mic,
  MicOff
} from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import { useSettings } from '../contexts/SettingsContext';
import { useVoiceCommands } from '../hooks/useVoiceCommands';

const MODE_LABELS = {
  general: 'Scene Description',
  currency: 'Currency Detection',
  medicine: 'Medicine Reader',
  food: 'Food Scanner',
  text: 'Text Reader'
};

export default function CameraView({
  mode = 'general',
  onImageCaptured,
  isAnalyzing: externalIsAnalyzing,
  lastCapturedImage,
  onModeChange
}) {
  const { apiKey, language } = useSettings();
  const fileInputRef = useRef(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [capturedPreview, setCapturedPreview] = useState(null);

  const {
    isActive,
    error: cameraError,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    switchCamera,
    captureImage
  } = useCamera('environment');

  const isAnalyzing = Boolean(externalIsAnalyzing);
  const modeTitle = MODE_LABELS[mode] || 'Scene Description';

  const announce = (message) => {
    setLiveAnnouncement(message);
  };

  const handleToggleCamera = async () => {
    if (isActive) {
      stopCamera();
      announce('Camera stopped.');
    } else {
      announce('Starting camera...');
      const stream = await startCamera();
      if (stream) {
        announce('Camera activated.');
      } else {
        announce('Failed to start camera.');
      }
    }
  };

  const handleSwitchCamera = async () => {
    announce('Switching camera...');
    await switchCamera();
    announce('Camera switched.');
  };

  const handleCapture = () => {
    if (!isActive) {
      announce('Please start the camera before capturing an image.');
      return;
    }

    try {
      announce('Capturing image...');
      const dataUrl = captureImage();
      setCapturedPreview(dataUrl);
      announce('Image captured. Analyzing scene now...');
      if (onImageCaptured) {
        onImageCaptured(dataUrl);
      }
    } catch (err) {
      console.error('Capture error:', err);
      announce('Failed to capture image. Please try again.');
    }
  };

  // Voice Command Listener for hands-free control (say "Capture", "Currency", etc.)
  const {
    isListening,
    supported: voiceSupported,
    lastCommand,
    toggleListening
  } = useVoiceCommands({
    onCapture: () => {
      announce('Voice command recognized: Capture!');
      if (isActive && !isAnalyzing) {
        handleCapture();
      } else if (!isActive) {
        handleToggleCamera().then(() => {
          setTimeout(() => handleCapture(), 1000);
        });
      }
    },
    onModeChange: (newMode) => {
      announce(`Voice command recognized: switching to ${newMode} mode.`);
      if (onModeChange) onModeChange(newMode);
    },
    language
  });

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      announce('Selected file is not an image.');
      return;
    }

    announce('Loading uploaded image...');
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result;
      setCapturedPreview(base64Data);
      announce('Image loaded. Analyzing image now...');
      if (onImageCaptured) {
        onImageCaptured(base64Data);
      }
    };
    reader.onerror = () => {
      announce('Failed to read selected image file.');
    };
    reader.readAsDataURL(file);
  };

  const hasApiKey = Boolean(apiKey && apiKey.trim().length > 0);

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto space-y-4">
      {/* Screen reader live announcements */}
      <div className="sr-only" aria-live="assertive" aria-atomic="true">
        {liveAnnouncement}
      </div>

      {/* Mode and API Key Notification Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-400/20 text-cyan-300 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs text-gray-400 block font-semibold uppercase tracking-wider">
              Active Mode
            </span>
            <h2 className="text-lg font-bold text-white tracking-wide">
              {modeTitle}
            </h2>
          </div>
        </div>

        {/* Live Status and Voice Control */}
        <div className="flex items-center gap-3">
          {voiceSupported && (
            <button
              type="button"
              onClick={toggleListening}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                isListening
                  ? 'bg-cyan-400/20 text-cyan-300 border-cyan-400/50 shadow-sm shadow-cyan-400/20'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
              }`}
              aria-label={isListening ? 'Voice command listening active. Click to disable.' : 'Turn on hands-free voice commands'}
              title={isListening ? 'Listening for "Capture", "Currency", "Medicine", etc.' : 'Enable Voice Commands'}
            >
              {isListening ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <Mic className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                  <span>Listening: Say "Capture"</span>
                </>
              ) : (
                <>
                  <MicOff className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                  <span>Voice Off</span>
                </>
              )}
            </button>
          )}

          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isActive ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'
              }`}
              aria-hidden="true"
            />
            <span className="text-xs font-medium text-gray-300">
              {isActive ? 'Camera Live' : 'Camera Standby'}
            </span>
          </div>
        </div>
      </div>

      {/* Voice Recognized Toast */}
      {isListening && lastCommand && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center justify-center gap-2 py-1.5 px-4 bg-cyan-500/15 border border-cyan-400/30 rounded-xl text-cyan-200 text-xs font-medium animate-in fade-in"
        >
          <Mic className="w-3.5 h-3.5 text-cyan-400 animate-pulse" aria-hidden="true" />
          <span>Heard voice command: <strong>"{lastCommand}"</strong></span>
        </div>
      )}

      {/* API Key Missing Warning Banner */}
      {!hasApiKey && (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <Key className="w-5 h-5 text-amber-400 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm">
              Please add your <strong>Gemini API key</strong> in Settings to enable AI visual analysis.
            </p>
          </div>
          <Link
            to="/app/settings"
            className="flex-shrink-0 px-4 py-2 text-xs font-bold bg-amber-400 text-midnight-950 rounded-xl hover:bg-amber-300 transition-colors focus-visible:outline-2 focus-visible:outline-white"
          >
            Go to Settings
          </Link>
        </div>
      )}

      {/* Main Viewfinder / Camera Feed Container */}
      <div className="relative flex-1 min-h-[360px] md:min-h-[460px] rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl flex items-center justify-center">
        {/* Real Video Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isActive ? 'opacity-100' : 'opacity-0 absolute'
          }`}
          aria-label="Live camera view"
        />

        {/* Hidden Canvas used for high-res screen capture */}
        <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

        {/* Active Viewfinder Overlays */}
        {isActive && <div className="viewfinder-overlay" aria-hidden="true" />}

        {/* Scanning Animation Line during AI processing */}
        {isAnalyzing && (
          <div
            className="scan-line z-20"
            aria-hidden="true"
            role="progressbar"
            aria-label="Analyzing image"
          />
        )}

        {/* Analyzing Spinner Overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 z-30 bg-midnight-950/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" aria-hidden="true" />
            <p className="text-base font-semibold text-cyan-300 animate-pulse">
              Analyzing image with Gemini AI...
            </p>
          </div>
        )}

        {/* Camera Inactive Fallback View */}
        {!isActive && (
          <div className="relative z-10 p-6 flex flex-col items-center justify-center text-center max-w-md space-y-6">
            {/* If user previously captured/uploaded an image and camera is off, show snapshot preview */}
            {(capturedPreview || lastCapturedImage) ? (
              <div className="relative w-full max-h-56 rounded-2xl overflow-hidden border border-white/20 mb-2">
                <img
                  src={capturedPreview || lastCapturedImage}
                  alt="Last captured image"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-xs text-cyan-300 font-medium">
                  Last Captured
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleToggleCamera}
                className="group w-28 h-28 rounded-3xl bg-gradient-to-tr from-cyan-400/20 to-violet-500/20 border-2 border-cyan-400/40 hover:border-cyan-400 flex flex-col items-center justify-center gap-2 text-cyan-300 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-cyan-400/10 focus-visible:outline-2 focus-visible:outline-cyan-400"
                aria-label="Activate camera"
              >
                <Camera className="w-12 h-12 stroke-[1.8] text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold tracking-wide">Start Camera</span>
              </button>
            )}

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                Camera is Inactive
              </h3>
              <p className="text-sm text-gray-400 max-w-xs mx-auto">
                Tap to activate your camera for real-time visual assistance, or choose an image from your device.
              </p>
            </div>

            {/* Inactive state quick actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleToggleCamera}
                className="btn-primary min-h-[48px] px-6"
                aria-label="Tap to activate camera"
              >
                <Video className="w-5 h-5" aria-hidden="true" />
                <span>Tap to Activate Camera</span>
              </button>

              <button
                type="button"
                onClick={handleUploadClick}
                className="btn-secondary min-h-[48px] px-5"
                aria-label="Upload an image from device"
              >
                <Upload className="w-5 h-5" aria-hidden="true" />
                <span>Upload Image</span>
              </button>
            </div>

            {cameraError && (
              <div
                role="alert"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-left"
              >
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400" aria-hidden="true" />
                <span>{cameraError}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="glass-card p-4 flex items-center justify-around gap-2 sm:gap-6 min-h-[96px]">
        {/* Toggle Camera Button */}
        <button
          type="button"
          onClick={handleToggleCamera}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[54px] p-2 rounded-2xl transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
            isActive
              ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40'
              : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
          }`}
          aria-label={isActive ? 'Turn off camera' : 'Turn on camera'}
          title={isActive ? 'Stop camera' : 'Start camera'}
        >
          {isActive ? (
            <VideoOff className="w-6 h-6 stroke-[2]" aria-hidden="true" />
          ) : (
            <Video className="w-6 h-6 stroke-[2]" aria-hidden="true" />
          )}
          <span className="text-[10px] font-medium mt-1">
            {isActive ? 'Stop' : 'Start'}
          </span>
        </button>

        {/* Capture & Describe: LARGE circular button (80px) */}
        <div className="relative flex items-center justify-center">
          {isActive && (
            <div className="pulse-ring w-20 h-20 pointer-events-none" aria-hidden="true" />
          )}
          <button
            type="button"
            onClick={handleCapture}
            disabled={!isActive || isAnalyzing}
            className={`w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-xl transition-all transform active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 ${
              isActive && !isAnalyzing
                ? 'bg-gradient-to-tr from-cyan-400 to-violet-400 text-midnight-950 hover:shadow-cyan-400/40 hover:scale-105 font-bold cursor-pointer'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/10'
            }`}
            aria-label="Capture image and describe scene"
            title="Capture & Describe"
          >
            {isAnalyzing ? (
              <Loader2 className="w-8 h-8 animate-spin" aria-hidden="true" />
            ) : (
              <Camera className="w-8 h-8 stroke-[2.5]" aria-hidden="true" />
            )}
            <span className="sr-only">Capture & Describe</span>
          </button>
        </div>

        {/* Switch Camera Button (flip camera) */}
        <button
          type="button"
          onClick={handleSwitchCamera}
          disabled={!isActive || isAnalyzing}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[54px] p-2 rounded-2xl transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
            isActive && !isAnalyzing
              ? 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
              : 'bg-white/5 text-gray-600 cursor-not-allowed border border-transparent'
          }`}
          aria-label="Switch front or back camera"
          title="Switch Camera"
        >
          <RefreshCw className="w-6 h-6 stroke-[2]" aria-hidden="true" />
          <span className="text-[10px] font-medium mt-1">Flip</span>
        </button>

        {/* Voice Command Button */}
        {voiceSupported && (
          <button
            type="button"
            onClick={toggleListening}
            className={`flex flex-col items-center justify-center min-w-[54px] min-h-[54px] p-2 rounded-2xl transition-all focus-visible:outline-2 focus-visible:outline-cyan-400 ${
              isListening
                ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/50 shadow-md shadow-cyan-400/20 animate-pulse'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
            aria-label={isListening ? 'Disable voice command control' : 'Enable voice command control (Say "Capture")'}
            title={isListening ? 'Voice Commands Active (Say "Capture")' : 'Voice Command Control'}
          >
            {isListening ? (
              <Mic className="w-6 h-6 stroke-[2] text-cyan-400" aria-hidden="true" />
            ) : (
              <MicOff className="w-6 h-6 stroke-[2]" aria-hidden="true" />
            )}
            <span className="text-[10px] font-medium mt-1">
              {isListening ? 'Listening' : 'Voice'}
            </span>
          </button>
        )}

        {/* Upload Image Button */}
        <button
          type="button"
          onClick={handleUploadClick}
          disabled={isAnalyzing}
          className="flex flex-col items-center justify-center min-w-[54px] min-h-[54px] p-2 rounded-2xl bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 transition-all focus-visible:outline-2 focus-visible:outline-cyan-400"
          aria-label="Upload image from file"
          title="Upload Image"
        >
          <Upload className="w-6 h-6 stroke-[2]" aria-hidden="true" />
          <span className="text-[10px] font-medium mt-1">Upload</span>
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
    </div>
  );
}
