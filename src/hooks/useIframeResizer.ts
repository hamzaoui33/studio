
"use client";

import { useEffect, useState, useCallback, useRef } from 'react';

// IMPORTANT: For production, replace '*' with your WordPress site's domain for security.
// For example: const PARENT_ORIGIN = 'https://yourwordpressdomain.com';
const PARENT_ORIGIN = '*'; 
const DEBOUNCE_DELAY = 250; 
const MIN_HEIGHT_CHANGE_TO_REPORT = 2; 

export function useIframeResizer(
  dependencies: any[] 
) {
  const [lastSentHeight, setLastSentHeight] = useState<number>(0);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sendHeight = useCallback(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined' || window.parent === window) {
      return;
    }

    const newHeight = document.documentElement.scrollHeight;

    if (newHeight > 0 && (Math.abs(newHeight - lastSentHeight) >= MIN_HEIGHT_CHANGE_TO_REPORT || lastSentHeight === 0) ) {
      window.parent.postMessage({ type: 'quizAppResize', height: newHeight }, PARENT_ORIGIN);
      setLastSentHeight(newHeight);
    }
  }, [lastSentHeight]); 

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const debouncedSendHeight = () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(sendHeight, DEBOUNCE_DELAY); 
    };
    
    // Attempt an immediate send when dependencies change (e.g., step change)
    // This helps adjust height quickly for new step content.
    sendHeight(); 

    const resizeObserver = new ResizeObserver(() => {
      debouncedSendHeight();
    });

    resizeObserver.observe(document.body);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      resizeObserver.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, sendHeight]);
}
