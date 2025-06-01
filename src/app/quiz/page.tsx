
"use client";

import { useQuiz } from "@/context/QuizContext";
import { QuizNavigation } from "./components/QuizNavigation";
import { Step1SwoonWorthy } from "./components/Step1SwoonWorthy";
import { Step2StyleSelection } from "./components/Step2StyleSelection";
import { Step3RoomImprovement } from "./components/Step3RoomImprovement";
import { Step4RoomFocus } from "./components/Step4RoomFocus";
import { Step5HomeOwnership } from "./components/Step5HomeOwnership";
import { Step6HomeType } from "./components/Step6HomeType";
import { Step7BudgetEmail } from "./components/Step7BudgetEmail";
import { quizData, TOTAL_QUIZ_STEPS } from "@/lib/quiz-data"; // Ensure TOTAL_QUIZ_STEPS is exported or defined here
import { useToast } from "@/hooks/use-toast";
import type { AllQuizData } from "@/types/quiz";


export default function QuizPage() {
  const { currentStep, answers, getRoomOptionsForFocusStep } = useQuiz();
  const { toast } = useToast();

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (answers.swoonWorthyRooms.length === 0) {
          toast({ title: "Selection Required", description: "Please select at least one room image.", variant: "default" });
          return false;
        }
        break;
      case 2:
        if (answers.styleSelections.length === 0) {
          toast({ title: "Selection Required", description: "Please select at least one style.", variant: "default" });
          return false;
        }
        break;
      case 3:
        if (answers.roomImprovementSelections.length === 0) {
          toast({ title: "Selection Required", description: "Please select at least one room to improve.", variant: "default" });
          return false;
        }
        break;
      case 4:
         const focusOptions = getRoomOptionsForFocusStep();
        if (focusOptions.length > 0 && !answers.roomFocusSelection) {
           toast({ title: "Selection Required", description: "Please select a room to focus on.", variant: "default" });
          return false;
        }
        break;
      case 5:
        if (!answers.homeOwnershipStatus) {
          toast({ title: "Selection Required", description: "Please select your home ownership status.", variant: "default" });
          return false;
        }
        break;
      case 6:
        if (!answers.homeTypeSelection) {
          toast({ title: "Selection Required", description: "Please select your home type.", variant: "default" });
          return false;
        }
        break;
      case 7:
        if (!answers.budgetRangeSelection) {
           toast({ title: "Selection Required", description: "Please select a budget range.", variant: "default" });
          return false;
        }
        if (!answers.email) {
           toast({ title: "Email Required", description: "Please enter your email address.", variant: "default" });
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(answers.email)) {
          toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };
  
  const isNextButtonDisabled = (): boolean => {
    switch (currentStep) {
      case 1: return answers.swoonWorthyRooms.length === 0;
      case 2: return answers.styleSelections.length === 0;
      case 3: return answers.roomImprovementSelections.length === 0;
      case 4: return getRoomOptionsForFocusStep().length > 0 && !answers.roomFocusSelection;
      case 5: return !answers.homeOwnershipStatus;
      case 6: return !answers.homeTypeSelection;
      case 7: return !answers.budgetRangeSelection || !answers.email;
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <Step1SwoonWorthy />;
      case 2: return <Step2StyleSelection />;
      case 3: return <Step3RoomImprovement />;
      case 4: return <Step4RoomFocus />;
      case 5: return <Step5HomeOwnership />;
      case 6: return <Step6HomeType />;
      case 7: return <Step7BudgetEmail />;
      default: return <p>Unknown step. Please reset the quiz.</p>;
    }
  };

  const getCurrentStepDetails = () => {
    const stepKey = `step${currentStep}` as keyof AllQuizData;
    return quizData[stepKey];
  }
  
  const stepDetails = getCurrentStepDetails();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Magenta divider bar appears *before* the new step content */}
      {currentStep > 1 && <div className="quiz-step-divider mb-10 md:mb-16"></div>}

      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Left Column: Step Info & Question (spans 4 out of 12 columns on md+) */}
        <div className="md:col-span-4 lg:col-span-3 md:sticky md:top-10">
          <span className="quiz-step-indicator-text">Step {currentStep}</span>
          {stepDetails && (
            <>
              <h1 className="quiz-question-title">{stepDetails.question}</h1>
              <p className="quiz-instruction-text">{stepDetails.instruction}</p>
            </>
          )}
        </div>

        {/* Right Column: Step Options/Content (spans 8 out of 12 columns on md+) */}
        <div className="md:col-span-8 lg:col-span-9 animate-fadeIn">
          {renderStepContent()}
        </div>
      </div>

      <QuizNavigation onNext={validateStep} isNextDisabled={isNextButtonDisabled()} />
    </div>
  );
}
