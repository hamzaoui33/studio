
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { type QuizAnswers, TOTAL_QUIZ_STEPS } from '@/types/quiz';
import { quizData } from '@/lib/quiz-data';
import { useRouter } from 'next/navigation';
import type { GenerateStyleGuideInput } from '@/ai/flows/generate-style-guide';


const initialAnswers: QuizAnswers = {
  swoonWorthyRooms: [],
  styleSelections: [],
  roomImprovementSelections: [],
  roomFocusSelection: '',
  homeOwnershipStatus: '',
  homeTypeSelection: '',
  budgetRangeSelection: '',
  email: '',
};

interface QuizContextType {
  currentStep: number;
  answers: QuizAnswers;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading: boolean;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updateAnswer: <K extends keyof QuizAnswers>(field: K, value: QuizAnswers[K]) => void;
  handleQuizSubmit: () => Promise<string | null>; // Returns style guide text or null
  resetQuiz: () => void;
  getRoomOptionsForFocusStep: () => Array<{ id: string; name: string; icon?: any }>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const updateAnswer = useCallback(<K extends keyof QuizAnswers>(field: K, value: QuizAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < TOTAL_QUIZ_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= TOTAL_QUIZ_STEPS) {
      setCurrentStep(step);
    }
  }, []);

  const resetQuiz = useCallback(() => {
    setCurrentStep(1);
    setAnswers(initialAnswers);
    if (typeof window !== "undefined") {
      localStorage.removeItem('styleGuideResult');
    }
  }, []);

  const getRoomOptionsForFocusStep = useCallback(() => {
    const selectedRoomIds = answers.roomImprovementSelections;
    if (!selectedRoomIds || selectedRoomIds.length === 0) {
      return quizData.step3.options;
    }
    return quizData.step3.options.filter(option => selectedRoomIds.includes(option.id));
  }, [answers.roomImprovementSelections, quizData.step3.options]);


  const handleQuizSubmit = async (): Promise<string | null> => {
    setIsLoading(true);
    try {
      const { generateStyleGuide } = await import('@/ai/flows/generate-style-guide');
      
      const aiInput: GenerateStyleGuideInput = {
        swoonWorthyRooms: answers.swoonWorthyRooms,
        styleSelections: answers.styleSelections,
        roomImprovementSelections: answers.roomImprovementSelections,
        roomFocusSelection: answers.roomFocusSelection,
        homeOwnershipStatus: answers.homeOwnershipStatus,
        homeTypeSelection: answers.homeTypeSelection,
        budgetRangeSelection: answers.budgetRangeSelection,
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
      return null;
    }
  };
  
  useEffect(() => {
    if (currentStep === 1 && JSON.stringify(answers) !== JSON.stringify(initialAnswers)) {
    }
  }, [currentStep, answers]);


  return (
    <QuizContext.Provider
      value={{
        currentStep,
        answers,
        isFirstStep: currentStep === 1,
        isLastStep: currentStep === TOTAL_QUIZ_STEPS,
        isLoading,
        nextStep,
        prevStep,
        goToStep,
        updateAnswer,
        handleQuizSubmit,
        resetQuiz,
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
