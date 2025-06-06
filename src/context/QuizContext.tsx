
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { type QuizAnswers, type RoomImprovementSelection } from '@/types/quiz';
import { quizData, TOTAL_QUIZ_STEPS, type AllQuizData } from '@/lib/quiz-data';
import { useRouter } from 'next/navigation';
import type { GenerateStyleGuideInput } from '@/ai/flows/generate-style-guide';
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

    if (currentStep === 5) { 
      const selectedRoomIds = Object.keys(answers.roomImprovementSelections);
      const isOnlyOtherSelected = selectedRoomIds.length === 1 && selectedRoomIds[0] === 'other';
      const isOnlyNotSureYetSelected = selectedRoomIds.length === 1 && selectedRoomIds[0] === 'not_sure_yet';
      const noSpecificRoomsSelected = selectedRoomIds.filter(id => id !== 'other' && id !== 'not_sure_yet').length === 0;


      if (noSpecificRoomsSelected && (isOnlyOtherSelected || isOnlyNotSureYetSelected || selectedRoomIds.length === 0)) {
         nextStepNumber = 7; 
      }
    }

    if (nextStepNumber <= TOTAL_QUIZ_STEPS) {
      goToStep(nextStepNumber);
    }
  }, [currentStep, answers.roomImprovementSelections, goToStep]);


  const getRoomOptionsForFocusStep = useCallback(() => {
    const selectedRoomIds = Object.keys(answers.roomImprovementSelections)
                              .filter(id => id !== 'other' && id !== 'not_sure_yet');

    if (!selectedRoomIds || selectedRoomIds.length === 0) {
      return []; 
    }
    
    const allStandardRoomOptions = quizData.step5.options.filter(
      option => option.id !== 'other' && option.id !== 'not_sure_yet'
    );
    return allStandardRoomOptions.filter(option => selectedRoomIds.includes(option.id));
  }, [answers.roomImprovementSelections]);


  const validateCurrentStep = useCallback((): boolean => {
    const stepKey = `step${currentStep}` as keyof AllQuizData;
    const stepData = quizData[stepKey];
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
        if (!answers.colorMoodSelection) {
          toast({ title: "Selection Required", description: "Please select your color and mood preference.", variant: "default" });
          return false;
        }
        break;
      case 4: 
        if (answers.materialDetailSelections.length === 0) {
          toast({ title: "Selection Required", description: "Please select at least one material or detail preference.", variant: "default" });
          return false;
        }
        if (stepData?.maxSelections && answers.materialDetailSelections.length > stepData.maxSelections) {
            toast({ title: "Too Many Selections", description: `Please select up to ${stepData.maxSelections} material/detail preferences.`, variant: "default" });
            return false;
        }
        break;
      case 5: 
        if (Object.keys(answers.roomImprovementSelections).length === 0) {
          toast({ title: "Selection Required", description: "Please select at least one room to improve.", variant: "default" });
          return false;
        }
        break;
      case 6: 
        const selectedRoomIdsStep5 = Object.keys(answers.roomImprovementSelections);
        const noSpecificRoomsFocus = selectedRoomIdsStep5.filter(id => id !== 'other' && id !== 'not_sure_yet').length === 0;
        const isOnlyOtherOrNotSureForFocus = noSpecificRoomsFocus && (selectedRoomIdsStep5.includes('other') || selectedRoomIdsStep5.includes('not_sure_yet') || selectedRoomIdsStep5.length === 0);


        if (!isOnlyOtherOrNotSureForFocus) { 
            const focusOptions = getRoomOptionsForFocusStep();
            if (focusOptions.length > 0 && !answers.roomFocusSelection) {
                 toast({ title: "Selection Required", description: "Please select a room to focus on.", variant: "default" });
                return false;
            }
        }
        break;
      case 7: 
        return true;
      default:
        break;
    }
    return true;
  }, [currentStep, answers, toast, getRoomOptionsForFocusStep]);

  const isNextActionDisabled = useCallback((): boolean => {
    if (isLoading) return true;
    if (currentStep === TOTAL_QUIZ_STEPS) return true;

    const stepKey = `step${currentStep}` as keyof AllQuizData;
    const stepData = quizData[stepKey];

    switch (currentStep) {
      case 1: return answers.swoonWorthyRooms.length === 0;
      case 2: return answers.styleSelections.length === 0;
      case 3: return !answers.colorMoodSelection;
      case 4:
        const minSelected = answers.materialDetailSelections.length > 0;
        const withinMax = stepData?.maxSelections ? answers.materialDetailSelections.length <= stepData.maxSelections : true;
        return !minSelected || !withinMax;
      case 5: return Object.keys(answers.roomImprovementSelections).length === 0;
      case 6:
        const selectedRoomIdsStep5 = Object.keys(answers.roomImprovementSelections);
        const noSpecificRoomsFocus = selectedRoomIdsStep5.filter(id => id !== 'other' && id !== 'not_sure_yet').length === 0;
        const isSkippingStep6 = noSpecificRoomsFocus && (selectedRoomIdsStep5.includes('other') || selectedRoomIdsStep5.includes('not_sure_yet') || selectedRoomIdsStep5.length === 0);

        if (isSkippingStep6) return false;

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

      const aiInput: GenerateStyleGuideInput = {
        swoonWorthyRooms: answers.swoonWorthyRooms || [],
        styleSelections: answers.styleSelections || [],
        colorMoodSelection: answers.colorMoodSelection || '', 
        materialDetailSelections: answers.materialDetailSelections || [], 
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
      if (PARENT_WORDPRESS_ORIGIN !== '*' && event.origin !== PARENT_WORDPRESS_ORIGIN) {
        return;
      }
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
