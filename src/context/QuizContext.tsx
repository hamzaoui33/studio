
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { type QuizAnswers, type RoomImprovementSelection } from '@/types/quiz';
import { quizData, TOTAL_QUIZ_STEPS, type AllQuizData } from '@/lib/quiz-data';
import { useRouter } from 'next/navigation';
import type { GenerateStyleGuideInput } from '@/ai/flows/generate-style-guide';
import { useToast } from "@/hooks/use-toast";

const PARENT_WORDPRESS_ORIGIN = '*'; // IMPORTANT: Update for production

const initialAnswers: QuizAnswers = {
  swoonWorthyRooms: [],
  styleSelections: [],
  roomImprovementSelections: {},
  roomFocusSelection: '',
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

    // Skip logic: if on step 3 and only 'other' or 'not_sure_yet' is selected, skip step 4
    if (currentStep === 3) {
      const selectedRoomIds = Object.keys(answers.roomImprovementSelections);
      const isOnlyOtherSelected = selectedRoomIds.length === 1 && selectedRoomIds[0] === 'other';
      const isOnlyNotSureYetSelected = selectedRoomIds.length === 1 && selectedRoomIds[0] === 'not_sure_yet';

      if (isOnlyOtherSelected || isOnlyNotSureYetSelected) {
        nextStepNumber = 5; // Skip Step 4 (Room Focus), go directly to new Step 5 (Loading)
      }
    }

    if (nextStepNumber <= TOTAL_QUIZ_STEPS) {
      goToStep(nextStepNumber);
    }
  }, [currentStep, answers.roomImprovementSelections, goToStep]);


  const getRoomOptionsForFocusStep = useCallback(() => {
    const selectedRoomIds = Object.keys(answers.roomImprovementSelections)
                              .filter(id => id !== 'other' && id !== 'not_sure_yet'); // Exclude 'other' and 'not_sure_yet'

    const allStandardRoomOptions = quizData.step3.options.filter(
      option => option.id !== 'other' && option.id !== 'not_sure_yet'
    );

    // If no rooms were selected (or only "other"/"not_sure_yet" which are filtered out),
    // show all standard room options for focus.
    if (!selectedRoomIds || selectedRoomIds.length === 0) {
      return allStandardRoomOptions;
    }

    // Otherwise, show only the standard rooms that were selected in step 3.
    return allStandardRoomOptions.filter(option => selectedRoomIds.includes(option.id));
  }, [answers.roomImprovementSelections]);


  const validateCurrentStep = useCallback((): boolean => {
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
        // Only validate Step 4 if it's not being skipped
        const selectedRoomIdsStep3 = Object.keys(answers.roomImprovementSelections);
        const isSkippingStep4 = selectedRoomIdsStep3.length === 1 && (selectedRoomIdsStep3[0] === 'other' || selectedRoomIdsStep3[0] === 'not_sure_yet');

        if (!isSkippingStep4) {
            const focusOptions = getRoomOptionsForFocusStep();
            // Ensure there are options to select from and one is selected
            if (focusOptions.length > 0 && !answers.roomFocusSelection) {
                 toast({ title: "Selection Required", description: "Please select a room to focus on.", variant: "default" });
                return false;
            }
        }
        break;
      case 5: // New Step 5 is Loading, always valid to proceed from here internally
        return true;
      default:
        break;
    }
    return true;
  }, [currentStep, answers, toast, getRoomOptionsForFocusStep]);

  const isNextActionDisabled = useCallback((): boolean => {
    if (isLoading) return true;
    if (currentStep === TOTAL_QUIZ_STEPS) return true; // Cannot go next from the last step (Loading screen)

    switch (currentStep) {
      case 1: return answers.swoonWorthyRooms.length === 0;
      case 2: return answers.styleSelections.length === 0;
      case 3: return Object.keys(answers.roomImprovementSelections).length === 0;
      case 4:
        // If Step 4 is going to be skipped, the next button shouldn't be "disabled" based on its own validation
        const selectedRoomIdsStep3 = Object.keys(answers.roomImprovementSelections);
        const isSkippingStep4 = selectedRoomIdsStep3.length === 1 && (selectedRoomIdsStep3[0] === 'other' || selectedRoomIdsStep3[0] === 'not_sure_yet');
        if (isSkippingStep4) return false;

        const focusOptions = getRoomOptionsForFocusStep();
        return focusOptions.length > 0 && !answers.roomFocusSelection;
      default: return false;
    }
  }, [currentStep, answers, isLoading, getRoomOptionsForFocusStep]);


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
    if (typeof window !== "undefined") {
      localStorage.removeItem('styleGuideResult');
    }
  }, []);

  const handleQuizSubmit = async (): Promise<string | null> => {
    setIsLoading(true);
    try {
      const { generateStyleGuide } = await import('@/ai/flows/generate-style-guide');

      // Prepare input for AI, ensure all properties are defined even if empty
      const aiInput: GenerateStyleGuideInput = {
        swoonWorthyRooms: answers.swoonWorthyRooms || [],
        styleSelections: answers.styleSelections || [],
        roomImprovementSelections: answers.roomImprovementSelections || {},
        roomFocusSelection: answers.roomFocusSelection || '',
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
      // Security: Check the origin of the message
      if (PARENT_WORDPRESS_ORIGIN !== '*' && event.origin !== PARENT_WORDPRESS_ORIGIN) {
        // console.warn("QuizContext: Message received from untrusted origin:", event.origin);
        return;
      }
       // Avoid processing messages from self if using wildcard for development
      if (PARENT_WORDPRESS_ORIGIN === '*' && event.origin === window.location.origin) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerNextStepFlow]); // Removed dependencies that were related to prev step or login status

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
