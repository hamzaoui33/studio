
"use client";

import { useEffect, useState, useCallback } from 'react';

// IMPORTANT: For production, replace '*' with your WordPress site's domain for security.
// For example: const PARENT_ORIGIN = 'https://yourwordpressdomain.com';
const PARENT_ORIGIN = '*'; 
const DEBOUNCE_DELAY = 250; // Increased debounce delay
const MIN_HEIGHT_CHANGE_TO_REPORT = 2; // Only report if height changes by at least this many pixels

export function useIframeResizer(
  dependencies: any[] // e.g., currentStep, or any other value that changing might affect height
) {
  const [lastSentHeight, setLastSentHeight] = useState<number>(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendHeight = useCallback(() => {
    // Ensure this code runs only in the browser
    if (typeof window === 'undefined' || typeof document === 'undefined' || window.parent === window) {
      return;
    }

    const newHeight = document.documentElement.scrollHeight;

    // Only send if the height has meaningfully changed or it's the initial valid send
    if (newHeight > 0 && (Math.abs(newHeight - lastSentHeight) >= MIN_HEIGHT_CHANGE_TO_REPORT || lastSentHeight === 0) ) {
      // console.log('Next.js app: Sending height to parent:', newHeight); // For debugging
      window.parent.postMessage({ type: 'quizAppResize', height: newHeight }, PARENT_ORIGIN);
      setLastSentHeight(newHeight);
    }
  }, [lastSentHeight]); // Include lastSentHeight in dependencies

  useEffect(() => {
    // Ensure this code runs only in the browser
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    let debounceTimeout: NodeJS.Timeout;
    const debouncedSendHeight = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(sendHeight, DEBOUNCE_DELAY); 
    };
    
    // Send height initially and whenever dependencies change
    debouncedSendHeight(); // This will be triggered by dependency changes

    // Observe document body for size changes
    const resizeObserver = new ResizeObserver(() => {
      debouncedSendHeight();
    });

    resizeObserver.observe(document.body);

    // Cleanup observer on component unmount
    return () => {
      clearTimeout(debounceTimeout);
      resizeObserver.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, sendHeight]); // Add sendHeight to dependencies as it's now memoized with lastSentHeight
}
