
"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { IconTextOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-react';

export function Step5HomeOwnership() {
  const { answers, updateAnswer } = useQuiz();

  const handleSelectOwnership = (optionId: string) => {
    updateAnswer("homeOwnershipStatus", optionId);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-sm mx-auto md:max-w-none md:mx-0"> {/* Adjusted max-width for new column layout */}
        {quizData.step5.options.map((option: IconTextOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          const isSelected = answers.homeOwnershipStatus === option.id;
          
          return (
            <div
              key={option.id}
              onClick={() => handleSelectOwnership(option.id)}
              className={cn(
                "circular-option group relative", // Simplified classes
                isSelected && "circular-option-selected"
              )}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectOwnership(option.id); }}
            >
              {IconComponent && (
                <div className="circular-option-icon mb-2">
                  <IconComponent className="h-8 w-8 md:h-10 md:w-10" /> {/* Standardized icon size */}
                </div>
              )}
              <span className="circular-option-text">{option.name}</span> {/* Removed explicit text sizing */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
