
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

// Data for Step 5: Room Improvement
export interface Step5RoomImprovementData extends StepData {
  options: IconTextOption[];
  // noQuantitySelectorIds: string[]; // This might be part of component logic rather than quizData itself
}

// Data for Step 6: Room Focus
export interface Step6RoomFocusData extends StepData {
  // Options for this step are often dynamic based on Step 5,
  // but we might have a base set or just rely on context to provide them.
  // For simplicity, we'll assume the component fetches available rooms from context/quizData.step5.options
}


export interface Step7LoadingData extends StepData {
  // No options array needed for the loading screen itself
}

export interface RoomImprovementSelection {
  [roomId: string]: number; // room_id: quantity
}

export type QuizAnswers = {
  swoonWorthyRooms: string[];
  styleSelections: string[];
  colorMoodSelection: string;
  materialDetailSelections: string[];
  roomImprovementSelections: RoomImprovementSelection; // Added back
  roomFocusSelection: string; // Added back
};

export type AllQuizData = {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3ColorMoodData;
  step4: Step4MaterialDetailData;
  step5: Step5RoomImprovementData; // New Step 5
  step6: Step6RoomFocusData; // New Step 6
  step7: Step7LoadingData; // New Step 7 (Loading)
};

