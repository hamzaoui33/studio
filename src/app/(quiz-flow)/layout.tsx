
"use client"; 

import { QuizProvider } from '@/context/QuizContext';
import type { ReactNode } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary'; // Import ErrorBoundary

export default function QuizFlowLayout({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary 
      fallback={
        <div style={{color: 'red', padding: '20px', textAlign: 'center', border: '1px dashed red', margin: '20px'}}>
          <p><strong>Error: The quiz could not be loaded.</strong></p>
          <p>Please try refreshing the page. If the problem persists, contact support.</p>
        </div>
      }
    >
      <QuizProvider>
        <main className="container mx-auto px-[15px] py-8 bg-white">
          {children}
        </main>
      </QuizProvider>
    </ErrorBoundary>
  );
}
