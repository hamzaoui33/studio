
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { type QuizAnswers, type RoomImprovementSelection, type IconTextOption } from '@/types/quiz';
import { quizData, TOTAL_QUIZ_STEPS } from '@/lib/quiz-data';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

const PARENT_WORDPRESS_ORIGIN = '*';

const initialAnswers: QuizAnswers = {
  swoonWorthyRooms: [],
  styleSelections: [],
  colorMoodSelection: '',
  materialDetailSelections: [],
  roomImprovementSelections: {},
  roomFocusSelection: '',
};

const QUIZ_RESULT_STORAGE_KEY = 'decorStyleQuizResult';

// This interface is now simplified as we no longer get complex output from an AI
interface StoredQuizData {
  styleCategory: string; // Just the category name, e.g., "modern"
  userSelections: {
    colorMoodSelection?: string;
    materialDetailSelections?: string[];
    roomFocusSelection?: string;
  };
}


interface QuizContextType {
  currentStep: number;
  answers: QuizAnswers;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading: boolean;
  goToStep: (step: number) => void;
  updateAnswer: <K extends keyof QuizAnswers>(field: K, value: QuizAnswers[K]) => void;
  handleQuizSubmit: () => void; // No longer returns a promise
  resetQuiz: () => void;
  triggerNextStepFlow: () => Promise<boolean>;
  isNextActionDisabled: () => boolean;
  internalNextStep: () => void;
  getRoomOptionsForFocusStep: () => IconTextOption[];
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [isLoading, setIsLoading] = useState(false);
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

  const getRoomOptionsForFocusStep = useCallback((): IconTextOption[] => {
    const selectedRoomIds = Object.keys(answers.roomImprovementSelections);
    if (!quizData.step5 || !quizData.step5.options) return [];

    return quizData.step5.options.filter(option =>
      selectedRoomIds.includes(option.id) &&
      option.id !== 'other' &&
      option.id !== 'not_sure_yet'
    );
  }, [answers.roomImprovementSelections]);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= TOTAL_QUIZ_STEPS) {
      setCurrentStep(step);
    }
  }, []);

  const internalNextStep = useCallback(() => {
    let nextStepNumber = currentStep + 1;

    if (currentStep === 5 && nextStepNumber === 6) {
      const focusOptions = getRoomOptionsForFocusStep();
      if (focusOptions.length === 0) {
        nextStepNumber = 7; 
      }
    }

    if (nextStepNumber <= TOTAL_QUIZ_STEPS) {
      goToStep(nextStepNumber);
    }
  }, [currentStep, goToStep, getRoomOptionsForFocusStep]);


  const validateCurrentStep = useCallback((): boolean => {
    switch (currentStep) {
      case 1:
        if (answers.swoonWorthyRooms.length === 0) {
          toast({ title: "Selection Required", description: "Please select at least one image.", variant: "default" });
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
        if (answers.colorMoodSelection === '') {
          toast({ title: "Selection Required", description: "Please select a color and mood preference.", variant: "default" });
          return false;
        }
        break;
      case 4:
        if (answers.materialDetailSelections.length === 0) {
          toast({ title: "Selection Required", description: "Please select at least one material/detail.", variant: "default" });
          return false;
        }
        break;
      case 5: 
        if (Object.keys(answers.roomImprovementSelections).length === 0) {
          toast({ title: "Selection Required", description: "Please select at least one room you'd like to improve.", variant: "default" });
          return false;
        }
        break;
      case 6: 
        if (answers.roomFocusSelection === '') {
          toast({ title: "Selection Required", description: "Please select one room to focus on.", variant: "default" });
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  }, [currentStep, answers, toast]);

  const isNextActionDisabled = useCallback((): boolean => {
    if (isLoading) return true;
    if (currentStep === TOTAL_QUIZ_STEPS) return true; 

    switch (currentStep) {
      case 1: return answers.swoonWorthyRooms.length === 0;
      case 2: return answers.styleSelections.length === 0;
      case 3: return answers.colorMoodSelection === '';
      case 4: return answers.materialDetailSelections.length === 0;
      case 5: return Object.keys(answers.roomImprovementSelections).length === 0;
      case 6: return answers.roomFocusSelection === '';
      default: return false;
    }
  }, [currentStep, answers, isLoading]);


  const triggerNextStepFlow = useCallback(async (): Promise<boolean> => {
    const canProceed = validateCurrentStep();
    if (canProceed) {
      internalNextStep();
    }
    return canProceed;
  }, [validateCurrentStep, internalNextStep]);


  const resetQuiz = useCallback(() => {
    setCurrentStep(1);
    setAnswers(initialAnswers);
    setIsLoading(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem(QUIZ_RESULT_STORAGE_KEY);
    }
  }, []);

  const handleQuizSubmit = () => {
    setIsLoading(true);

    // The primary style is the first one selected in Step 2.
    const primaryStyle = answers.styleSelections[0] || 'modern'; // Fallback to 'modern'

    const dataToStore: StoredQuizData = {
      styleCategory: primaryStyle,
      userSelections: {
        colorMoodSelection: answers.colorMoodSelection,
        materialDetailSelections: answers.materialDetailSelections,
        roomFocusSelection: answers.roomFocusSelection,
      }
    };
    
    if (typeof window !== "undefined") {
      localStorage.setItem(QUIZ_RESULT_STORAGE_KEY, JSON.stringify(dataToStore));
    }
    
    // We don't need to wait for anything, but we can keep isLoading for the transition screen
    // The loading screen will handle the redirect.
  };

  useEffect(() => {
    const handleMessageFromParent = (event: MessageEvent) => {
      if (PARENT_WORDPRESS_ORIGIN !== '*' && event.origin !== PARENT_WORDPRESS_ORIGIN) {
        return;
      }
      if (PARENT_WORDPRESS_ORIGIN === '*' && event.origin === window.location.origin && event.source === window) {
         return;
      }

      if (event.data && event.data.type === 'triggerQuizNextStep') {
        triggerNextStepFlow();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('message', handleMessageFromParent);
      return () => {
        window.removeEventListener('message', handleMessageFromParent);
      };
    }
  }, [triggerNextStepFlow]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.parent !== window) {
      const isNextDisabled = isNextActionDisabled();
      window.parent.postMessage({ type: 'quizButtonStateUpdate', isDisabled: isNextDisabled }, PARENT_WORDPRESS_ORIGIN);
    }
  }, [currentStep, answers, isLoading, isNextActionDisabled]);


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
        triggerNextStepFlow,
        isNextActionDisabled,
        internalNextStep,
        getRoomOptionsForFocusStep,
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
