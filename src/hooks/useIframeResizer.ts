
"use client";

import { useEffect, type RefObject } from 'react';

// IMPORTANT: For production, replace '*' with your WordPress site's domain for security.
// For example: const PARENT_ORIGIN = 'https://yourwordpressdomain.com';
const PARENT_ORIGIN = '*'; 

export function useIframeResizer(
  contentRef: RefObject<HTMLElement>,
  dependencies: any[] // e.g., currentStep, or any other value that changing might affect height
) {
  useEffect(() => {
    // Ensure this code runs only in the browser and the ref is current
    if (typeof window === 'undefined' || !contentRef.current) {
      return;
    }

    // Function to send height to parent
    const sendHeight = () => {
      // Check if the app is actually embedded in an iframe
      if (contentRef.current && window.parent !== window) { 
        const height = contentRef.current.scrollHeight;
        // console.log('Next.js app: Sending height to parent:', height); // For debugging
        window.parent.postMessage({ type: 'quizAppResize', height: height }, PARENT_ORIGIN);
      }
    };

    // Debounce sendHeight to avoid excessive messages during rapid resizes
    let debounceTimeout: NodeJS.Timeout;
    const debouncedSendHeight = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(sendHeight, 100); // Adjust delay as needed (e.g., 50-200ms)
    };
    
    // Send height initially and whenever dependencies change
    debouncedSendHeight();

    // Observe content for size changes
    const resizeObserver = new ResizeObserver(() => {
      debouncedSendHeight();
    });

    resizeObserver.observe(contentRef.current);

    // Cleanup observer on component unmount
    return () => {
      clearTimeout(debounceTimeout);
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentRef, ...dependencies]); // Spread dependencies into the useEffect hook's dependency array
}
