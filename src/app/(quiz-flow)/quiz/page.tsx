
"use client";

import { useQuiz } from "@/context/QuizContext";
// QuizNavigation import removed as it's no longer used
import { Step1SwoonWorthy } from "./components/Step1SwoonWorthy";
import { Step2StyleSelection } from "./components/Step2StyleSelection";
import { Step3RoomImprovement } from "./components/Step3RoomImprovement";
import { Step4RoomFocus } from "./components/Step4RoomFocus";
import { Step5Name } from "./components/Step5Name";
import { Step6Greeting } from "./components/Step6Greeting";
import { Step7Email } from "./components/Step7Email";
import { Step8Loading } from "./components/Step8Loading";
import { quizData } from "@/lib/quiz-data";
import type { AllQuizData } from "@/types/quiz";
import { cn } from "@/lib/utils";
import { useIframeResizer } from '@/hooks/useIframeResizer';


export default function QuizPage() {
  const { currentStep, answers, triggerNextStepFlow, isNextActionDisabled } = useQuiz();

  useIframeResizer([currentStep, answers]); 

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <Step1SwoonWorthy />;
      case 2: return <Step2StyleSelection />;
      case 3: return <Step3RoomImprovement />;
      case 4: return <Step4RoomFocus />;
      case 5: return <Step5Name />;
      case 6: return <Step6Greeting />;
      case 7: return <Step7Email />;
      case 8: return <Step8Loading />;
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

  if ((currentStep === 6 || currentStep === 8) && stepDetails) { 
    return (
      <div 
        id={mainWrapperId} 
        // Removed top padding (pt-28 md:pt-32) as QuizNavigation is removed
        className="w-full max-w-7xl mx-auto px-[15px] pb-8 md:pb-12"> 
        <div className="animate-fadeIn flex flex-col justify-center items-center">
          {renderStepContent()}
        </div>
      </div>
      // QuizNavigation component removed
    );
  }
  
  if (!stepDetails) { 
    return (
      <div 
        id={mainWrapperId}
        // Removed top padding
        className="w-full max-w-7xl mx-auto px-[15px] pb-8 md:pb-12 text-center">
          <p className="text-xl text-destructive">Error: Quiz step data not found.</p>
          <p>Please try resetting the quiz or contact support.</p>
      </div>
      // QuizNavigation component removed
    );
  }

  return (
    <div 
      id={mainWrapperId}
      // Removed top padding
      className="w-full max-w-7xl mx-auto px-[15px] pb-8 md:pb-12"
    >
      {stepDetails && (
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-6 md:sticky md:top-8">  {/* Adjusted sticky top if needed */}
            <h1 className="quiz-question-title">{stepDetails.question}</h1>
            {stepDetails.instruction && stepDetails.instruction.split('\n').map((line, index, array) => (
              <p key={index} className={cn("quiz-instruction-text", index === 0 && "mt-2", index === array.length -1 && array.length > 1 && "mb-0" )}>
                {line}
              </p>
            ))}
             {(currentStep === 1 || currentStep === 5 || currentStep === 7) && (
              <div className="mt-6">
                <p className="text-sm text-muted-foreground">Already a member?</p>
                <a
                  href="#"
                  onClick={(e) => {e.preventDefault(); /* Implement login logic or navigation */}}
                  className="text-sm font-semibold text-accent hover:underline"
                >
                  Log in
                </a>
              </div>
            )}
          </div>
          
          <div className={cn(
            "md:col-span-6 animate-fadeIn",
            (currentStep === 5 || currentStep === 7) 
              ? "bg-input-panel-bg rounded-lg p-6 md:p-12 w-full max-w-xl mx-auto flex flex-col items-center justify-center"
              : "flex flex-col justify-start items-center" 
          )}>
            <div className={cn(
              "w-full",
               (currentStep === 5 || currentStep === 7) && "flex flex-col justify-center items-center"
            )}>
              {renderStepContent()}
            </div>
          </div>
        </div>
      )}
    </div>
    // QuizNavigation component removed
  );
}
