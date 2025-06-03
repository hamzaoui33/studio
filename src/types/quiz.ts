
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

export interface Step5LoadingData extends StepData {
  // This step's content is primarily handled by its component
}

export type RoomImprovementSelection = Record<string, number>;

export type QuizAnswers = {
  swoonWorthyRooms: string[];
  styleSelections: string[];
  roomImprovementSelections: RoomImprovementSelection;
  roomFocusSelection: string;
  // userName and email removed
};

export type AllQuizData = {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5LoadingData; // Formerly Step8LoadingData
};

