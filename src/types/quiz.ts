
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

export interface Step5NameData extends StepData {
  placeholder?: string; // For the name input
}

export interface Step6GreetingData extends StepData {
  // This step's content is primarily handled by its component
}

export interface Step7EmailData extends StepData { 
  placeholder?: string; // For the email input
}

export interface Step8LoadingData extends StepData {
  // This step's content is primarily handled by its component
}

export interface Step9HomeOwnershipData extends StepData { // Was Step8, originally Step7
  options: IconTextOption[];
}

export interface Step10HomeTypeData extends StepData { // Was Step9, originally Step8
  options: IconTextOption[];
}

export interface Step11BudgetData extends StepData { // Was Step10, originally Step9
  options: BudgetOption[];
}


export type RoomImprovementSelection = Record<string, number>;

export type QuizAnswers = {
  swoonWorthyRooms: string[];
  styleSelections: string[];
  roomImprovementSelections: RoomImprovementSelection;
  roomFocusSelection: string;
  userName: string;
  email: string; 
  homeOwnershipStatus: string;
  homeTypeSelection: string;
  budgetRangeSelection: string;
};

export type AllQuizData = {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
  step5: Step5NameData;
  step6: Step6GreetingData;
  step7: Step7EmailData; 
  step8: Step8LoadingData; // New Loading Step
  step9: Step9HomeOwnershipData; 
  step10: Step10HomeTypeData; 
  step11: Step11BudgetData; 
};
