
"use client";

import { Button } from "@/components/ui/button";
import { useQuiz } from "@/context/QuizContext";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
// Link import is removed as it's no longer used for the logo
import Image from 'next/image';

interface QuizNavigationProps {
  onNext?: () => boolean | Promise<boolean>;
  isNextDisabled?: boolean;
}

export function QuizNavigation({ onNext, isNextDisabled = false }: QuizNavigationProps) {
  const { currentStep, nextStep, isLastStep, isLoading, answers } = useQuiz();
  const router = useRouter();
  const { toast } = useToast();

  const handleNextClick = async () => {
    let canProceed = true;
    if (onNext) {
      canProceed = await onNext();
    }
    if (canProceed) {
      nextStep();
      window.scrollTo(0, 0);
    }
  };

  const handleSubmitClick = async () => {
    if (!answers.email) { 
      toast({
        title: "Email Required",
        description: "An email address is required. Please ensure it was entered in Step 7.",
        variant: "destructive",
      });
      return;
    }
    console.warn("handleSubmitClick in QuizNavigation called unexpectedly with Step 8 (Loading) as the last step.");
  };

  const handleSkipStep1 = () => {
    nextStep();
    window.scrollTo(0, 0);
  }

  const totalSelectedRooms = currentStep === 3 && answers.roomImprovementSelections
    ? Object.entries(answers.roomImprovementSelections)
        .filter(([key]) => key !== 'other' && key !== 'not_sure_yet')
        .reduce((sum, [, count]) => sum + count, 0)
    : 0;

  if (currentStep === 6 || currentStep === 8) {
    return null;
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default <a> tag navigation
    const targetUrl = 'https://decorwhisper.com';
    if (window.parent !== window) { // Ensure it's in an iframe
      // IMPORTANT: For production, replace '*' with your WordPress site's specific origin for security.
      window.parent.postMessage({ type: 'navigateToParentUrl', url: targetUrl }, '*');
    } else {
      // Fallback if not in an iframe (though unlikely for this component's typical use)
      window.top.location.href = targetUrl;
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[55] bg-background border-b border-border p-[15px] flex items-center justify-between">
      {/* Left Part: Logo and potentially Total Rooms on Desktop */}
      <div className="flex items-center gap-2 md:gap-4">
        <a
          href="https://decorwhisper.com"
          onClick={handleLogoClick}
          target="_top" // Fallback for direct click/open in new tab & no JS
          aria-label="Go to DecorWhisper homepage"
          className="block"
        >
          {/* ---- Logo ---- */}
          <Image 
            src="https://decorwhisper.com/wp-content/uploads/2025/06/my-logo.png" 
            alt="DecorStyle Discovery Logo" 
            width={80} 
            height={28} 
            className="h-7 w-auto" />
          {/* ---- End Logo ---- */}
        </a>
        {/* Total Rooms: Shown on desktop for step 3 */}
        {currentStep === 3 && totalSelectedRooms > 0 && (
          <span className="hidden md:block text-sm font-medium text-muted-foreground">
            Total Rooms: {totalSelectedRooms}
          </span>
        )}
      </div>

      {/* Right Part: Skip Button (conditional) and Next/Submit Button */}
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
            disabled={isLoading || isNextDisabled}
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-md px-3 py-2 sm:px-5 text-xs sm:text-sm font-semibold min-w-[70px] sm:min-w-[90px]"
            aria-label="Next Step"
          >
            Next
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        )}

        {isLastStep && currentStep !== 8 && ( 
          <Button
            onClick={handleSubmitClick}
            disabled={isLoading || isNextDisabled} 
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-md px-3 py-2 sm:px-5 text-xs sm:text-sm font-semibold min-w-[70px] sm:min-w-[90px]"
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
