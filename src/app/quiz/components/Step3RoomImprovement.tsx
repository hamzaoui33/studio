"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { IconTextOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-react';

export function Step3RoomImprovement() {
  const { answers, updateAnswer } = useQuiz();
  const stepData = quizData.step3;

  const handleSelectRoom = (optionId: string) => {
    const currentSelection = answers.roomImprovementSelections;
    const newSelection = currentSelection.includes(optionId)
      ? currentSelection.filter((id) => id !== optionId)
      : [...currentSelection, optionId];
    updateAnswer("roomImprovementSelections", newSelection);
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="question-heading">{stepData.question}</h2>
      <p className="instruction-text">{stepData.instruction}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {stepData.options.map((option: IconTextOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          const isSelected = answers.roomImprovementSelections.includes(option.id);
          
          return (
            <div
              key={option.id}
              onClick={() => handleSelectRoom(option.id)}
              className={cn(
                "circular-option group w-full h-auto min-h-[120px] md:min-h-[150px] p-3",
                isSelected && "circular-option-selected"
              )}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectRoom(option.id); }}
            >
              {IconComponent && (
                <div className="circular-option-icon mb-2">
                  <IconComponent className="h-8 w-8 md:h-10 md:w-10" />
                </div>
              )}
              <span className="circular-option-text font-medium">{option.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
