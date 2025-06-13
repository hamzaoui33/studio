
"use client";

import { useEffect, useState } from 'react';
import { useQuiz } from "@/context/QuizContext";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

// GuaranteeBadge component is removed as per request

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

    const submissionTimer = setTimeout(async () => {
      clearInterval(factInterval); // Clear fact interval once submission starts/finishes
      const styleGuideResult = await handleQuizSubmit(); // Renamed for clarity
      if (styleGuideResult) { // Check if result is not null
        toast({
          title: "Style Guide Generated!",
          description: "Redirecting to your personalized results...",
        });
        router.push("/results");
      } else {
         toast({
          title: "Submission Failed",
          description: "Could not generate your style guide. Please try again or contact support.",
          variant: "destructive",
        });
        // Optionally, redirect to a previous step or quiz home
        // router.push("/quiz"); // Example: redirect back to quiz start
      }
    }, 3000); // Submit after 3 seconds

    return () => {
      clearInterval(factInterval);
      clearTimeout(submissionTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleQuizSubmit, router, toast]); // Dependencies are correct

  const currentFact = didYouKnowFacts[currentFactIndex];

  return (
    <div className="flex flex-col items-center justify-center text-center animate-fadeIn space-y-12 md:space-y-20 py-10"> {/* Removed h-full */}
      <div className="flex flex-col items-center space-y-3.5">
        <p className="text-base text-muted-foreground tracking-wide">
          Calculating your results...
        </p>
        <div className="flex space-x-2.5">
          <span className="pulsating-dot animation-delay-0"></span>
          <span className="pulsating-dot animation-delay-200"></span>
          <span className="pulsating-dot animation-delay-400"></span>
          <span className="pulsating-dot animation-delay-600"></span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 md:gap-12"> {/* Removed md:flex-row to stack items */}
        <div className="text-center max-w-md"> {/* Changed md:text-left to text-center and increased max-w */}
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
        {/* GuaranteeBadge component removed here */}
      </div>
    </div>
  );
}
