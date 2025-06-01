
import type { LucideIcon } from 'lucide-react';

export interface ImageOption {
  id: string;
  imageUrl: string;
  alt: string;
  hint?: string; 
}

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  imageUrl?: string; 
  hint?: string;
}

export interface IconTextOption {
  id:string;
  name: string;
  icon?: LucideIcon | string; 
}

export interface BudgetOption extends IconTextOption {}

export interface StepData {
  id: number;
  title: string; // General title for the step
  question: string; // Main question text
  instruction: string; // Instruction text
}

export interface Step1Data extends StepData {
  options: ImageOption[];
  maxSelections?: number;
}

export interface Step2Data extends StepData {
  options: StyleOption[];
  maxSelections?: number;
}

export interface Step3Data extends StepData {
  options: IconTextOption[];
  maxSelections?: number;
}

export interface Step4Data extends StepData {
  // Options derived from Step 3.
}

export interface Step5Data extends StepData {
  options: IconTextOption[];
}

export interface Step6Data extends StepData {
  options: IconTextOption[];
}

export interface Step7Data extends StepData {
  options: BudgetOption[]; // These are the budget options
  emailPrompt: string;
  emailPlaceholder: string;
}

export type QuizAnswers = {
  swoonWorthyRooms: string[]; 
  styleSelections: string[]; 
  roomImprovementSelections: string[]; 
  roomFocusSelection: string; 
  homeOwnershipStatus: string; 
  homeTypeSelection: string; 
  budgetRangeSelection: string; 
  email: string;
};

export type AllQuizData = {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data; 
  step5: Step5Data;
  step6: Step6Data;
  step7: Step7Data;
};

// TOTAL_QUIZ_STEPS is now exported from quiz-data.ts to avoid circular dependencies if QuizPage needs it.
// If QuizContext needs it and quiz-data imports from types, it's better here or in a constants file.
// For now, keeping it accessible via quizData object or direct export from quiz-data.ts

