"use client";

import { useQuiz } from "@/context/QuizContext";
// import { QuizProgressBar } from "./components/QuizProgressBar"; // Removed import
import { QuizNavigation } from "./components/QuizNavigation";
import { Step1SwoonWorthy } from "./components/Step1SwoonWorthy";
import { Step2StyleSelection } from "./components/Step2StyleSelection";
import { Step3RoomImprovement } from "./components/Step3RoomImprovement";
import { Step4RoomFocus } from "./components/Step4RoomFocus";
import { Step5HomeOwnership } from "./components/Step5HomeOwnership";
import { Step6HomeType } from "./components/Step6HomeType";
import { Step7BudgetEmail } from "./components/Step7BudgetEmail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { quizData } from "@/lib/quiz-data";
import { useToast } from "@/hooks/use-toast";

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
        } else if (focusOptions.length === 0 && !answers.roomFocusSelection) {
          // If no options, effectively this step is skipped for validation if no selection possible.
          // But QuizNavigation will try to submit if it's the last step.
          // If step 3 selections lead to no options for step 4, then step 4 is 'valid' if nothing can be selected.
          // But the submit logic needs a focus room. This scenario means step 3 must be revisited.
          // For now, the UI in Step4RoomFocus handles this with an Alert.
          // If user somehow skips past that, this could be an issue.
          // This path should ideally not be reachable if Step4RoomFocus shows an alert and navigation prevents proceeding.
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
      case 7: return !answers.budgetRangeSelection || !answers.email; // Handled by QuizNavigation submit logic
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

  const getCurrentStepTitle = () => {
    const stepKey = `step${currentStep}` as keyof typeof quizData;
    return quizData[stepKey]?.title || "DecorStyle Quiz";
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl rounded-lg">
        <CardHeader className="border-b">
          <CardTitle className="font-headline text-2xl text-primary text-center">
            {getCurrentStepTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          {/* <QuizProgressBar /> */} {/* Removed QuizProgressBar component */}
          {renderStepContent()}
          <QuizNavigation onNext={validateStep} isNextDisabled={isNextButtonDisabled()} />
        </CardContent>
      </Card>
    </div>
  );
}
