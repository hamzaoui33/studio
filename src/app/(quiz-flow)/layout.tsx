
"use client"; // Add "use client" if QuizProvider or its children use client-side features directly

import { QuizProvider } from '@/context/QuizContext';
import type { ReactNode } from 'react';

export default function QuizFlowLayout({ children }: { children: ReactNode }) {
  return (
    <QuizProvider>
      <main className="container mx-auto px-4 py-8 flex-grow bg-white">
        {children}
      </main>
    </QuizProvider>
  );
}
