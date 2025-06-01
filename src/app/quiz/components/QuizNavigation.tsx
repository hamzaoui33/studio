
"use client";

import { Button } from "@/components/ui/button";
import { useQuiz } from "@/context/QuizContext";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface QuizNavigationProps {
  onNext?: () => boolean | Promise<boolean>;
  isNextDisabled?: boolean;
}

export function QuizNavigation({ onNext, isNextDisabled = false }: QuizNavigationProps) {
  const { currentStep, nextStep, isLastStep, isLoading, answers } = useQuiz();
  // Removed handleQuizSubmit from here, as Step8Loading will handle it
  const router = useRouter();
  const { toast } = useToast();

  const handleNextClick = async () => {
    let canProceed = true;
    if (onNext) {
      canProceed = await onNext();
    }
    if (canProceed) {
      // If the current step is 7 (Email), and it's the step before the last (Loading screen),
      // then nextStep() will advance to the Loading screen (Step 8).
      // The Loading screen will then handle the submission.
      nextStep();
      window.scrollTo(0, 0);
    }
  };

  // The main submit button is effectively removed because Step 8 (Loading) is the last step,
  // and QuizNavigation is hidden for Step 8. Submission is handled by Step8Loading.
  // The handleSubmitClick function below would only be relevant if there was an interactive last step.
  // We keep it structurally for now but it won't be called in the current flow where step 8 is last.
  const handleSubmitClick = async () => {
    if (!answers.email) { // This check is technically redundant if Step 8 is last & auto-submits
      toast({
        title: "Email Required",
        description: "An email address is required. Please ensure it was entered in Step 7.",
        variant: "destructive",
      });
      return;
    }
    // The handleQuizSubmit() call that was here is now in Step8Loading.tsx
    // For safety, we could call it here too IF this button was somehow made visible on a final interactive step
    // but that's not the current design.
    console.warn("handleSubmitClick in QuizNavigation called unexpectedly with Step 8 (Loading) as the last step.");
  };

  const handleSkipStep1 = () => {
    nextStep();
    window.scrollTo(0, 0);
  }

  const totalSelectedRooms = currentStep === 3 && answers.roomImprovementSelections
    ? Object.values(answers.roomImprovementSelections).reduce((sum, count) => sum + count, 0)
    : 0;

  // Hide navigation for Greeting step (step 6) and Loading step (step 8)
  if (currentStep === 6 || currentStep === 8) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="w-full sm:w-auto sm:flex-grow text-center sm:text-left">
        {currentStep === 3 && totalSelectedRooms > 0 && (
          <span className="text-sm font-medium text-muted-foreground">
            Total Rooms: {totalSelectedRooms}
          </span>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        {currentStep === 1 && answers.swoonWorthyRooms.length === 0 && !isLastStep && (
          <button
            onClick={handleSkipStep1}
            className="text-sm text-muted-foreground hover:text-accent transition-colors order-last sm:order-first sm:mr-4"
            aria-label="Skip this step"
          >
            I don&apos;t like these. Skip.
          </button>
        )}
        
        {/* Show "Next" button for all steps except the last one (which is now Step 8, the loading screen) */}
        {!isLastStep && (
          <Button
            onClick={handleNextClick}
            disabled={isLoading || isNextDisabled}
            className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 py-3 text-base font-semibold"
            aria-label="Next Step"
          >
            Next
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}

        {/* The "Get My Style Guide" button will not be shown if Step 8 (Loading) is the last step,
            because QuizNavigation is hidden for Step 8.
            This block is effectively dead code in the current configuration.
         */}
        {isLastStep && currentStep !== 8 && ( 
          <Button
            onClick={handleSubmitClick} // This won't be called if currentStep 8 is last.
            disabled={isLoading || isNextDisabled} 
            className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 py-3 text-base font-semibold"
            aria-label="Submit Quiz"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <CheckCircle className="mr-2 h-5 w-5" />
            )}
            {isLoading ? "Generating..." : "Get My Style Guide"}
          </Button>
        )}
      </div>
    </div>
  );
}
