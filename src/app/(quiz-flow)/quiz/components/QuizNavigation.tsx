
"use client";

import { Button } from "@/components/ui/button";
import { useQuiz } from "@/context/QuizContext";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

interface QuizNavigationProps {
  onNext?: () => Promise<boolean>; 
  isNextDisabled?: boolean;
}

export function QuizNavigation({ onNext, isNextDisabled = false }: QuizNavigationProps) {
  const { currentStep, internalNextStep, isLastStep, isLoading, answers, triggerNextStepFlow, isNextActionDisabled: isButtonDisabledByContext } = useQuiz();

  const handleNextClick = async () => {
    if (onNext) {
      await onNext(); 
    }
  };

  // This handleSubmitClick is for a submit button on an interactive last step.
  // Since the new last step (Step 5) is the auto-submitting Loading screen,
  // and QuizNavigation is hidden for that step, this button won't be shown/used.
  const handleSubmitClick = async () => {
    console.warn("QuizNavigation: handleSubmitClick in QuizNavigation called unexpectedly. Submission is handled by the Loading step.");
  };

  const handleSkipStep1 = () => {
    if (currentStep === 1 && useQuiz().goToStep) { 
        useQuiz().goToStep(2); 
        window.scrollTo(0,0);
    }
  }

  const totalSelectedRooms = currentStep === 3 && answers.roomImprovementSelections
    ? Object.entries(answers.roomImprovementSelections)
        .filter(([key]) => key !== 'other' && key !== 'not_sure_yet')
        .reduce((sum, [, count]) => sum + count, 0)
    : 0;

  // Hide navigation for the new Step 5 (Loading screen)
  if (currentStep === 5) { 
    return null;
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); 
    const targetUrl = 'https://decorwhisper.com';
    if (window.parent !== window) { 
      window.parent.postMessage({ type: 'navigateToParentUrl', url: targetUrl }, '*');
    } else {
      window.top.location.href = targetUrl;
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[55] bg-background border-b border-border p-[15px] flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        <a
          href="https://decorwhisper.com"
          onClick={handleLogoClick}
          target="_top" 
          aria-label="Go to DecorWhisper homepage"
          className="block"
        >
          <Image 
            src="https://decorwhisper.com/wp-content/uploads/2025/06/my-logo.png" 
            alt="DecorStyle Discovery Logo" 
            width={80} 
            height={28} 
            className="h-7 w-auto" />
        </a>
        {currentStep === 3 && totalSelectedRooms > 0 && (
          <span className="hidden md:block text-sm font-medium text-muted-foreground">
            Total Rooms: {totalSelectedRooms}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {currentStep === 1 && answers.swoonWorthyRooms.length === 0 && !isLastStep && (
          <button
            onClick={handleSkipStep1}
            className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors px-2 py-1 rounded-md whitespace-nowrap"
            aria-label="Skip this step"
          >
            I don&apos;t like these. Skip.
          </button>
        )}

        {!isLastStep && (
          <Button
            onClick={handleNextClick}
            disabled={isLoading || isButtonDisabledByContext() || isNextDisabled}
            className="bg-accent hover:bg-accent/90 text-accent-foreground disabled:bg-accent/40 disabled:text-accent-foreground/70 disabled:cursor-not-allowed rounded-md px-3 py-2 sm:px-5 text-xs sm:text-sm font-semibold min-w-[70px] sm:min-w-[90px]"
            aria-label="Next Step"
          >
            Next
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        )}

        {/* This "Submit" button is effectively not shown because isLastStep will be true for Step 5 (Loading), 
            and QuizNavigation is hidden for Step 5. */}
        {isLastStep && currentStep !== 5 && ( 
          <Button
            onClick={handleSubmitClick}
            disabled={isLoading || isButtonDisabledByContext() || isNextDisabled} 
            className="bg-accent hover:bg-accent/90 text-accent-foreground disabled:bg-accent/40 disabled:text-accent-foreground/70 disabled:cursor-not-allowed rounded-md px-3 py-2 sm:px-5 text-xs sm:text-sm font-semibold min-w-[70px] sm:min-w-[90px]"
            aria-label="Submit Quiz"
          >
            {isLoading ? (
              <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
            ) : (
              <CheckCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            )}
            <span className="hidden sm:inline">{isLoading ? "Generating..." : "Get My Style Guide"}</span>
            <span className="sm:hidden">{isLoading ? "Submitting..." : "Submit"}</span>
          </Button>
        )}
      </div>
    </div>
  );
}
