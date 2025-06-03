
"use client";

import { useState, useEffect } from 'react';
import { useQuiz } from "@/context/QuizContext";
import { Step1SwoonWorthy } from "./components/Step1SwoonWorthy";
import { Step2StyleSelection } from "./components/Step2StyleSelection";
import { Step3RoomImprovement } from "./components/Step3RoomImprovement";
import { Step4RoomFocus } from "./components/Step4RoomFocus";
// Step5Name, Step6Greeting, Step7Email removed
import { Step8Loading } from "./components/Step8Loading"; // This is now effectively Step 5
import { quizData } from "@/lib/quiz-data";
import type { AllQuizData } from "@/types/quiz";
import { cn } from "@/lib/utils";
import { useIframeResizer } from '@/hooks/useIframeResizer';

// PARENT_SITE_EXPECTED_ORIGIN is removed as login logic is removed
// For other postMessage (navigateToParentUrl), origin check is in QuizNavigation/Context

export default function QuizPage() {
  const { currentStep, answers } = useQuiz();
  useIframeResizer([currentStep, answers]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <Step1SwoonWorthy />;
      case 2: return <Step2StyleSelection />;
      case 3: return <Step3RoomImprovement />;
      case 4: return <Step4RoomFocus />;
      case 5: return <Step8Loading />; // Step 8 (Loading) is now the new Step 5
      default: return <p>Unknown step. Please reset the quiz.</p>;
    }
  };

  const getCurrentStepDetails = () => {
    const stepKey = `step${currentStep}` as keyof AllQuizData;
    if (quizData && quizData[stepKey]) {
        return quizData[stepKey];
    }
    return null;
  }

  const stepDetails = getCurrentStepDetails();
  const mainWrapperId = "quiz-page-content-area";

  // Loading screen (new Step 5) has a different layout (full width, centered)
  if (currentStep === 5 && stepDetails) { // New Step 5 is loading
    return (
      <div
        id={mainWrapperId}
        className="w-full max-w-7xl mx-auto px-[10px] pb-8 md:pb-12">
        <div className="animate-fadeIn flex flex-col justify-center items-center">
          {renderStepContent()}
        </div>
      </div>
    );
  }

  if (!stepDetails) {
    return (
      <div
        id={mainWrapperId}
        className="w-full max-w-7xl mx-auto px-[10px] pb-8 md:pb-12 text-center">
          <p className="text-xl text-destructive">Error: Quiz step data not found.</p>
          <p>Please try resetting the quiz or contact support.</p>
      </div>
    );
  }

  return (
    <div
      id={mainWrapperId}
      className="w-full max-w-7xl mx-auto px-[10px] pb-8 md:pb-12"
    >
      {stepDetails && (
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-6 md:sticky md:top-8 text-center md:text-left">
            <h1 className="quiz-question-title">{stepDetails.question}</h1>
            {stepDetails.instruction && stepDetails.instruction.split('\\n').map((line, index, array) => (
              <p key={index} className={cn("quiz-instruction-text", index === 0 && "mt-2", index === array.length -1 && array.length > 1 && "mb-0" )}>
                {line}
              </p>
            ))}
            {/* "Already a member?" section removed as per previous revert */}
          </div>

          <div className={cn(
            "md:col-span-6 animate-fadeIn",
            // Input panel styling was for Step 5 (Name) and 7 (Email), which are removed.
            // If other steps need this specific background, it should be handled differently.
            // For now, removing the condition that applied 'bg-input-panel-bg'.
            "flex flex-col justify-start items-center" 
          )}>
            <div className={cn(
              "w-full"
              // Same as above, removing conditional styling for removed input steps.
            )}>
              {renderStepContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
