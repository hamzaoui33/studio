
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-4 md:p-6 flex flex-col justify-center sm:flex-row sm:justify-end items-center gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        {currentStep === 3 && totalSelectedRooms > 0 && (
          <span className="text-sm font-medium text-muted-foreground sm:order-1">
            Total Rooms: {totalSelectedRooms}
          </span>
        )}
        
        {currentStep === 1 && answers.swoonWorthyRooms.length === 0 && !isLastStep && (
          <button
            onClick={handleSkipStep1}
            className="text-sm text-muted-foreground hover:text-accent transition-colors order-last sm:order-2 sm:mr-4"
            aria-label="Skip this step"
          >
            I don&apos;t like these. Skip.
          </button>
        )}
        
        {!isLastStep && (
          <Button
            onClick={handleNextClick}
            disabled={isLoading || isNextDisabled}
            className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 py-3 text-base font-semibold sm:order-3"
            aria-label="Next Step"
          >
            Next
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}

        {isLastStep && currentStep !== 8 && ( 
          <Button
            onClick={handleSubmitClick}
            disabled={isLoading || isNextDisabled} 
            className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 py-3 text-base font-semibold sm:order-3"
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
