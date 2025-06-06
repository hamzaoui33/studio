
"use client";

import { useState, useEffect } from 'react';
import { useQuiz } from "@/context/QuizContext";
import { Step1SwoonWorthy } from "./components/Step1SwoonWorthy";
import { Step2StyleSelection } from "./components/Step2StyleSelection";
import { Step3ColorMood } from "./components/Step3ColorMood"; // New Step
import { Step4MaterialDetail } from "./components/Step4MaterialDetail"; // New Step
import { Step3RoomImprovement as Step5RoomImprovement } from "./components/Step3RoomImprovement"; // Renamed import
import { Step4RoomFocus as Step6RoomFocus } from "./components/Step4RoomFocus"; // Renamed import
import { Step8Loading as Step7Loading } from "./components/Step8Loading"; // Renamed import
import { quizData } from "@/lib/quiz-data";
import type { AllQuizData } from "@/types/quiz";
import { cn } from "@/lib/utils";
import { useIframeResizer } from '@/hooks/useIframeResizer';


export default function QuizPage() {
  const { currentStep, answers } = useQuiz();
  useIframeResizer([currentStep, answers]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <Step1SwoonWorthy />;
      case 2: return <Step2StyleSelection />;
      case 3: return <Step3ColorMood />; // New
      case 4: return <Step4MaterialDetail />; // New
      case 5: return <Step5RoomImprovement />; // Old Step 3
      case 6: return <Step6RoomFocus />; // Old Step 4
      case 7: return <Step7Loading />; // Old Step 5 (Loading)
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

  // Loading screen (new Step 7) has a different layout
  if (currentStep === 7 && stepDetails) { // New Step 7 is loading
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
          </div>

          <div className={cn(
            "md:col-span-6 animate-fadeIn",
            "flex flex-col justify-start items-center"
          )}>
            <div className={cn("w-full")}>
              {renderStepContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
