import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for hands-free voice control using the Web Speech Recognition API.
 */
export function useVoiceCommands({
  onCapture,
  onModeChange,
  onStop,
  onRepeat,
  language = 'en',
  enabled = true
} = {}) {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [recognitionError, setRecognitionError] = useState(null);

  const recognitionRef = useRef(null);
  const shouldListenRef = useRef(false);

  // Callback refs to avoid recreation of recognition instance
  const onCaptureRef = useRef(onCapture);
  const onModeChangeRef = useRef(onModeChange);
  const onStopRef = useRef(onStop);
  const onRepeatRef = useRef(onRepeat);

  useEffect(() => {
    onCaptureRef.current = onCapture;
    onModeChangeRef.current = onModeChange;
    onStopRef.current = onStop;
    onRepeatRef.current = onRepeat;
  });

  useEffect(() => {
    const SpeechRecognition =
      typeof window !== 'undefined' &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (SpeechRecognition) {
      setSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      const langMap = {
        en: 'en-US',
        hi: 'hi-IN',
        bn: 'bn-IN'
      };
      recognition.lang = langMap[language] || 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setRecognitionError(null);
      };

      recognition.onend = () => {
        // Auto-restart if continuous voice mode is supposed to be active
        if (shouldListenRef.current) {
          try {
            recognition.start();
          } catch (e) {
            // Already started or waiting
          }
        } else {
          setIsListening(false);
        }
      };

      recognition.onerror = (event) => {
        if (event.error !== 'no-speech') {
          console.warn('Voice command recognition error:', event.error);
          setRecognitionError(event.error);
        }
        if (event.error === 'not-allowed') {
          shouldListenRef.current = false;
          setIsListening(false);
        }
      };

      recognition.onresult = (event) => {
        const lastIndex = event.results.length - 1;
        const transcript = event.results[lastIndex][0].transcript.trim().toLowerCase();
        setLastCommand(transcript);

        // Command Matching:
        // 1. Capture commands
        if (
          transcript.includes('capture') ||
          transcript.includes('take photo') ||
          transcript.includes('click') ||
          transcript.includes('scan') ||
          transcript.includes('photo') ||
          transcript.includes('picture') ||
          transcript.includes('खींचो') ||
          transcript.includes('फोटो') ||
          transcript.includes('ছবি')
        ) {
          if (onCaptureRef.current) {
            onCaptureRef.current();
          }
          return;
        }

        // 2. Mode commands
        if (
          transcript.includes('currency') ||
          transcript.includes('money') ||
          transcript.includes('rupee') ||
          transcript.includes('पैसा') ||
          transcript.includes('টাকা')
        ) {
          if (onModeChangeRef.current) onModeChangeRef.current('currency');
          return;
        }

        if (
          transcript.includes('medicine') ||
          transcript.includes('pill') ||
          transcript.includes('tablet') ||
          transcript.includes('दवा') ||
          transcript.includes('ঔষধ')
        ) {
          if (onModeChangeRef.current) onModeChangeRef.current('medicine');
          return;
        }

        if (
          transcript.includes('food') ||
          transcript.includes('snack') ||
          transcript.includes('खाना') ||
          transcript.includes('খাবার')
        ) {
          if (onModeChangeRef.current) onModeChangeRef.current('food');
          return;
        }

        if (
          transcript.includes('text') ||
          transcript.includes('read') ||
          transcript.includes('sign') ||
          transcript.includes('पढ़ो') ||
          transcript.includes('পড়ো')
        ) {
          if (onModeChangeRef.current) onModeChangeRef.current('text');
          return;
        }

        if (
          transcript.includes('general') ||
          transcript.includes('surroundings') ||
          transcript.includes('scene') ||
          transcript.includes('describe')
        ) {
          if (onModeChangeRef.current) onModeChangeRef.current('general');
          return;
        }

        // 3. Audio control commands
        if (
          transcript.includes('stop') ||
          transcript.includes('quiet') ||
          transcript.includes('pause') ||
          transcript.includes('रुको') ||
          transcript.includes('থামো')
        ) {
          if (onStopRef.current) onStopRef.current();
          return;
        }

        if (
          transcript.includes('repeat') ||
          transcript.includes('again') ||
          transcript.includes('फिर से') ||
          transcript.includes('আবার')
        ) {
          if (onRepeatRef.current) onRepeatRef.current();
          return;
        }
      };

      recognitionRef.current = recognition;
    } else {
      setSupported(false);
    }

    return () => {
      shouldListenRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, [language]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && supported) {
      try {
        shouldListenRef.current = true;
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        // Recognition might already be running
      }
    }
  }, [supported]);

  const stopListening = useCallback(() => {
    shouldListenRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch (e) {}
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    supported,
    lastCommand,
    recognitionError,
    startListening,
    stopListening,
    toggleListening
  };
}

export default useVoiceCommands;
