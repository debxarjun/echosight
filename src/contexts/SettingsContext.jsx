import React, { createContext, useContext, useEffect, useState } from 'react';

const SETTINGS_STORAGE_KEY = 'echosight-settings';

const DEFAULT_SETTINGS = {
  language: 'en',
  voiceEnabled: true,
  voiceSpeed: 1,
  autoSpeak: true,
  apiKey: '',
  highContrast: false
};

const SettingsContext = createContext({
  language: DEFAULT_SETTINGS.language,
  voiceEnabled: DEFAULT_SETTINGS.voiceEnabled,
  voiceSpeed: DEFAULT_SETTINGS.voiceSpeed,
  autoSpeak: DEFAULT_SETTINGS.autoSpeak,
  apiKey: DEFAULT_SETTINGS.apiKey,
  highContrast: DEFAULT_SETTINGS.highContrast,
  setLanguage: () => {},
  setVoiceEnabled: () => {},
  setVoiceSpeed: () => {},
  setAutoSpeak: () => {},
  setApiKey: () => {},
  setHighContrast: () => {},
  updateSettings: () => {},
  resetSettings: () => {}
});

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          voiceSpeed: typeof parsed.voiceSpeed === 'number' ? Math.min(Math.max(parsed.voiceSpeed, 0.5), 2) : DEFAULT_SETTINGS.voiceSpeed
        };
      }
    } catch (e) {
      console.warn('Unable to load settings from localStorage:', e);
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Unable to persist settings to localStorage:', e);
    }

    const root = document.documentElement;
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [settings]);

  const setLanguage = (language) => {
    setSettings((prev) => ({ ...prev, language }));
  };

  const setVoiceEnabled = (voiceEnabled) => {
    setSettings((prev) => ({ ...prev, voiceEnabled: Boolean(voiceEnabled) }));
  };

  const setVoiceSpeed = (voiceSpeed) => {
    const clampedSpeed = Math.min(Math.max(Number(voiceSpeed) || 1, 0.5), 2);
    setSettings((prev) => ({ ...prev, voiceSpeed: clampedSpeed }));
  };

  const setAutoSpeak = (autoSpeak) => {
    setSettings((prev) => ({ ...prev, autoSpeak: Boolean(autoSpeak) }));
  };

  const setApiKey = (apiKey) => {
    setSettings((prev) => ({ ...prev, apiKey: String(apiKey).trim() }));
  };

  const setHighContrast = (highContrast) => {
    setSettings((prev) => ({ ...prev, highContrast: Boolean(highContrast) }));
  };

  const updateSettings = (partialSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...partialSettings
    }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider
      value={{
        language: settings.language,
        voiceEnabled: settings.voiceEnabled,
        voiceSpeed: settings.voiceSpeed,
        autoSpeak: settings.autoSpeak,
        apiKey: settings.apiKey,
        highContrast: settings.highContrast,
        setLanguage,
        setVoiceEnabled,
        setVoiceSpeed,
        setAutoSpeak,
        setApiKey,
        setHighContrast,
        updateSettings,
        resetSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsContext;
