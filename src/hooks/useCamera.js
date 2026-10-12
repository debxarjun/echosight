import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook for camera stream management and snapshot capture.
 */
export function useCamera(initialFacingMode = 'environment') {
  const [stream, setStream] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState(initialFacingMode);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  }, [stream]);

  const startCamera = useCallback(
    async (mode = facingMode) => {
      // Stop any existing stream first
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }

      setError(null);

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const errorMsg = 'Camera access is not supported by your browser or environment.';
        setError(errorMsg);
        return null;
      }

      try {
        const constraints = {
          audio: false,
          video: {
            facingMode: { ideal: mode },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(mediaStream);
        setIsActive(true);
        setError(null);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch((playErr) => {
            console.warn('Auto-playback on camera feed failed:', playErr);
          });
        }

        return mediaStream;
      } catch (err) {
        let userMessage = 'Failed to access camera.';
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          userMessage = 'Camera permission was denied. Please allow camera access in your browser settings to continue.';
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          userMessage = 'No camera device found on your device.';
        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
          userMessage = 'Camera is already in use by another application or tab.';
        } else if (err.name === 'OverconstrainedError') {
          // Fallback to basic video without facingMode constraint
          try {
            const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            setStream(fallbackStream);
            setIsActive(true);
            setError(null);
            if (videoRef.current) {
              videoRef.current.srcObject = fallbackStream;
              videoRef.current.play().catch(() => {});
            }
            return fallbackStream;
          } catch (fallbackErr) {
            userMessage = 'Camera resolution or facing constraint could not be satisfied.';
          }
        } else {
          userMessage = err.message || 'Unable to open camera feed.';
        }

        setError(userMessage);
        setIsActive(false);
        return null;
      }
    },
    [facingMode, stream]
  );

  const switchCamera = useCallback(async () => {
    const nextFacingMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacingMode);
    return await startCamera(nextFacingMode);
  }, [facingMode, startCamera]);

  const captureImage = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isActive) {
      throw new Error('Camera is not active or video element is not ready.');
    }

    let canvas = canvasRef.current;
    if (!canvas) {
      canvas = document.createElement('canvas');
    }

    const rawWidth = video.videoWidth || 1280;
    const rawHeight = video.videoHeight || 720;

    // Fast-scale: limit maximum dimension to 960px for ~80% smaller payload and 3-5x faster AI inference
    const maxDimension = 960;
    let targetWidth = rawWidth;
    let targetHeight = rawHeight;

    if (rawWidth > maxDimension || rawHeight > maxDimension) {
      if (rawWidth >= rawHeight) {
        targetWidth = maxDimension;
        targetHeight = Math.round((rawHeight * maxDimension) / rawWidth);
      } else {
        targetHeight = maxDimension;
        targetWidth = Math.round((rawWidth * maxDimension) / rawHeight);
      }
    }

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Unable to acquire 2D canvas context for capture.');
    }

    ctx.drawImage(video, 0, 0, targetWidth, targetHeight);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
    return dataUrl;
  }, [isActive]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return {
    stream,
    isActive,
    error,
    facingMode,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    switchCamera,
    captureImage
  };
}

export default useCamera;
