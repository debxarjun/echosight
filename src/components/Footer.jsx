import React from 'react';
import { Eye, Github, Twitter, Mail, ExternalLink, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Dashboard', href: '/app', isRoute: true },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '#support' },
    { name: 'Accessibility Statement', href: '#accessibility' },
    { name: 'Contact Support', href: 'mailto:support@echosight.ai' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Disclaimer', href: '#disclaimer' },
  ];

  const connectLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: Github },
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'Email', href: 'mailto:contact@echosight.ai', icon: Mail },
  ];

  return (
    <footer
      className="bg-midnight-950 text-gray-300 border-t border-white/10 dark:bg-midnight-950 dark:border-white/10 light:bg-gray-100 light:text-gray-700 light:border-gray-200"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section with Logo and Tagline */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-12 border-b border-white/10 light:border-gray-300 gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-violet-500 text-midnight-950 shadow-md shadow-cyan-500/20">
              <Eye className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                EchoSight
              </span>
              <p className="text-sm text-gray-400 light:text-gray-600">
                Empowering independence through AI audio vision
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-400 light:text-gray-600 max-w-md">
            Dedicated to providing intuitive, high-speed, and multilingual assistive vision tools for blind and visually impaired individuals worldwide.
          </p>
        </div>

        {/* Four Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {/* Column 1: Product */}
          <div>
            <h2 className="text-sm font-semibold tracking-wider text-white light:text-gray-900 uppercase mb-4">
              Product
            </h2>
            <ul className="space-y-3" role="list">
              {productLinks.map((item) => (
                <li key={item.name}>
                  {item.isRoute ? (
                    <Link
                      to={item.href}
                      className="text-sm text-gray-400 hover:text-cyan-400 light:text-gray-600 light:hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-sm"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-cyan-400 light:text-gray-600 light:hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-sm"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Support */}
          <div>
            <h2 className="text-sm font-semibold tracking-wider text-white light:text-gray-900 uppercase mb-4">
              Support
            </h2>
            <ul className="space-y-3" role="list">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-cyan-400 light:text-gray-600 light:hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h2 className="text-sm font-semibold tracking-wider text-white light:text-gray-900 uppercase mb-4">
              Legal
            </h2>
            <ul className="space-y-3" role="list">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-cyan-400 light:text-gray-600 light:hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h2 className="text-sm font-semibold tracking-wider text-white light:text-gray-900 uppercase mb-4">
              Connect
            </h2>
            <ul className="space-y-3" role="list">
              {connectLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 light:text-gray-600 light:hover:text-cyan-600 transition-colors focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-sm"
                      aria-label={`${item.name} (opens in a new window)`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                      <span>{item.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-60" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="my-6 p-4 rounded-xl bg-white/5 border border-white/10 light:bg-amber-500/10 light:border-amber-500/20 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-gray-300 light:text-gray-700 leading-relaxed">
            <strong className="font-semibold text-white light:text-gray-900">Safety Notice: </strong>
            EchoSight uses AI to provide visual descriptions. Results may not always be accurate. Always verify critical information independently. EchoSight is not a substitute for professional medical, financial, or safety advice.
          </p>
        </div>

        {/* Copyright and Credits */}
        <div className="pt-8 border-t border-white/10 light:border-gray-300 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 light:text-gray-600 gap-4">
          <p>&copy; {currentYear} EchoSight. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Built with care for accessibility and universal access.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
