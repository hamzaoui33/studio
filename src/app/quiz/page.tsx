
"use client";

import { useQuiz } from "@/context/QuizContext";
import { QuizNavigation } from "./components/QuizNavigation";
import { Step1SwoonWorthy } from "./components/Step1SwoonWorthy";
import { Step2StyleSelection } from "./components/Step2StyleSelection";
import { Step3RoomImprovement } from "./components/Step3RoomImprovement";
import { Step4RoomFocus } from "./components/Step4RoomFocus";
import { Step5Name } from "./components/Step5Name";
import { Step6Greeting } from "./components/Step6Greeting";
import { Step7Email } from "./components/Step7Email"; // New Email Step
import { Step5HomeOwnership } from "./components/Step5HomeOwnership"; // Component for original step 5, now quizData.step8
import { Step6HomeType } from "./components/Step6HomeType"; // Component for original step 6, now quizData.step9
import { Step10Budget } from "./components/Step10Budget"; // Renamed from Step7BudgetEmail, now quizData.step10
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
      case 5: // Name Step
        if (!answers.userName.trim()) {
          toast({ title: "Name Required", description: "Please enter your name.", variant: "default" });
          return false;
        }
        break;
      case 6: // Greeting Step - auto advances
        return true;
      case 7: // New Email Step
        if (!answers.email.trim()) {
          toast({ title: "Email Required", description: "Please enter your email address.", variant: "default" });
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(answers.email)) {
          toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
          return false;
        }
        break;
      case 8: // Was Step 7 (Home Ownership)
        if (!answers.homeOwnershipStatus) {
          toast({ title: "Selection Required", description: "Please select your home ownership status.", variant: "default" });
          return false;
        }
        break;
      case 9: // Was Step 8 (Home Type)
        if (!answers.homeTypeSelection) {
          toast({ title: "Selection Required", description: "Please select your home type.", variant: "default" });
          return false;
        }
        break;
      case 10: // Was Step 9 (Budget & Email), now only Budget
        if (!answers.budgetRangeSelection) {
           toast({ title: "Selection Required", description: "Please select a budget range.", variant: "default" });
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
      case 5: return !answers.userName.trim();
      case 6: return true; // Greeting step auto-advances
      case 7: // New Email Step
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !answers.email.trim() || !emailRegex.test(answers.email);
      case 8: return !answers.homeOwnershipStatus; // Was Step 7
      case 9: return !answers.homeTypeSelection; // Was Step 8
      case 10: return !answers.budgetRangeSelection; // Was Step 9, now only budget
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <Step1SwoonWorthy />;
      case 2: return <Step2StyleSelection />;
      case 3: return <Step3RoomImprovement />;
      case 4: return <Step4RoomFocus />;
      case 5: return <Step5Name />;
      case 6: return <Step6Greeting />;
      case 7: return <Step7Email />; // New Email Step
      case 8: return <Step5HomeOwnership />; // Component for quizData.step8 (original step 5)
      case 9: return <Step6HomeType />; // Component for quizData.step9 (original step 6)
      case 10: return <Step10Budget />; // Component for quizData.step10 (original step 7 - budget part)
      default: return <p>Unknown step. Please reset the quiz.</p>;
    }
  };

  const getCurrentStepDetails = () => {
    const stepKey = `step${currentStep}` as keyof AllQuizData;
    return quizData[stepKey];
  }
  
  const stepDetails = getCurrentStepDetails();

  const showStepDetails = currentStep !== 6 && stepDetails; // Greeting step (6) handles its own content

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 pb-28 md:pb-32">
      <div className={cn(
          "grid md:grid-cols-12 gap-8 md:gap-12 items-start",
          (currentStep === 6 || currentStep === 5 || currentStep === 7 ) && "md:grid-cols-1" // Full width for greeting, name, and email input steps
        )}
      >
        {showStepDetails && (
          <div className={cn("md:col-span-6 md:sticky md:top-10 md:pr-[82px]",
            (currentStep === 5 || currentStep === 7) && "hidden" // Hide left column for name and email input steps
          )}>
            <h1 className="quiz-question-title">{stepDetails.question}</h1>
            <p className="quiz-instruction-text">{stepDetails.instruction}</p>
          </div>
        )}

        {/* Special layout for name and email input steps */}
        {(currentStep === 5 || currentStep === 7) && stepDetails && (
          <div className="md:col-span-12 flex flex-col items-center"> {/* Centering column for the panel */}
             <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-[82px]"> {/* Mimic left column style */}
                <h1 className="quiz-question-title">{stepDetails.question}</h1>
                <p className="quiz-instruction-text">{stepDetails.instruction}</p>
             </div>
             <div className="w-full md:w-1/2 animate-fadeIn flex flex-col justify-center items-center">
                {renderStepContent()}
            </div>
          </div>
        )}

        {/* Default layout for other steps */}
        {currentStep !== 5 && currentStep !== 6 && currentStep !== 7 && (
           <div className={cn(
            "md:col-span-6 animate-fadeIn flex flex-col justify-center items-center"
          )}
        >
          {renderStepContent()}
        </div>
        )}

        {/* Greeting Step specific layout */}
        {currentStep === 6 && (
           <div className="md:col-span-12 h-[calc(100vh-200px)] animate-fadeIn flex flex-col justify-center items-center">
             {renderStepContent()}
           </div>
        )}
      </div>
      <QuizNavigation onNext={validateStep} isNextDisabled={isNextButtonDisabled()} />
    </div>
  );
}
