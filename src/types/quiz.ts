
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
  description?: string;
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

// This type is for step 5 (loading screen).
// It doesn't have 'options' in the same way other steps do.
export interface Step5LoadingData extends StepData {
  // No options array needed for the loading screen itself
}

export type QuizAnswers = {
  swoonWorthyRooms: string[];
  styleSelections: string[];
  colorMoodSelection: string;
  materialDetailSelections: string[];
  // roomImprovementSelections and roomFocusSelection were removed
};

export type AllQuizData = {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3ColorMoodData;
  step4: Step4MaterialDetailData;
  step5: Step5LoadingData; // The loading screen
  // step6 and step7 (old RoomFocus and old Loading) are removed
};
