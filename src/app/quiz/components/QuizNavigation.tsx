
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
  const { currentStep, nextStep, isLastStep, handleQuizSubmit, isLoading, answers } = useQuiz();
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
    if (isLastStep && !answers.email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to continue.",
        variant: "destructive",
      });
      return;
    }

    const styleGuide = await handleQuizSubmit();
    if (styleGuide) {
      toast({
        title: "Style Guide Generated!",
        description: "Redirecting to your personalized results...",
      });
      router.push("/results");
    } else {
       toast({
        title: "Submission Failed",
        description: "Could not generate your style guide. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSkipStep1 = () => {
    nextStep();
    window.scrollTo(0, 0);
  }

  const totalSelectedRooms = currentStep === 3 && answers.roomImprovementSelections
    ? Object.values(answers.roomImprovementSelections).reduce((sum, count) => sum + count, 0)
    : 0;

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
            className="text-sm text-muted-foreground hover:text-accent transition-colors order-last sm:order-first sm:mr-4" // order-last for mobile stacking, order-first for row, mr-4 for spacing
            aria-label="Skip this step"
          >
            I don&apos;t like these. Skip.
          </button>
        )}
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
        {isLastStep && (
          <Button
            onClick={handleSubmitClick}
            disabled={isLoading || !answers.email}
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
