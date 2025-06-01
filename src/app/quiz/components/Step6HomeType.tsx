
"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { IconTextOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-react';

export function Step6HomeType() {
  const { answers, updateAnswer } = useQuiz();
  // const stepData = quizData.step6; // Handled by parent

  const handleSelectHomeType = (optionId: string) => {
    updateAnswer("homeTypeSelection", optionId);
  };

  return (
    <div>
      {/* Question and instruction removed */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-xl mx-auto"> {/* Centered options */}
        {quizData.step6.options.map((option: IconTextOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          const isSelected = answers.homeTypeSelection === option.id;
          
          return (
            <div
              key={option.id}
              onClick={() => handleSelectHomeType(option.id)}
              className={cn(
                "circular-option group w-full h-auto min-h-[130px] md:min-h-[160px] p-4",
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
              <span className="circular-option-text text-sm md:text-base">{option.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
