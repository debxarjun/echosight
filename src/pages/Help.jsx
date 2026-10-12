import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  HelpCircle,
  Keyboard,
  Camera,
  Accessibility,
  HelpCircle as FaqIcon,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  ExternalLink
} from 'lucide-react';

export default function Help() {
  const steps = [
    {
      title: '1. Connect Your Gemini API Key',
      description:
        'Navigate to Settings and paste your Google Gemini API key. This powers the multimodal computer vision analysis.'
    },
    {
      title: '2. Select Your Vision Mode',
      description:
        'Choose from Scene Description, Currency Detection, Medicine Label Reader, Food Package Scanner, or Text Reader from the sidebar or bottom bar.'
    },
    {
      title: '3. Aim Camera & Tap Capture',
      description:
        'Tap the large circular capture button (or press Space / Enter when focused). You can also upload any image file from your device.'
    },
    {
      title: '4. Listen to Voice Narration',
      description:
        'EchoSight immediately speaks aloud the description in your chosen language (English, Hindi, or Bengali). Use the playback bar to pause, resume, or replay.'
    }
  ];

  const keyboardShortcuts = [
    { key: 'Voice: "Capture" / "Scan"', action: 'Trigger immediate hands-free camera snapshot and analysis' },
    { key: 'Voice: "Currency" / "Medicine" / "Food" / "Text"', action: 'Switch active AI vision reader mode' },
    { key: 'Voice: "Stop" / "Repeat"', action: 'Pause narration or replay description from beginning' },
    { key: 'Tab / Shift + Tab', action: 'Navigate between buttons, inputs, and controls' },
    { key: 'Enter / Space', action: 'Activate buttons, links, and capture image' },
    { key: 'Escape', action: 'Close mobile drawer menu or cancel actions' },
    { key: 'Alt + 1 / 2 / 3', action: 'Quick shortcuts to Scene, Currency, or Medicine mode' }
  ];

  const cameraTips = [
    {
      title: 'Steady Lighting',
      tip: 'Ensure the subject has good natural or artificial light. Avoid pointing directly at harsh backlighting.'
    },
    {
      title: 'Optimal Distance for Currency',
      tip: 'Hold the Indian currency note flat about 6 to 10 inches (15–25 cm) away from the camera lens.'
    },
    {
      title: 'Medicine Strips & Bottles',
      tip: 'Rotate the medicine packaging so the printed name, strength (mg/ml), and expiry date face the camera without finger obstruction.'
    },
    {
      title: 'Text & Street Signs',
      tip: 'Keep the camera parallel to the sign or page for the highest OCR transcription precision.'
    }
  ];

  const accessibilityFeatures = [
    'Complete ARIA Landmarks and live regions for instant screen reader announcements (NVDA, JAWS, VoiceOver, TalkBack)',
    'Full keyboard navigability for every interactive button, menu, slider, and toggle',
    'High contrast color modes and dark/light themes exceeding WCAG AAA contrast ratios',
    'Large touch targets (minimum 48px to 80px) designed for easy physical access',
    'Screen reader skip-link and semantic heading hierarchy (H1, H2, H3)',
    'Multi-language speech synthesis supporting Indian English, Hindi (हिन्दी), and Bengali (বাংলা)'
  ];

  const faqs = [
    {
      q: 'Is EchoSight free to use?',
      a: 'Yes! EchoSight is an open client web application. Google provides a generous free tier for the Gemini 2.0 Flash API through Google AI Studio.'
    },
    {
      q: 'Are my camera images stored or shared?',
      a: 'No. EchoSight does not store your photos on any proprietary server. Image frames are sent securely and directly to the Google Gemini API endpoint solely to generate the description, and your history stays in your browser.'
    },
    {
      q: 'Can EchoSight detect fake currency notes?',
      a: 'EchoSight identifies the visible denomination and security features, but cannot authenticate bank note genuineness. Always use official verification methods for security concerns.'
    },
    {
      q: 'Does it work offline?',
      a: 'EchoSight requires an internet connection to send image data to the Gemini vision model for intelligent understanding.'
    }
  ];

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
                Help & Accessibility Guide
              </h1>
              <p className="text-xs text-gray-400">
                User instructions, keyboard navigation, camera tips, and assistance
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 space-y-8 pb-20">
        {/* Section 1: Getting Started */}
        <section aria-labelledby="start-heading" className="glass-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="start-heading" className="text-lg font-bold text-white">
                Getting Started
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Quick 4-step setup for effortless visual assistance
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step) => (
              <div
                key={step.title}
                className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:border-cyan-400/30 transition-colors"
              >
                <h3 className="text-sm font-bold text-cyan-300">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Keyboard Shortcuts */}
        <section aria-labelledby="shortcuts-heading" className="glass-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-400/20 text-violet-300 flex items-center justify-center">
              <Keyboard className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="shortcuts-heading" className="text-lg font-bold text-white">
                Keyboard Navigation & Shortcuts
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Operate EchoSight completely without a mouse
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" role="table">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                  <th scope="col" className="pb-3 font-semibold">Key Combination</th>
                  <th scope="col" className="pb-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {keyboardShortcuts.map((item) => (
                  <tr key={item.key} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 pr-4 font-mono font-bold text-cyan-300 whitespace-nowrap">
                      <kbd className="px-2 py-1 rounded bg-white/10 border border-white/15 text-xs">
                        {item.key}
                      </kbd>
                    </td>
                    <td className="py-3 text-gray-200">
                      {item.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Camera Tips */}
        <section aria-labelledby="camera-tips-heading" className="glass-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center">
              <Camera className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="camera-tips-heading" className="text-lg font-bold text-white">
                Camera Capture Tips
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                How to get the most accurate and descriptive results
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cameraTips.map((tip) => (
              <div
                key={tip.title}
                className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" aria-hidden="true" />
                  <h3 className="text-sm font-bold text-white">{tip.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {tip.tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Accessibility Features */}
        <section aria-labelledby="a11y-heading" className="glass-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-400/20 text-violet-300 flex items-center justify-center">
              <Accessibility className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="a11y-heading" className="text-lg font-bold text-white">
                Built-In Accessibility Features
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Designed to comply with WCAG 2.1 AA and AAA standards
              </p>
            </div>
          </div>

          <ul className="space-y-3" role="list">
            {accessibilityFeatures.map((feat, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-gray-200 leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 5: Frequently Asked Questions */}
        <section aria-labelledby="faq-heading" className="glass-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center">
              <FaqIcon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="faq-heading" className="text-lg font-bold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Common questions regarding functionality and privacy
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2"
              >
                <h3 className="text-sm font-bold text-cyan-300">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Contact & Feedback */}
        <section aria-labelledby="contact-heading" className="glass-card p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-400/20 text-violet-300 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="contact-heading" className="text-lg font-bold text-white">
                Contact & Feedback
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                We are continually improving EchoSight based on user feedback
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            Have questions, accessibility suggestions, or requests for additional regional language models? We'd love to hear from you.
          </p>

          <div className="pt-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary min-h-[44px] py-2 px-5 text-xs sm:text-sm font-semibold rounded-xl inline-flex items-center gap-2"
            >
              <span>Submit Feedback or Issue</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
