
"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { IconTextOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-react';

export function Step5HomeOwnership() {
  const { answers, updateAnswer } = useQuiz();
  const stepData = quizData.step7; // Updated from step5 to step7

  const handleSelectOwnership = (optionId: string) => {
    updateAnswer("homeOwnershipStatus", optionId);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-2 gap-x-4 md:gap-x-5 gap-y-8 md:gap-y-10 max-w-sm">
        {stepData.options.map((option: IconTextOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          const isSelected = answers.homeOwnershipStatus === option.id;
          
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
