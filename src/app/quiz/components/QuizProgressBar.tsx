"use client";

import { Progress } from "@/components/ui/progress";
import { useQuiz } from "@/context/QuizContext";
import { TOTAL_QUIZ_STEPS } from "@/types/quiz";

export function QuizProgressBar() {
  const { currentStep } = useQuiz();
  const progressPercentage = (currentStep / TOTAL_QUIZ_STEPS) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-primary">
          Step {currentStep} of {TOTAL_QUIZ_STEPS}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      <Progress value={progressPercentage} className="w-full h-3 bg-primary/20" />
    </div>
  );
}
