
"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { IconTextOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-react';

export function Step5HomeOwnership() {
  const { answers, updateAnswer } = useQuiz();
  // This component is currently not used in the 8-step quiz flow.
  // If re-introduced, ensure `stepData` points to the correct step in `quizData`.
  // For example, if it became step 9: const stepData = quizData.step9;
  const stepData = (quizData as any).step9; // Placeholder, adjust if re-enabled


  // If stepData or stepData.options is undefined, return null or some fallback UI.
  if (!stepData || !stepData.options) {
    // This check is important to prevent runtime errors if the step is not configured.
    // console.warn("Step data for Home Ownership is not configured correctly.");
    return <p className="text-center text-destructive">Step not configured.</p>; 
  }


  const handleSelectOwnership = (optionId: string) => {
    // Ensure 'homeOwnershipStatus' is a valid key if re-enabling.
    // updateAnswer("homeOwnershipStatus" as any, optionId);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 gap-x-4 md:gap-x-5 gap-y-8 md:gap-y-10 max-w-sm">
        {stepData.options.map((option: IconTextOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          // const isSelected = (answers as any).homeOwnershipStatus === option.id;
          const isSelected = false; // Placeholder
          
          return (
            <div
              key={option.id}
              onClick={() => handleSelectOwnership(option.id)}
              className={cn(
                "circular-option group relative",
                isSelected && "circular-option-selected"
              )}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectOwnership(option.id); }}
            >
              {IconComponent && (
                <div className="circular-option-icon mb-2">
                  <IconComponent className="h-8 w-8 md:h-10 md:w-10" />
                </div>
              )}
              <span className="circular-option-text">{option.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
