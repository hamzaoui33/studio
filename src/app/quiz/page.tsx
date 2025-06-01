
"use client";

import { useQuiz } from "@/context/QuizContext";
import { QuizNavigation } from "./components/QuizNavigation";
import { Step1SwoonWorthy } from "./components/Step1SwoonWorthy";
import { Step2StyleSelection } from "./components/Step2StyleSelection";
import { Step3RoomImprovement } from "./components/Step3RoomImprovement";
import { Step4RoomFocus } from "./components/Step4RoomFocus";
import { Step5Name } from "./components/Step5Name";
import { Step6Greeting } from "./components/Step6Greeting";
import { Step7Email } from "./components/Step7Email";
import { Step8Loading } from "./components/Step8Loading";
// Removed imports for Step5HomeOwnership, Step6HomeType, Step10Budget
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
        // Validation for proceeding is fine if they skip (handled by skip button).
        // If they press Next, it's disabled if no selection, so this won't prevent flow if skip is used.
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
      case 7: // Email Step
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
      case 8: // Loading Step - auto advances & submits
        return true;
      default:
        break;
    }
    return true;
  };
  
  const isNextButtonDisabled = (): boolean => {
    switch (currentStep) {
      case 1: return answers.swoonWorthyRooms.length === 0;
      case 2: return answers.styleSelections.length === 0;
      case 3: return Object.keys(answers.roomImprovementSelections).length === 0;
      case 4:
        const focusOptions = getRoomOptionsForFocusStep();
        return focusOptions.length > 0 && !answers.roomFocusSelection;
      case 5: return !answers.userName.trim();
      case 6: return true; // Greeting step auto-advances
      case 7:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !answers.email.trim() || !emailRegex.test(answers.email);
      case 8: return true; // Loading step auto-advances & submits
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

  if ((currentStep === 6 || currentStep === 8) && stepDetails) { // For full-screen auto-advancing steps
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 pb-28 md:pb-32">
        <div className="h-[calc(100vh-200px)] animate-fadeIn flex flex-col justify-center items-center">
          {renderStepContent()}
        </div>
        <QuizNavigation onNext={validateStep} isNextDisabled={isNextButtonDisabled()} />
      </div>
    );
  }
  
  if (!stepDetails) { 
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 pb-28 md:pb-32 text-center">
            <p className="text-xl text-destructive">Error: Quiz step data not found.</p>
            <p>Please try resetting the quiz or contact support.</p>
        </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 pb-28 md:pb-32">
      {stepDetails && (
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-6 md:sticky md:top-10 md:pr-[82px]">
            <h1 className="quiz-question-title">{stepDetails.question}</h1>
            {stepDetails.instruction && stepDetails.instruction.split('\n').map((line, index, array) => (
              <p key={index} className={cn("quiz-instruction-text", index === 0 && "mt-2", index === array.length -1 && array.length > 1 && (currentStep === 5 || currentStep === 7) && "mb-0" )}>
                {line}
              </p>
            ))}
            {(currentStep === 1 || currentStep === 5 || currentStep === 7) && (
              <div className="mt-6">
                <p className="text-sm text-muted-foreground">Already a member?</p>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-sm font-semibold text-accent hover:underline"
                >
                  Log in
                </a>
              </div>
            )}
          </div>
          <div className={cn(
            "md:col-span-6 animate-fadeIn flex flex-col justify-center items-center",
            (currentStep === 5 || currentStep === 7) && "bg-input-panel-bg rounded-lg p-6 md:p-12 min-h-[250px] md:min-h-[300px] w-full max-w-xl mx-auto"
          )}>
            {renderStepContent()}
          </div>
        </div>
      )}
      <QuizNavigation onNext={validateStep} isNextDisabled={isNextButtonDisabled()} />
    </div>
  );
}
