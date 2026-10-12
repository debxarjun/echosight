import { useState, useEffect, useRef, useCallback } from 'react';
import { useSettings } from '../contexts/SettingsContext';

const LANG_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN'
};

/**
 * Custom hook for Text-to-Speech using the Web Speech Synthesis API.
 */
export function useSpeech() {
  const { voiceEnabled, voiceSpeed, language: defaultLang } = useSettings();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(false);

  const lastTextRef = useRef('');
  const lastLangRef = useRef(defaultLang);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    utteranceRef.current = null;
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  const speak = useCallback(
    (text, lang) => {
      if (!text || !voiceEnabled) {
        return;
      }

      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        console.warn('Speech synthesis is not supported on this browser/platform.');
        return;
      }

      // Stop any ongoing speech
      window.speechSynthesis.cancel();

      const selectedLang = lang || defaultLang;
      const bcpCode = LANG_MAP[selectedLang] || LANG_MAP[defaultLang] || 'en-IN';

      lastTextRef.current = text;
      lastLangRef.current = selectedLang;

      // Clean up markdown formatting for natural voice output
      const cleanText = text
        .replace(/[*#_~`>]/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\s+/g, ' ')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = bcpCode;
      utterance.rate = voiceSpeed || 1;
      utterance.pitch = 1;

      // Retain utterance on window to prevent browser from abruptly stopping long speech
      if (typeof window !== 'undefined') {
        window._echosight_active_utterance = utterance;
      }

      // Try selecting a matching voice if available
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find((v) => v.lang === bcpCode || v.lang.startsWith(bcpCode.slice(0, 2)));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        utteranceRef.current = null;
      };

      utterance.onerror = (event) => {
        // 'canceled' or 'interrupted' errors are normal when cancel() is invoked
        if (event.error !== 'canceled' && event.error !== 'interrupted') {
          console.warn('Speech synthesis error:', event.error);
        }
        setIsSpeaking(false);
        setIsPaused(false);
        utteranceRef.current = null;
      };

      utterance.onpause = () => {
        setIsPaused(true);
      };

      utterance.onresume = () => {
        setIsPaused(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [voiceEnabled, voiceSpeed, defaultLang]
  );

  const repeat = useCallback(() => {
    if (lastTextRef.current) {
      speak(lastTextRef.current, lastLangRef.current);
    }
  }, [speak]);

  // Clean up synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isSpeaking,
    isPaused,
    supported,
    speak,
    pause,
    resume,
    stop,
    repeat
  };
}

export default useSpeech;
