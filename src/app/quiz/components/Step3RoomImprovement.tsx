
"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { IconTextOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-react';

export function Step3RoomImprovement() {
  const { answers, updateAnswer } = useQuiz();
  // const stepData = quizData.step3; // Handled by parent

  const handleSelectRoom = (optionId: string) => {
    const currentSelection = answers.roomImprovementSelections;
    const newSelection = currentSelection.includes(optionId)
      ? currentSelection.filter((id) => id !== optionId)
      : [...currentSelection, optionId];
    updateAnswer("roomImprovementSelections", newSelection);
  };

  return (
    <div>
      {/* Question and instruction removed */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"> {/* Adjusted grid for better fit */}
        {quizData.step3.options.map((option: IconTextOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          const isSelected = answers.roomImprovementSelections.includes(option.id);
          
          return (
            <div
              key={option.id}
              onClick={() => handleSelectRoom(option.id)}
              className={cn(
                "circular-option group w-full h-auto min-h-[100px] md:min-h-[130px] p-3",
                isSelected && "circular-option-selected"
              )}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectRoom(option.id); }}
            >
              {IconComponent && (
                <div className="circular-option-icon mb-1.5">
                  <IconComponent className="h-7 w-7 md:h-8 md:w-8" />
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
