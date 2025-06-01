
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
import { Step8Loading } from "./components/Step8Loading"; // New Loading Step
import { Step5HomeOwnership } from "./components/Step5HomeOwnership"; 
import { Step6HomeType } from "./components/Step6HomeType"; 
import { Step10Budget } from "./components/Step10Budget"; 
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
      case 8: // Loading Step - auto advances
        return true;
      case 9: // Was Step 8 (Home Ownership)
        if (!answers.homeOwnershipStatus) {
          toast({ title: "Selection Required", description: "Please select your home ownership status.", variant: "default" });
          return false;
        }
        break;
      case 10: // Was Step 9 (Home Type)
        if (!answers.homeTypeSelection) {
          toast({ title: "Selection Required", description: "Please select your home type.", variant: "default" });
          return false;
        }
        break;
      case 11: // Was Step 10 (Budget)
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
      case 7: 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !answers.email.trim() || !emailRegex.test(answers.email);
      case 8: return true; // Loading step auto-advances
      case 9: return !answers.homeOwnershipStatus; 
      case 10: return !answers.homeTypeSelection; 
      case 11: return !answers.budgetRangeSelection; 
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
      case 9: return <Step5HomeOwnership />; // Renamed to map to original component
      case 10: return <Step6HomeType />; // Renamed to map to original component
      case 11: return <Step10Budget />; // Renamed to map to original component
      default: return <p>Unknown step. Please reset the quiz.</p>;
    }
  };

  const getCurrentStepDetails = () => {
    const stepKey = `step${currentStep}` as keyof AllQuizData;
    return quizData[stepKey];
  }
  
  const stepDetails = getCurrentStepDetails();

  // Layout for Greeting (6) & Loading (8) steps - Full width, centered content
  if ((currentStep === 6 || currentStep === 8) && stepDetails) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 pb-28 md:pb-32">
        <div className="h-[calc(100vh-200px)] animate-fadeIn flex flex-col justify-center items-center">
          {renderStepContent()}
        </div>
        <QuizNavigation onNext={validateStep} isNextDisabled={isNextButtonDisabled()} />
      </div>
    );
  }

  // Default layout for all other steps, including 5 and 7
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 pb-28 md:pb-32">
      {stepDetails && (
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-6 md:sticky md:top-10 md:pr-[82px]">
            <h1 className="quiz-question-title">{stepDetails.question}</h1>
            {stepDetails.instruction && stepDetails.instruction.split('\n').map((line, index, array) => (
              <p key={index} className={cn("quiz-instruction-text", index === 0 && "mt-2", index === array.length -1 && array.length > 1 && (currentStep === 7 || currentStep === 5) && "mb-0" )}>
                {/* Special handling for "Log in" link on Step 7 */}
                {currentStep === 7 && line.toLowerCase().includes("log in") ? (
                  <>
                    {line.substring(0, line.toLowerCase().indexOf("log in"))}
                    <a href="#" className="font-semibold text-accent hover:underline" onClick={(e) => e.preventDefault()}>
                      Log in
                    </a>
                    {line.substring(line.toLowerCase().indexOf("log in") + "log in".length)}
                  </>
                ) : (
                  line
                )}
              </p>
            ))}
          </div>
          <div className={cn(
            "md:col-span-6 animate-fadeIn flex flex-col justify-center items-center",
            (currentStep === 5 || currentStep === 7) && "bg-input-panel-bg rounded-lg p-6 md:p-12 min-h-[200px] md:min-h-[250px]"
          )}>
            {renderStepContent()}
          </div>
        </div>
      )}
      <QuizNavigation onNext={validateStep} isNextDisabled={isNextButtonDisabled()} />
    </div>
  );
}
