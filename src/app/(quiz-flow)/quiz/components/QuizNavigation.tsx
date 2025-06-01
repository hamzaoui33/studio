
"use client";

import { Button } from "@/components/ui/button";
import { useQuiz } from "@/context/QuizContext";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
// useRouter and useToast are not directly needed here anymore if all logic is in context
// import { useRouter } from "next/navigation";
// import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import Link from 'next/link'; // Keep Link for the logo fallback initially

interface QuizNavigationProps {
  onNext?: () => Promise<boolean>; // Expecting a promise now
  isNextDisabled?: boolean;
}

export function QuizNavigation({ onNext, isNextDisabled = false }: QuizNavigationProps) {
  // Use triggerNextStepFlow from context for the "Next" button.
  // Use isNextActionDisabled for disabling the button.
  const { currentStep, internalNextStep, isLastStep, isLoading, answers, triggerNextStepFlow, isNextActionDisabled: isButtonDisabledByContext } = useQuiz();
  // const router = useRouter(); // Keep if other navigation becomes necessary
  // const { toast } = useToast(); // Keep if local toasts are needed

  const handleNextClick = async () => {
    if (onNext) {
      await onNext(); // This now calls triggerNextStepFlow from context
    }
    // Scrolling is handled within context's internalNextStep or goToStep
  };

  const handleSubmitClick = async () => {
    // This function is unlikely to be called if Step 8 (Loading) is the last step,
    // as QuizNavigation is hidden for Step 8. Submission logic is in QuizContext/Step8Loading.
    // For safety, if it were called:
    if (!answers.email) { 
      // This toast should ideally come from context if validation fails there.
      // For now, let's assume context handles this or it's a fallback.
      // toast({
      //   title: "Email Required",
      //   description: "An email address is required. Please ensure it was entered in Step 7.",
      //   variant: "destructive",
      // });
      console.error("QuizNavigation: handleSubmitClick called without email - should be handled by context.");
      return;
    }
    console.warn("QuizNavigation: handleSubmitClick in QuizNavigation called unexpectedly with Step 8 (Loading) as the last step.");
    // The actual submission (handleQuizSubmit) is orchestrated by Step8Loading or QuizContext.
  };

  const handleSkipStep1 = () => {
    // Directly call internalNextStep for skipping without validation for this specific case
    // However, best practice would be a dedicated skip function in context if complex logic involved.
    // For simplicity, let's assume a direct nextStep is okay for "skip".
    // QuizContext should ideally expose a 'skipStep' method.
    // For now, let's use the direct internalNextStep or goToStep(currentStep + 1).
    if (currentStep === 1 && useQuiz().goToStep) { // Access goToStep via useQuiz()
        useQuiz().goToStep(2); 
        window.scrollTo(0,0);
    }
  }

  const totalSelectedRooms = currentStep === 3 && answers.roomImprovementSelections
    ? Object.entries(answers.roomImprovementSelections)
        .filter(([key]) => key !== 'other' && key !== 'not_sure_yet')
        .reduce((sum, [, count]) => sum + count, 0)
    : 0;

  if (currentStep === 6 || currentStep === 8) { // Hide for Greeting and Loading
    return null;
  }

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); 
    const targetUrl = 'https://decorwhisper.com';
    if (window.parent !== window) { 
      // IMPORTANT: For production, replace '*' with your WordPress site's specific origin for security.
      window.parent.postMessage({ type: 'navigateToParentUrl', url: targetUrl }, '*');
    } else {
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
            disabled={isLoading || isButtonDisabledByContext() || isNextDisabled} // Use context's disabled state + prop
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-md px-3 py-2 sm:px-5 text-xs sm:text-sm font-semibold min-w-[70px] sm:min-w-[90px]"
            aria-label="Next Step"
          >
            Next
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        )}

        {/* This submit button is effectively dead code if Step 8 (Loading) is the last step, as nav is hidden. */}
        {isLastStep && currentStep !== 8 && ( 
          <Button
            onClick={handleSubmitClick}
            disabled={isLoading || isButtonDisabledByContext() || isNextDisabled} 
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

    