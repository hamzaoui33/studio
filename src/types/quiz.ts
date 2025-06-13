
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
  description?: string; // For keywords in Step 3, or general description
  longDescription?: string; // For the detailed paragraph in Step 3
  colorPalette?: string[]; // For the color hex codes in Step 3
}

export interface StepData {
  id: number;
  title: string;
  question: string;
  instruction: string;
  maxSelections?: number;
}

export interface Step1Data extends StepData {
  options: ImageOption[];
}

export interface Step2Data extends StepData {
  options: StyleOption[];
}

export interface Step3ColorMoodData extends StepData {
  options: IconTextOption[];
}

export interface Step4MaterialDetailData extends StepData {
  options: IconTextOption[];
}

export interface Step5RoomImprovementData extends StepData {
  options: IconTextOption[];
}

export interface Step6RoomFocusData extends StepData {
  // Options are dynamic based on Step 5 selections
}

export interface Step7LoadingData extends StepData {
  // No options array needed, it's a loading screen
}

export interface RoomImprovementSelection {
  [roomId: string]: number;
}

// QuizAnswers now only contains fields relevant to the current 7-step flow
export type QuizAnswers = {
  swoonWorthyRooms: string[];
  styleSelections: string[];
  colorMoodSelection: string;
  materialDetailSelections: string[];
  roomImprovementSelections: RoomImprovementSelection;
  roomFocusSelection: string;
};

export type AllQuizData = {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3ColorMoodData;
  step4: Step4MaterialDetailData;
  step5: Step5RoomImprovementData;
  step6: Step6RoomFocusData;
  step7: Step7LoadingData;
};
