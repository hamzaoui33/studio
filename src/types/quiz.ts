
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
  description?: string; // Added for new steps
}

export interface StepData {
  id: number;
  title: string; // General title for the step
  question: string; // Main question text
  instruction: string; // Instruction text
  maxSelections?: number; // Generic max selections
}

export interface Step1Data extends StepData {
  options: ImageOption[];
}

export interface Step2Data extends StepData {
  options: StyleOption[];
}

// New Step Data Types
export interface Step3ColorMoodData extends StepData {
  options: IconTextOption[]; // Reusing IconTextOption, description can hold keywords
}

export interface Step4MaterialDetailData extends StepData {
  options: IconTextOption[];
}
// End New Step Data Types

export interface Step5Data extends StepData { // Was Step3Data
  options: IconTextOption[];
}

export interface Step6Data extends StepData { // Was Step4Data
  // Options derived from new Step 5 (old Step 3).
}

export interface Step7LoadingData extends StepData { // Was Step5LoadingData
  // This step's content is primarily handled by its component
}

export type RoomImprovementSelection = Record<string, number>;

export type QuizAnswers = {
  swoonWorthyRooms: string[];
  styleSelections: string[];
  colorMoodSelection: string; // New answer field
  materialDetailSelections: string[]; // New answer field (can be multiple)
  roomImprovementSelections: RoomImprovementSelection;
  roomFocusSelection: string;
};

export type AllQuizData = {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3ColorMoodData; // New Step 3
  step4: Step4MaterialDetailData; // New Step 4
  step5: Step5Data; // Old Step 3, now Step 5
  step6: Step6Data; // Old Step 4, now Step 6
  step7: Step7LoadingData; // Old Step 5, now Step 7
};
