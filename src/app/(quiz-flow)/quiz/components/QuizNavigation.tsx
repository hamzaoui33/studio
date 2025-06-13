
"use client";

import { Button } from "@/components/ui/button";
import { useQuiz } from "@/context/QuizContext";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import Image from 'next/image';
// Link import is not used if handleSubmitClick is removed and no other links are present
// import Link from 'next/link'; 

interface QuizNavigationProps {
  onNext?: () => Promise<boolean>; 
  isNextDisabled?: boolean;
}

export function QuizNavigation({ onNext, isNextDisabled = false }: QuizNavigationProps) {
  const { currentStep, isLastStep, isLoading, answers, triggerNextStepFlow, isNextActionDisabled: isButtonDisabledByContext, TOTAL_QUIZ_STEPS } = useQuiz();

  const handleNextClick = async () => {
    if (onNext) {
      // The onNext prop in current usage within page.tsx doesn't actually do anything async or return a boolean.
      // It's a placeholder. For robustness, we await it if it's a promise.
      // The actual step progression and validation is handled by triggerNextStepFlow called from page.tsx context.
      // This onNext prop is primarily for any step-specific pre-navigation logic if needed in the future from the parent.
      // For now, this function essentially calls triggerNextStepFlow via the parent.
      await onNext(); 
    }
  };

  // handleSubmitClick is removed as it's not callable when the last step is the loading screen (TOTAL_QUIZ_STEPS)
  // for which this navigation component is hidden.

  const handleSkipStep1 = () => {
    // For skipping step 1, we directly use triggerNextStepFlow which handles validation and progression.
    // goToStep(2) would bypass any validation/logic within triggerNextStepFlow for step 1.
    // However, since step 1's validation (selecting at least one image) is skipped by this action,
    // we need to ensure triggerNextStepFlow is called in a way that allows skipping.
    // A simpler approach: if QuizContext's internalNextStep or triggerNextStepFlow can handle "skip" scenarios, use that.
    // Current triggerNextStepFlow in context performs validation first.
    // A dedicated skip function in context might be cleaner, or a flag to triggerNextStepFlow.
    // For now, mimicking the "next" behavior but for skip:
    if (currentStep === 1 && useQuiz().goToStep) { 
        useQuiz().goToStep(2); // Directly go to step 2, bypassing step 1 validation
        window.scrollTo(0,0);
    }
  }

  const totalSelectedRooms = currentStep === 5 && answers.roomImprovementSelections
    ? Object.values(answers.roomImprovementSelections).reduce((sum, count) => sum + (count || 0), 0)
    : 0;

  // Hide navigation for the Loading screen (now Step 7, which is TOTAL_QUIZ_STEPS)
  if (currentStep === TOTAL_QUIZ_STEPS) { 
    return null;
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); 
    const targetUrl = 'https://decorwhisper.com';
    if (window.parent !== window) { 
      window.parent.postMessage({ type: 'navigateToParentUrl', url: targetUrl }, '*');
    } else {
      // Fallback for direct access or if not in an iframe
      window.top.location.href = targetUrl;
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[55] bg-background border-b border-border p-[15px] flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        <a
          href="https://decorwhisper.com" // Direct href for non-JS scenarios or direct link
          onClick={handleLogoClick}
          target="_top" // Ensures it breaks out of iframe if possible
          aria-label="Go to DecorWhisper homepage"
          className="block" // Added for better layout control if needed
        >
          <Image 
            src="https://decorwhisper.com/wp-content/uploads/2025/06/my-logo.png" 
            alt="DecorStyle Discovery Logo" 
            width={80} // Reduced width slightly
            height={28} // Reduced height slightly
            className="h-7 w-auto" // Maintain aspect ratio, max height 7 (28px)
            priority // Logo is LCP candidate
            />
        </a>
        {currentStep === 5 && totalSelectedRooms > 0 && (
          <span className="text-xs sm:text-sm font-medium text-muted-foreground ml-2 sm:ml-4">
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

        {/* "Next" button. Not shown on the last step (Loading screen) */}
        {!isLastStep && (
          <Button
            onClick={handleNextClick}
            disabled={isLoading || isButtonDisabledByContext() || isNextDisabled}
            className="bg-accent hover:bg-accent/90 text-accent-foreground disabled:bg-accent/40 disabled:text-accent-foreground/70 disabled:cursor-not-allowed rounded-md px-3 py-2 sm:px-5 text-xs sm:text-sm font-semibold min-w-[70px] sm:min-w-[90px]"
            aria-label="Next Step"
          >
            {/* isLoading is managed by QuizContext, reflects AI submission primarily */}
            {/* For step-to-step loading, a local loading state in page.tsx might be better if needed */}
            Next
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        )}
        
        {/* The "Submit Quiz" button block.
            This is effectively dead code if isLastStep is true only for TOTAL_QUIZ_STEPS (loading screen),
            because the entire navigation is hidden for TOTAL_QUIZ_STEPS.
            It's kept here in case the quiz flow changes to have an interactive final step before loading.
        */}
        {isLastStep && currentStep !== TOTAL_QUIZ_STEPS && ( 
          <Button
            onClick={() => { /* This onClick should ideally call a submit function if this button were active */ }}
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
