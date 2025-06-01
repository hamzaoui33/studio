
"use client";

import { useEffect, type RefObject } from 'react';

// IMPORTANT: For production, replace '*' with your WordPress site's domain for security.
// For example: const PARENT_ORIGIN = 'https://yourwordpressdomain.com';
const PARENT_ORIGIN = '*'; 

export function useIframeResizer(
  dependencies: any[] // e.g., currentStep, or any other value that changing might affect height
) {
  useEffect(() => {
    // Ensure this code runs only in the browser
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Function to send height to parent
    const sendHeight = () => {
      // Check if the app is actually embedded in an iframe
      if (window.parent !== window) { 
        // Use document.documentElement.scrollHeight for a more comprehensive height
        const height = document.documentElement.scrollHeight;
        // console.log('Next.js app: Sending height to parent:', height); // For debugging
        window.parent.postMessage({ type: 'quizAppResize', height: height }, PARENT_ORIGIN);
      }
    };

    // Debounce sendHeight to avoid excessive messages during rapid resizes
    let debounceTimeout: NodeJS.Timeout;
    const debouncedSendHeight = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(sendHeight, 150); // Adjusted delay slightly
    };
    
    // Send height initially and whenever dependencies change
    debouncedSendHeight();

    // Observe document body for size changes
    // Changes to content within the body will cause the body to resize, triggering the observer.
    // sendHeight will then read document.documentElement.scrollHeight.
    const resizeObserver = new ResizeObserver(() => {
      debouncedSendHeight();
    });

    // Observe document.body as its size changes reflect content changes
    resizeObserver.observe(document.body);

    // Cleanup observer on component unmount
    return () => {
      clearTimeout(debounceTimeout);
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies]); // Spread dependencies into the useEffect hook's dependency array
}

