
"use client";

import { useQuiz } from "@/context/QuizContext";
import { QuizNavigation } from "./components/QuizNavigation";
import { Step1SwoonWorthy } from "./components/Step1SwoonWorthy";
import { Step2StyleSelection } from "./components/Step2StyleSelection";
import { Step3RoomImprovement } from "./components/Step3RoomImprovement";
import { Step4RoomFocus } from "./components/Step4RoomFocus";
import { Step5Name } from "./components/Step5Name"; // New Step
import { Step5HomeOwnership } from "./components/Step5HomeOwnership"; // Renamed to Step6HomeOwnership for component file, logic will point to step 6
import { Step6HomeType } from "./components/Step6HomeType"; // Renamed to Step7HomeType
import { Step7BudgetEmail } from "./components/Step7BudgetEmail"; // Renamed to Step8BudgetEmail
import { quizData } from "@/lib/quiz-data"; 
import { useToast } from "@/hooks/use-toast";
import type { AllQuizData } from "@/types/quiz";
import { cn } from "@/lib/utils";


export default function QuizPage() {
  const { currentStep, answers, getRoomOptionsForFocusStep } = useQuiz();
  const { toast } = useToast();

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        // No validation needed if user can skip
        break;
      case 2:
        if (answers.styleSelections.length === 0) {
          toast({ title: "Selection Required", description: "Please select at least one style.", variant: "default" });
          return false;
        }
        break;
      case 3:
        if (Object.keys(answers.roomImprovementSelections).length === 0) {
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
      case 5: // New Name Step
        if (!answers.userName.trim()) {
          toast({ title: "Name Required", description: "Please enter your name.", variant: "default" });
          return false;
        }
        break;
      case 6: // Was Step 5 (Home Ownership)
        if (!answers.homeOwnershipStatus) {
          toast({ title: "Selection Required", description: "Please select your home ownership status.", variant: "default" });
          return false;
        }
        break;
      case 7: // Was Step 6 (Home Type)
        if (!answers.homeTypeSelection) {
          toast({ title: "Selection Required", description: "Please select your home type.", variant: "default" });
          return false;
        }
        break;
      case 8: // Was Step 7 (Budget & Email)
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
      case 1: return false; 
      case 2: return answers.styleSelections.length === 0;
      case 3: return Object.keys(answers.roomImprovementSelections).length === 0;
      case 4: 
        const focusOptions = getRoomOptionsForFocusStep();
        return focusOptions.length > 0 && !answers.roomFocusSelection;
      case 5: return !answers.userName.trim(); // New Name Step
      case 6: return !answers.homeOwnershipStatus; // Was Step 5
      case 7: return !answers.homeTypeSelection; // Was Step 6
      case 8: return !answers.budgetRangeSelection || !answers.email; // Was Step 7
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <Step1SwoonWorthy />;
      case 2: return <Step2StyleSelection />;
      case 3: return <Step3RoomImprovement />;
      case 4: return <Step4RoomFocus />;
      case 5: return <Step5Name />; // New Step
      case 6: return <Step5HomeOwnership />; // Component for original step 5
      case 7: return <Step6HomeType />; // Component for original step 6
      case 8: return <Step7BudgetEmail />; // Component for original step 7
      default: return <p>Unknown step. Please reset the quiz.</p>;
    }
  };

  const getCurrentStepDetails = () => {
    // Adjust step key mapping due to new step insertion
    const stepKey = `step${currentStep}` as keyof AllQuizData;
    return quizData[stepKey];
  }
  
  const stepDetails = getCurrentStepDetails();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 pb-28 md:pb-32">
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className={cn(
          "md:col-span-6 md:sticky md:top-10 md:pr-[82px]",
          currentStep === 5 && "bg-input-panel-bg rounded-lg p-6 md:p-10" // Conditional panel styling for left column in Step 5
        )}>
          {stepDetails && (
            <>
              <h1 className="quiz-question-title">{stepDetails.question}</h1>
              <p className="quiz-instruction-text">{stepDetails.instruction}</p>
            </>
          )}
        </div>
        <div className="md:col-span-6 animate-fadeIn flex flex-col justify-center items-center">
          {renderStepContent()}
        </div>
      </div>
      <QuizNavigation onNext={validateStep} isNextDisabled={isNextButtonDisabled()} />
    </div>
  );
}
