
"use client";

import { useEffect } from 'react';
import { useQuiz } from "@/context/QuizContext";
import { Hand } from "lucide-react";

export function Step6Greeting() {
  const { answers, internalNextStep } = useQuiz(); // Use internalNextStep

  useEffect(() => {
    const timer = setTimeout(() => {
      internalNextStep(); // Call internalNextStep
    }, 1500); // Updated to 1500ms

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [internalNextStep]); // Depend on internalNextStep

  return (
    <div className="flex flex-col items-center justify-center text-center animate-fadeIn py-10"> {/* Removed h-full, added py-10 for some spacing */}
      <h1 className="font-headline text-4xl md:text-5xl font-semibold text-foreground mb-8">
        Nice to meet
        <br />
        you, {answers.userName || "Explorer"}!
      </h1>
      <Hand className="w-16 h-16 text-foreground" strokeWidth={1.5} />
    </div>
  );
}

    
