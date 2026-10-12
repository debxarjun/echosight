import React from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  Banknote,
  Pill,
  UtensilsCrossed,
  MapPin,
  Languages,
  Mic,
  History,
  Smartphone,
  Camera,
  Cpu,
  Volume2,
  Shield,
  Check,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';

const Landing = () => {
  const featureList = [
    {
      icon: Eye,
      title: 'AI Scene Description',
      description: 'Point your camera at anything and receive a detailed, natural language description of your surroundings.',
    },
    {
      icon: Banknote,
      title: 'Indian Currency Recognition',
      description: 'Identify Indian currency notes and coins with AI-powered denomination detection.',
    },
    {
      icon: Pill,
      title: 'Medicine Label Reading',
      description: 'Read medicine names, dosages, expiry dates, and safety information from packaging and strips.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Food Package Reader',
      description: 'Read ingredients, nutritional info, allergens, and expiry dates from food packaging.',
    },
    {
      icon: MapPin,
      title: 'Street Sign & Text Reader',
      description: 'Read text from street signs, notice boards, documents, and any printed surface.',
    },
    {
      icon: Languages,
      title: 'Multilingual Voice Assistant',
      description: 'Hear descriptions in English, Hindi, or Bengali — designed for users across India.',
    },
    {
      icon: Mic,
      title: 'Voice-First Navigation',
      description: 'Navigate the entire application using voice commands and keyboard shortcuts.',
    },
    {
      icon: History,
      title: 'Scan History',
      description: 'Access a searchable history of your previous scans and descriptions.',
    },
  ];

  const workflowSteps = [
    {
      number: '1',
      icon: Smartphone,
      title: 'Open EchoSight',
      description: 'Visit the website on your phone or computer',
    },
    {
      number: '2',
      icon: Camera,
      title: 'Capture',
      description: 'Activate the camera or upload an image',
    },
    {
      number: '3',
      icon: Cpu,
      title: 'AI Analyzes',
      description: 'Our AI processes the image instantly',
    },
    {
      number: '4',
      icon: Volume2,
      title: 'Listen',
      description: 'Hear a clear description in your language',
    },
  ];

  const indiaFeatures = [
    'Indian currency denominations (₹10 to ₹2000)',
    'Medicine labels common in India',
    'English, Hindi, and Bengali text recognition',
    'Food packaging with veg/non-veg markers',
    'Public signs and everyday objects',
    'Voice output optimized for Indian users',
  ];

  return (
    <div className="min-w-full min-h-screen flex flex-col bg-midnight-950 text-white selection:bg-cyan-500 selection:text-midnight-950 font-sans">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Landmark */}
      <main id="main-content" className="flex-1 focus:outline-none">
        {/* ========================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================= */}
        <section
          id="hero"
          aria-labelledby="hero-heading"
          className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden"
        >
          {/* Decorative Background Gradient Orbs */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-violet-600/15 rounded-full blur-3xl pointer-events-none -z-10"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Hero Text Content */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Accessibility Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs sm:text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  <span>Next-Generation Vision Assistance</span>
                </div>

                {/* Main Heading */}
                <h1
                  id="hero-heading"
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
                >
                  Your World, <span className="text-gradient">Described.</span>
                </h1>

                {/* Subheading */}
                <p className="text-xl sm:text-2xl text-gray-200 font-medium mb-4 max-w-2xl leading-snug">
                  An AI-powered vision assistant that helps you understand the world around you through clear, natural speech.
                </p>

                {/* Supporting Text */}
                <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-2xl leading-relaxed">
                  Identify everyday objects, read labels, recognize Indian currency, and understand your surroundings — in English, Hindi, or Bengali.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                  <Link
                    to="/app"
                    className="btn-primary btn-large group"
                    aria-label="Start Seeing with Sound - Open EchoSight Application"
                  >
                    <span>Start Seeing with Sound</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>

                  <a
                    href="#features"
                    className="btn-secondary btn-large"
                    aria-label="Explore EchoSight Features"
                  >
                    <span>Explore Features</span>
                  </a>
                </div>

                {/* Trust Message */}
                <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10">
                  <Shield className="w-5 h-5 text-cyan-400 flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium">Designed for accessibility. Built for independence.</span>
                </div>
              </div>

              {/* Hero Visual: Stylized Camera/AI Illustration (CSS Only) */}
              <div className="lg:col-span-5 flex justify-center items-center relative">
                {/* Concentric Radiating Sound Wave Rings */}
                <div className="relative w-72 h-[480px] sm:w-80 sm:h-[520px] flex items-center justify-center">
                  <div className="absolute w-[360px] h-[360px] rounded-full border border-cyan-400/20 animate-ping opacity-25 pointer-events-none" aria-hidden="true" />
                  <div className="absolute w-[440px] h-[440px] rounded-full border border-violet-400/20 pointer-events-none" aria-hidden="true" />
                  <div className="absolute w-[520px] h-[520px] rounded-full border border-cyan-400/10 pointer-events-none" aria-hidden="true" />

                  {/* Stylized Phone Frame */}
                  <div className="relative w-full h-full bg-slate-900/90 rounded-[40px] p-4 border-2 border-cyan-400/30 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl flex flex-col justify-between overflow-hidden">
                    {/* Phone Top Notch / Speaker bar */}
                    <div className="flex justify-center mb-2">
                      <div className="w-24 h-4 bg-midnight-950 rounded-full flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400/80" />
                        <div className="w-8 h-1 rounded-full bg-white/20" />
                      </div>
                    </div>

                    {/* Camera Viewport Screen */}
                    <div className="relative flex-1 rounded-3xl bg-midnight-950 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4">
                      {/* Grid overlay for viewfinder */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#38ddf508_1px,transparent_1px),linear-gradient(to_bottom,#38ddf508_1px,transparent_1px)] bg-[size:24px_24px]" />

                      {/* Viewfinder Target Reticle */}
                      <div className="relative z-10 w-36 h-36 border-2 border-dashed border-cyan-400/60 rounded-2xl flex flex-col items-center justify-center bg-cyan-400/5 backdrop-blur-sm">
                        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
                        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
                        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

                        {/* Interactive Center Lens */}
                        <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center shadow-lg shadow-cyan-400/40">
                          <Eye className="w-8 h-8 text-midnight-950 stroke-[2.5]" aria-hidden="true" />
                        </div>
                        <span className="text-[11px] font-bold text-cyan-300 mt-2 tracking-wide uppercase">
                          AI Scanning
                        </span>
                      </div>

                      {/* Animated Scanning Line */}
                      <div className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_8px_#38ddf5] animate-pulse" />

                      {/* Real-time Recognition Speech Preview Pill */}
                      <div className="relative z-10 mt-6 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-3 w-full">
                        <div className="flex items-center gap-2 mb-1">
                          <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" aria-hidden="true" />
                          <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                            Speech Output
                          </span>
                        </div>
                        <p className="text-xs text-gray-200 italic line-clamp-2">
                          "₹100 note detected on wooden desk with medicine strip nearby."
                        </p>
                      </div>
                    </div>

                    {/* Quick Control Bar in Phone */}
                    <div className="mt-3 flex items-center justify-around px-2 py-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-cyan-400">
                        <Camera className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 text-midnight-950 font-bold shadow-lg shadow-cyan-400/30">
                        <Mic className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-violet-400">
                        <Volume2 className="w-5 h-5" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FEATURES SECTION */}
        {/* ========================================================= */}
        <section
          id="features"
          aria-labelledby="features-heading"
          className="py-24 relative border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="features-heading"
                className="section-heading mb-4 text-white"
              >
                Everything You Need to <span className="text-gradient">See the World</span>
              </h2>
              <p className="section-subheading">
                Equipped with specialized models for everyday independence, document clarity, medicine verification, and local currency recognition.
              </p>
            </div>

            {/* 8 Feature Cards Grid: 1 col mobile, 2 col md, 4 col lg */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featureList.map((feature, idx) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* HOW IT WORKS SECTION */}
        {/* ========================================================= */}
        <section
          id="how-it-works"
          aria-labelledby="how-it-works-heading"
          className="py-24 relative border-t border-white/5 bg-midnight-950/50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2
                id="how-it-works-heading"
                className="section-heading mb-4 text-white"
              >
                How It Works
              </h2>
              <p className="section-subheading">
                Four simple steps designed for maximum ease of use, screen-reader compatibility, and instant voice assistance.
              </p>
            </div>

            {/* Horizontal flow on desktop, vertical on mobile */}
            <div className="relative">
              {/* Desktop Connecting Line */}
              <div
                className="hidden lg:block absolute top-1/2 left-16 right-16 -translate-y-8 h-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 opacity-25 -z-0"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {workflowSteps.map((step) => {
                  const StepIcon = step.icon;
                  return (
                    <div
                      key={step.number}
                      className="glass-card p-6 flex flex-col items-center text-center relative group hover:border-cyan-400/40 transition-all duration-300"
                    >
                      {/* Numbered Badge Circle */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 text-midnight-950 font-extrabold text-lg flex items-center justify-center shadow-lg shadow-cyan-400/20 mb-6 group-hover:scale-110 transition-transform duration-200">
                        {step.number}
                      </div>

                      {/* Icon inside subtle bubble */}
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-300 mb-4 group-hover:bg-white/10 transition-colors">
                        <StepIcon className="w-7 h-7" aria-hidden="true" />
                      </div>

                      {/* Step Title */}
                      <h3 className="text-xl font-bold text-white mb-2">
                        {step.title}
                      </h3>

                      {/* Step Description */}
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* INDIA-FOCUSED SECTION */}
        {/* ========================================================= */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="py-24 relative border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card p-8 md:p-12 lg:p-16 relative overflow-hidden">
              {/* Background ambient gradient glow */}
              <div
                className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-400/10 to-violet-500/10 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Column: Text & Context */}
                <div className="lg:col-span-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-400/10 border border-violet-400/20 text-violet-300 text-xs font-semibold mb-4">
                    <span>Localized & Context-Aware</span>
                  </div>
                  <h2
                    id="about-heading"
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight"
                  >
                    Built for the <span className="text-gradient">World Around You</span>
                  </h2>
                  <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
                    Visual assistants must understand everyday life in real environments. EchoSight is specifically engineered to handle the nuances of regional packaging, Indian banknotes, multilingual signage, and Indian prescription formats.
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">
                    Whether you are shopping in a local market, organizing medicines at home, or verifying currency denominations, EchoSight delivers reliable spoken feedback in languages you know and trust.
                  </p>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400">
                    <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong>Note:</strong> Recognition accuracy depends on image quality, lighting, model capability, and the language of printed text.
                    </span>
                  </div>
                </div>

                {/* Right Column: Feature Checklist */}
                <div className="lg:col-span-6">
                  <div className="bg-midnight-950/60 rounded-2xl border border-white/10 p-6 sm:p-8 space-y-4">
                    <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-3">
                      Tailored Regional Capabilities
                    </h3>
                    <ul className="space-y-4" role="list">
                      {indiaFeatures.map((item, index) => (
                        <li key={index} className="flex items-start gap-3.5">
                          <div
                            className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-400/20 text-cyan-300 flex-shrink-0 mt-0.5"
                            aria-hidden="true"
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                          <span className="text-base text-gray-200 font-medium">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FINAL CTA SECTION */}
        {/* ========================================================= */}
        <section
          aria-labelledby="cta-heading"
          className="py-20 relative border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 text-center bg-gradient-to-r from-midnight-950 via-slate-900 to-midnight-950 border border-cyan-400/30 shadow-2xl shadow-cyan-500/10">
              {/* Radial glow */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-violet-500/10 to-cyan-400/10 pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                <h2
                  id="cta-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-snug"
                >
                  Your surroundings have a story.{' '}
                  <span className="text-gradient">Let EchoSight tell it.</span>
                </h2>

                <p className="text-base sm:text-lg text-gray-300 mb-10 max-w-xl">
                  Instant visual recognition, natural voice synthesis, and hands-free control designed from the ground up for universal accessibility.
                </p>

                <Link
                  to="/app"
                  className="btn-primary btn-large group shadow-lg shadow-cyan-400/25"
                  aria-label="Try EchoSight Now"
                >
                  <span>Try EchoSight Now</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Application Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
