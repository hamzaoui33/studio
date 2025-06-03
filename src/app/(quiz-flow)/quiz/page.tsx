
"use client";

import { useState, useEffect } from 'react'; 
import { useQuiz } from "@/context/QuizContext";
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

// IMPORTANT: For security, replace '*' with your WordPress site's specific origin.
// This is the origin that is ALLOWED to send 'userLoginStatus' messages to this iframe.
const PARENT_SITE_EXPECTED_ORIGIN = '*'; // FIXME: Replace '*' with your actual WordPress domain, e.g., 'https://aveladecor.com'

export default function QuizPage() {
  const { currentStep, answers } = useQuiz();
  const [isUserLoggedInOnParent, setIsUserLoggedInOnParent] = useState(false); 

  useIframeResizer([currentStep, answers, isUserLoggedInOnParent]);

  useEffect(() => {
    const handleMessageFromParent = (event: MessageEvent) => {
      if (PARENT_SITE_EXPECTED_ORIGIN !== '*' && event.origin !== PARENT_SITE_EXPECTED_ORIGIN) {
        // console.warn('QuizPage: Message received from untrusted origin:', event.origin, 'Expected:', PARENT_SITE_EXPECTED_ORIGIN);
        return;
      }
      // Fallback for development if '*' is used.
      if (PARENT_SITE_EXPECTED_ORIGIN === '*' && event.origin === window.location.origin) {
        // console.warn('QuizPage: Ignoring message from same origin when PARENT_SITE_EXPECTED_ORIGIN is "*". This is likely a development setup or misconfiguration.');
        // return; 
      }

      if (event.data && event.data.type === 'userLoginStatus') {
        if (typeof event.data.isLoggedIn === 'boolean') {
          setIsUserLoggedInOnParent(event.data.isLoggedIn);
        }
      }
    };

    window.addEventListener('message', handleMessageFromParent);
    return () => {
      window.removeEventListener('message', handleMessageFromParent);
    };
  }, []); 

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

  const handleLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetUrl = 'https://aveladecor.com/login/'; 
    if (window.top) {
      // Try to navigate the top-level window (WordPress page)
      try {
        window.top.location.href = targetUrl;
      } catch (error) {
        // Fallback if cross-origin restrictions prevent top-level navigation
        // (though less likely if origins are managed correctly)
        console.warn("Could not navigate top window, attempting self navigation:", error);
        window.location.href = targetUrl;
      }
    } else {
      // Fallback if not in an iframe
      window.location.href = targetUrl;
    }
  };

  if ((currentStep === 6 || currentStep === 8) && stepDetails) {
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

  // Determine if the login prompt should be shown for the current step
  const showLoginPrompt = !isUserLoggedInOnParent && (currentStep === 1 || currentStep === 5 || currentStep === 7);

  return (
    <div
      id={mainWrapperId}
      className="w-full max-w-7xl mx-auto px-[10px] pb-8 md:pb-12"
    >
      {stepDetails && (
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Text content area: centered on mobile, left-aligned on desktop */}
          <div className="md:col-span-6 md:sticky md:top-8 text-center md:text-left">
            <h1 className="quiz-question-title">{stepDetails.question}</h1>
            {stepDetails.instruction && stepDetails.instruction.split('\\n').map((line, index, array) => (
              <p key={index} className={cn("quiz-instruction-text", index === 0 && "mt-2", index === array.length -1 && array.length > 1 && "mb-0" )}>
                {line}
              </p>
            ))}
             {/* Conditionally render login section if user is NOT logged in on parent and on specific steps */}
             {showLoginPrompt && (
              <div className="mt-6 text-center md:text-left">
                <p className="text-sm text-muted-foreground">Already a member?</p>
                <a
                  href="https://aveladecor.com/login/" 
                  onClick={handleLoginClick}
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
  );
}
