import type { LucideIcon } from 'lucide-react';

export interface ImageOption {
  id: string;
  imageUrl: string;
  alt: string;
  hint?: string; // For data-ai-hint
}

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  imageUrl?: string; // Optional image for style
  hint?: string;
}

export interface IconTextOption {
  id:string;
  name: string;
  icon?: LucideIcon | string; // LucideIcon component or SVG string
}

export interface BudgetOption extends IconTextOption {}

export interface StepData {
  id: number;
  title: string;
  question: string;
  instruction: string;
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
  // Options derived from Step 3. No explicit options here.
  // This step will filter based on Step 3's `roomImprovementSelections`
}

export interface Step5Data extends StepData {
  options: IconTextOption[];
}

export interface Step6Data extends StepData {
  options: IconTextOption[];
}

export interface Step7Data extends StepData {
  options: BudgetOption[];
  emailPrompt: string;
  emailPlaceholder: string;
}

export type QuizAnswers = {
  swoonWorthyRooms: string[]; // Image IDs / URLs
  styleSelections: string[]; // Style IDs
  roomImprovementSelections: string[]; // Room IDs
  roomFocusSelection: string; // Room ID
  homeOwnershipStatus: string; // Option ID
  homeTypeSelection: string; // Home Type ID
  budgetRangeSelection: string; // Budget Option ID
  email: string;
};

export type AllQuizData = {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data; // No options, but metadata
  step5: Step5Data;
  step6: Step6Data;
  step7: Step7Data;
};

export const TOTAL_QUIZ_STEPS = 7;
