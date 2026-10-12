import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useSettings } from '../contexts/SettingsContext';
import { getPrompt } from '../utils/prompts';

/**
 * Custom hook for Google Gemini AI image analysis.
 */
export function useAI() {
  const { apiKey, language } = useSettings();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  const analyzeImage = useCallback(
    async (base64Data, mode = 'general') => {
      clearResult();

      if (!apiKey || apiKey.trim() === '') {
        const keyErr = 'Gemini API key is missing. Please set your API key in Settings.';
        setError(keyErr);
        throw new Error(keyErr);
      }

      if (!base64Data) {
        const imgErr = 'No image data provided for analysis.';
        setError(imgErr);
        throw new Error(imgErr);
      }

      setIsAnalyzing(true);
      setError(null);

      try {
        // Strip out data URL prefix if present (e.g. data:image/jpeg;base64, or any mime type)
        const cleanBase64 = base64Data.includes(',')
          ? base64Data.split(',')[1]
          : base64Data;

        const ai = new GoogleGenerativeAI(apiKey.trim());
        const promptText = getPrompt(mode, language);
        const imagePart = {
          inlineData: {
            data: cleanBase64,
            mimeType: 'image/jpeg'
          }
        };

        const defaultCandidates = [
          'gemini-3.8-flash',
          'gemini-3.6-flash',
          'gemini-2.5-flash',
          'gemini-1.5-flash',
          'gemini-flash'
        ];

        // Retrieve previously verified working model to avoid redundant candidate trials
        const storedModel = typeof window !== 'undefined' ? localStorage.getItem('echosight-active-model') : null;
        const candidateModels = storedModel
          ? [storedModel, ...defaultCandidates.filter((m) => m !== storedModel)]
          : defaultCandidates;

        let lastError = null;
        let responseText = null;

        for (const modelName of candidateModels) {
          try {
            const model = ai.getGenerativeModel({
              model: modelName,
              generationConfig: {
                temperature: 0.3
              }
            });
            const response = await model.generateContent([promptText, imagePart]);
            responseText = response.response.text();
            if (responseText && responseText.trim().length > 0) {
              // Cache this verified working model
              if (typeof window !== 'undefined') {
                localStorage.setItem('echosight-active-model', modelName);
              }
              break;
            }
          } catch (modelErr) {
            lastError = modelErr;
            const errMsg = modelErr.message || '';
            const isTransientOrUnavailable =
              errMsg.includes('503') ||
              errMsg.includes('high demand') ||
              errMsg.includes('404') ||
              errMsg.includes('not found') ||
              errMsg.includes('429') ||
              errMsg.includes('temporarily unavailable') ||
              errMsg.includes('overloaded');

            if (isTransientOrUnavailable) {
              // Clear cached model if it just failed
              if (typeof window !== 'undefined' && localStorage.getItem('echosight-active-model') === modelName) {
                localStorage.removeItem('echosight-active-model');
              }
              // Try next candidate model seamlessly
              continue;
            }
            throw modelErr;
          }
        }

        if (!responseText && lastError) {
          throw lastError;
        }

        setResult(responseText);
        setIsAnalyzing(false);
        return responseText;
      } catch (err) {
        let displayError = 'Image analysis failed. Please try again.';

        if (err.message && err.message.includes('API_KEY_INVALID')) {
          displayError = 'Invalid Gemini API key. Please check your key in Settings.';
        } else if (err.message && (err.message.includes('quota') || err.message.includes('RESOURCE_EXHAUSTED'))) {
          displayError = 'API quota exceeded. Please try again later or verify your billing plan.';
        } else if (err.message && (err.message.includes('503') || err.message.includes('high demand'))) {
          displayError = 'Google AI servers are experiencing a brief spike in traffic. Please tap Capture again in a few seconds.';
        } else if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
          displayError = 'Network error: Please check your internet connection.';
        } else if (err.message) {
          displayError = err.message;
        }

        setError(displayError);
        setIsAnalyzing(false);
        throw new Error(displayError);
      }
    },
    [apiKey, language, clearResult]
  );

  return {
    isAnalyzing,
    result,
    error,
    analyzeImage,
    clearResult
  };
}

export default useAI;
