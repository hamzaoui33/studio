
"use client";

import { useEffect } from 'react';
import { useQuiz } from "@/context/QuizContext";
import { Hand } from "lucide-react";

export function Step6Greeting() {
  const { answers, nextStep } = useQuiz();

  useEffect(() => {
    const timer = setTimeout(() => {
      nextStep();
    }, 2000); // 2 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [nextStep]);

  return (
    <div className="flex flex-col items-center justify-center text-center h-full animate-fadeIn">
      <h1 className="font-headline text-4xl md:text-5xl font-semibold text-foreground mb-8">
        Nice to meet you, {answers.userName || "Explorer"}!
      </h1>
      <Hand className="w-16 h-16 text-primary" strokeWidth={1.5} />
    </div>
  );
}

