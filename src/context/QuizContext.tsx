
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { type QuizAnswers, type RoomImprovementSelection } from '@/types/quiz';
import { quizData, TOTAL_QUIZ_STEPS, type AllQuizData } from '@/lib/quiz-data';
import { useRouter } from 'next/navigation';
import type { GenerateStyleGuideInput } from '@/ai/flows/generate-style-guide';
import { useToast } from "@/hooks/use-toast";

// IMPORTANT: For production, replace '*' with your WordPress site's specific origin for security.
// Example: const PARENT_WORDPRESS_ORIGIN = 'https://aveladecor.com';
const PARENT_WORDPRESS_ORIGIN = '*'; // This is for quizButtonStateUpdate and triggerQuizNextStep

const initialAnswers: QuizAnswers = {
  swoonWorthyRooms: [],
  styleSelections: [],
  roomImprovementSelections: {},
  roomFocusSelection: '',
  userName: '',
  email: '',
};

interface QuizContextType {
  currentStep: number;
  answers: QuizAnswers;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading: boolean;
  goToStep: (step: number) => void;
  updateAnswer: <K extends keyof QuizAnswers>(field: K, value: QuizAnswers[K]) => void;
  handleQuizSubmit: () => Promise<string | null>;
  resetQuiz: () => void;
  getRoomOptionsForFocusStep: () => Array<{ id: string; name: string; icon?: any }>;
  triggerNextStepFlow: () => Promise<boolean>;
  isNextActionDisabled: () => boolean;
  internalNextStep: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [isLoading, setIsLoading] = useState(false);
  // Removed isUserConsideredLoggedInForSkip state
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [currentStep]);

  const updateAnswer = useCallback(<K extends keyof QuizAnswers>(field: K, value: QuizAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= TOTAL_QUIZ_STEPS) {
      setCurrentStep(step);
    }
  }, []);

  const internalNextStep = useCallback(() => {
    let nextStepNumber = currentStep + 1;

    if (currentStep === 3) {
      const selectedRoomIds = Object.keys(answers.roomImprovementSelections);
      const isOnlyOtherSelected = selectedRoomIds.length === 1 && selectedRoomIds[0] === 'other';
      const isOnlyNotSureYetSelected = selectedRoomIds.length === 1 && selectedRoomIds[0] === 'not_sure_yet';

      if (isOnlyOtherSelected || isOnlyNotSureYetSelected) {
        nextStepNumber = 5;
      }
    }

    // Removed skip logic related to isUserConsideredLoggedInForSkip

    if (nextStepNumber <= TOTAL_QUIZ_STEPS) {
      goToStep(nextStepNumber);
    }
  }, [currentStep, answers.roomImprovementSelections, goToStep]);

  const getRoomOptionsForFocusStep = useCallback(() => {
    const selectedRoomIds = Object.keys(answers.roomImprovementSelections)
                              .filter(id => id !== 'other' && id !== 'not_sure_yet');

    const allStandardRoomOptions = quizData.step3.options.filter(
      option => option.id !== 'other' && option.id !== 'not_sure_yet'
    );

    if (!selectedRoomIds || selectedRoomIds.length === 0) {
      return allStandardRoomOptions;
    }

    return allStandardRoomOptions.filter(option => selectedRoomIds.includes(option.id));
  }, [answers.roomImprovementSelections]);

  const validateCurrentStep = useCallback((): boolean => {
    // Removed validation bypass for logged-in users
    switch (currentStep) {
      case 1:
        if (answers.swoonWorthyRooms.length === 0) {
          toast({ title: "Selection Required", description: "Please select at least one image to continue.", variant: "default" });
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
      case 5:
        if (!answers.userName.trim()) {
          toast({ title: "Name Required", description: "Please enter your name.", variant: "default" });
          return false;
        }
        break;
      case 6:
        return true; // Auto-advancing step
      case 7:
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
      case 8:
        return true; // Loading step
      default:
        break;
    }
    return true;
  }, [currentStep, answers, toast, getRoomOptionsForFocusStep]);

  const isNextActionDisabled = useCallback((): boolean => {
    if (isLoading) return true;

    // Removed checks related to isUserConsideredLoggedInForSkip
    if (currentStep === 6) return true; // Auto-advancing, disable manual next
    if (currentStep === 8) return true; // Loading, disable manual next

    switch (currentStep) {
      case 1: return answers.swoonWorthyRooms.length === 0;
      case 2: return answers.styleSelections.length === 0;
      case 3: return Object.keys(answers.roomImprovementSelections).length === 0;
      case 4:
        const focusOptions = getRoomOptionsForFocusStep();
        return focusOptions.length > 0 && !answers.roomFocusSelection;
      case 5: return !answers.userName.trim();
      case 7:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !answers.email.trim() || !emailRegex.test(answers.email);
      default: return false;
    }
  }, [currentStep, answers, isLoading, getRoomOptionsForFocusStep]);

  const triggerNextStepFlow = useCallback(async (): Promise<boolean> => {
    // Removed skip logic based on isUserConsideredLoggedInForSkip
    const canProceed = validateCurrentStep();
    if (canProceed) {
      internalNextStep();
    }
    return canProceed;
  }, [validateCurrentStep, internalNextStep]);

  const resetQuiz = useCallback(() => {
    setCurrentStep(1);
    setAnswers(initialAnswers);
    // Removed setIsUserConsideredLoggedInForSkip(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem('styleGuideResult');
    }
  }, []);

  const handleQuizSubmit = async (): Promise<string | null> => {
    setIsLoading(true);
    try {
      const { generateStyleGuide } = await import('@/ai/flows/generate-style-guide');

      const aiInput: GenerateStyleGuideInput = {
        swoonWorthyRooms: answers.swoonWorthyRooms,
        styleSelections: answers.styleSelections,
        roomImprovementSelections: answers.roomImprovementSelections,
        roomFocusSelection: answers.roomFocusSelection,
        userName: answers.userName || "Valued Customer",
      };

      const result = await generateStyleGuide(aiInput);
      if (typeof window !== "undefined") {
        localStorage.setItem('styleGuideResult', result.styleGuide);
      }
      setIsLoading(false);
      return result.styleGuide;
    } catch (error) {
      console.error("Error generating style guide:", error);
      setIsLoading(false);
      toast({
        title: "Submission Error",
        description: "There was an issue generating your style guide. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  };

  useEffect(() => {
    const handleMessageFromParent = (event: MessageEvent) => {
      if (PARENT_WORDPRESS_ORIGIN !== '*' && event.origin !== PARENT_WORDPRESS_ORIGIN) {
        // console.warn('QuizContext: Message received from untrusted origin:', event.origin, "Expected:", PARENT_WORDPRESS_ORIGIN);
        return;
      }
      if (PARENT_WORDPRESS_ORIGIN === '*' && event.origin === window.location.origin) {
        // console.warn('QuizContext: Ignoring message from same origin when PARENT_WORDPRESS_ORIGIN is "*".');
        // return;
      }

      if (event.data && event.data.type === 'triggerQuizNextStep') {
        triggerNextStepFlow();
      }
      // Removed listeners for 'userLoginStatus' and 'userData'
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('message', handleMessageFromParent);
      // Inform parent about initial button state
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'quizButtonStateUpdate', isDisabled: isNextActionDisabled() }, PARENT_WORDPRESS_ORIGIN);
      }
      return () => {
        window.removeEventListener('message', handleMessageFromParent);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerNextStepFlow, updateAnswer, isNextActionDisabled]); // updateAnswer was in deps before, keeping it.

  useEffect(() => {
    if (typeof window !== 'undefined' && window.parent !== window) {
      const isDisabled = isNextActionDisabled();
      window.parent.postMessage({ type: 'quizButtonStateUpdate', isDisabled: isDisabled }, PARENT_WORDPRESS_ORIGIN);
    }
  }, [currentStep, answers, isLoading, isNextActionDisabled]); // Removed isUserConsideredLoggedInForSkip from deps

  return (
    <QuizContext.Provider
      value={{
        currentStep,
        answers,
        isFirstStep: currentStep === 1,
        isLastStep: currentStep === TOTAL_QUIZ_STEPS,
        isLoading,
        goToStep,
        updateAnswer,
        handleQuizSubmit,
        resetQuiz,
        getRoomOptionsForFocusStep,
        triggerNextStepFlow,
        isNextActionDisabled,
        internalNextStep,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
