
"use client";

import { useEffect, useState } from 'react';
import { useQuiz } from "@/context/QuizContext";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

const didYouKnowFacts = [
  {
    title: "Small Changes, Big Impact",
    description: "Even a few simple tweaks can completely transform a room’s vibe.",
  },
  {
    title: "Mixing Styles Works",
    description: "Combining different design styles can create a unique and personal space.",
  },
  {
    title: "Lighting Sets the Mood",
    description: "The right lighting can change how your whole room feels and looks.",
  },
];

export function Step8Loading() {
  const { handleQuizSubmit } = useQuiz();
  const router = useRouter();
  const { toast } = useToast();
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    const factInterval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % didYouKnowFacts.length);
    }, 1500); // Change fact every 1.5 seconds

    // Immediately call the submission logic, which is now synchronous
    handleQuizSubmit();

    // Set a short timer just for the UI transition before redirecting
    const redirectTimer = setTimeout(() => {
      clearInterval(factInterval); // Clear fact interval
      
      router.push("/results");

    }, 750); // A quick 0.75-second delay for a smooth transition

    return () => {
      clearInterval(factInterval);
      clearTimeout(redirectTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty to run only once on mount

  const currentFact = didYouKnowFacts[currentFactIndex];

  return (
    <div className="flex flex-col items-center justify-center text-center animate-fadeIn space-y-12 md:space-y-20 py-10">
      <div className="flex flex-col items-center space-y-3.5">
        <p className="text-base text-muted-foreground tracking-wide">
          Finalizing your results...
        </p>
        <div className="flex space-x-2.5">
          <span className="pulsating-dot animation-delay-0"></span>
          <span className="pulsating-dot animation-delay-200"></span>
          <span className="pulsating-dot animation-delay-400"></span>
          <span className="pulsating-dot animation-delay-600"></span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 md:gap-12">
        <div className="text-center max-w-md">
          <p className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 tracking-wider">
            DID YOU KNOW?
          </p>
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 font-headline transition-opacity duration-500 ease-in-out" key={currentFact.title}>
            {currentFact.title}
          </h3>
          <p className="text-sm text-muted-foreground transition-opacity duration-500 ease-in-out" key={currentFact.description}>
            {currentFact.description}
          </p>
        </div>
      </div>
    </div>
  );
}
