"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { IconTextOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-react';

export function Step5HomeOwnership() {
  const { answers, updateAnswer } = useQuiz();
  const stepData = quizData.step5;

  const handleSelectOwnership = (optionId: string) => {
    updateAnswer("homeOwnershipStatus", optionId);
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="question-heading">{stepData.question}</h2>
      <p className="instruction-text">{stepData.instruction}</p>
      <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-md mx-auto">
        {stepData.options.map((option: IconTextOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          const isSelected = answers.homeOwnershipStatus === option.id;
          
          return (
            <div
              key={option.id}
              onClick={() => handleSelectOwnership(option.id)}
              className={cn(
                "circular-option group w-full h-auto min-h-[150px] md:min-h-[180px] p-4",
                isSelected && "circular-option-selected"
              )}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectOwnership(option.id); }}
            >
              {IconComponent && (
                <div className="circular-option-icon mb-2">
                  <IconComponent className="h-10 w-10 md:h-12 md:w-12" />
                </div>
              )}
              <span className="circular-option-text text-base md:text-lg font-medium">{option.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
