
"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { IconTextOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-react';

export function Step6HomeType() {
  const { answers, updateAnswer } = useQuiz();
  // This component is currently not used in the 8-step quiz flow.
  // If re-introduced, ensure `stepData` points to the correct step in `quizData`.
  // For example, if it became step 10: const stepData = quizData.step10;
  const stepData = (quizData as any).step10; // Placeholder, adjust if re-enabled

  // If stepData or stepData.options is undefined, return null or some fallback UI.
  if (!stepData || !stepData.options) {
    // console.warn("Step data for Home Type is not configured correctly.");
    return <p className="text-center text-destructive">Step not configured.</p>;
  }

  const handleSelectHomeType = (optionId: string) => {
    // Ensure 'homeTypeSelection' is a valid key if re-enabling.
    // updateAnswer("homeTypeSelection" as any, optionId);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 md:gap-x-5 gap-y-8 md:gap-y-10 max-w-xl">
        {stepData.options.map((option: IconTextOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          // const isSelected = (answers as any).homeTypeSelection === option.id;
          const isSelected = false; // Placeholder
          
          return (
            <div
              key={option.id}
              onClick={() => handleSelectHomeType(option.id)}
              className={cn(
                "circular-option group relative", 
                isSelected && "circular-option-selected"
              )}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectHomeType(option.id); }}
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
