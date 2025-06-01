import { QuizProvider } from '@/context/QuizContext';
import type { ReactNode } from 'react';

export default function QuizLayout({ children }: { children: ReactNode }) {
  return (
    <QuizProvider>
      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
      </main>
    </QuizProvider>
  );
}
