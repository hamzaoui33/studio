
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { type QuizAnswers } from '@/types/quiz';
import { quizData, TOTAL_QUIZ_STEPS, type AllQuizData } from '@/lib/quiz-data';
import { useRouter } from 'next/navigation';
import type { GenerateStyleGuideInput, GenerateStyleGuideOutput, StyleCategory } from '@/ai/flows/generate-style-guide';
import { useToast } from "@/hooks/use-toast";

// IMPORTANT: For production, replace '*' with your WordPress site's domain for security.
const PARENT_WORDPRESS_ORIGIN = '*';

const initialAnswers: QuizAnswers = {
  swoonWorthyRooms: [],
  styleSelections: [],
  colorMoodSelection: '',
  materialDetailSelections: [],
};

const QUIZ_RESULT_STORAGE_KEY = 'decorStyleQuizResult';

interface QuizContextType {
  currentStep: number;
  answers: QuizAnswers;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading: boolean;
  goToStep: (step: number) => void;
  updateAnswer: <K extends keyof QuizAnswers>(field: K, value: QuizAnswers[K]) => void;
  handleQuizSubmit: () => Promise<GenerateStyleGuideOutput | null>;
  resetQuiz: () => void;
  // getRoomOptionsForFocusStep: () => Array<{ id: string; name: string; icon?: any }>; // Removed as Step 5 & 6 were removed earlier
  triggerNextStepFlow: () => Promise<boolean>;
  isNextActionDisabled: () => boolean;
  internalNextStep: () => void;
  // isUserConsideredLoggedInForSkip: boolean; // Removed, step skipping logic was simplified/removed
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [isLoading, setIsLoading] = useState(false);
  // const [isUserConsideredLoggedInForSkip, setIsUserConsideredLoggedInForSkip] = useState(false); // Removed
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
    // Skip logic for old Step 4 (Room Focus) was removed as Step 5,6,7 were removed.
    // The quiz now goes from Step 4 (MaterialDetail) to Step 5 (Loading).
    if (nextStepNumber <= TOTAL_QUIZ_STEPS) {
      goToStep(nextStepNumber);
    }
  }, [currentStep, goToStep]);


  const validateCurrentStep = useCallback((): boolean => {
    const stepKey = `step${currentStep}` as keyof AllQuizData;
    // const stepData = quizData[stepKey]; // Not strictly needed for this validation logic

    switch (currentStep) {
      case 1: // Swoon-Worthy
        if (answers.swoonWorthyRooms.length === 0) {
          toast({ title: "Selection Required", description: "Please select at least one image.", variant: "default" });
          return false;
        }
        break;
      case 2: // Style Selection
        if (answers.styleSelections.length === 0) {
          toast({ title: "Selection Required", description: "Please select at least one style.", variant: "default" });
          return false;
        }
        break;
      case 3: // Color & Mood
        if (answers.colorMoodSelection === '') { // Explicitly check for empty string
          toast({ title: "Selection Required", description: "Please select a color and mood preference.", variant: "default" });
          return false;
        }
        break;
      case 4: // Material & Detail
        if (answers.materialDetailSelections.length === 0) {
          toast({ title: "Selection Required", description: "Please select at least one material/detail.", variant: "default" });
          return false;
        }
        break;
      // Step 5 is Loading, no validation needed here before submission
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
      case 3: // Color & Mood
        return answers.colorMoodSelection === ''; // Explicitly check for empty string
      case 4: // Material & Detail
        return answers.materialDetailSelections.length === 0;
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
    // setIsUserConsideredLoggedInForSkip(false); // Removed
    if (typeof window !== "undefined") {
      localStorage.removeItem(QUIZ_RESULT_STORAGE_KEY);
    }
  }, []);

  const handleQuizSubmit = async (): Promise<GenerateStyleGuideOutput | null> => {
    setIsLoading(true);
    try {
      const { generateStyleGuide } = await import('@/ai/flows/generate-style-guide');

      const aiInput: GenerateStyleGuideInput = {
        swoonWorthyRooms: answers.swoonWorthyRooms || [],
        styleSelections: answers.styleSelections || [],
        colorMoodSelection: answers.colorMoodSelection || '',
        materialDetailSelections: answers.materialDetailSelections || [],
        // userName was removed
      };

      const result = await generateStyleGuide(aiInput);

      // Ensure result and result.styleCategory are valid before storing
      if (result && result.styleCategory && typeof result.styleGuide === 'string') {
        if (typeof window !== "undefined") {
          localStorage.setItem(QUIZ_RESULT_STORAGE_KEY, JSON.stringify(result));
        }
      } else {
        console.error("AI did not return a valid styleCategory or styleGuide. Fallback may be needed.");
        // Potentially set a default/fallback result to localStorage or handle error
        // For now, it might lead to issues on the /results page if data is incomplete
        toast({
          title: "AI Result Incomplete",
          description: "The AI response was missing some information. Please try again.",
          variant: "destructive"
        });
        setIsLoading(false);
        return null;
      }

      setIsLoading(false);
      return result;
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
        return;
      }
      // This check is to prevent self-messaging if '*' is used and iframe is on same origin as parent
      if (PARENT_WORDPRESS_ORIGIN === '*' && event.origin === window.location.origin && event.source === window) {
         return;
      }

      if (event.data && event.data.type === 'triggerQuizNextStep') {
        triggerNextStepFlow();
      }

      // Logic for userLoginStatus and userData was removed previously
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('message', handleMessageFromParent);
      return () => {
        window.removeEventListener('message', handleMessageFromParent);
      };
    }
  }, [triggerNextStepFlow]); // Removed dependencies related to login state

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
        // getRoomOptionsForFocusStep was removed
        triggerNextStepFlow,
        isNextActionDisabled,
        internalNextStep,
        // isUserConsideredLoggedInForSkip was removed
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
