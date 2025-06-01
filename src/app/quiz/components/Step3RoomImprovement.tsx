
"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { IconTextOption, RoomImprovementSelection } from "@/types/quiz";
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-react';
import { Minus, Plus, Check } from "lucide-react";

export function Step3RoomImprovement() {
  const { answers, updateAnswer } = useQuiz();

  const handleSelectRoom = (optionId: string) => {
    const currentSelections: RoomImprovementSelection = { ...answers.roomImprovementSelections };
    if (currentSelections[optionId]) {
      delete currentSelections[optionId]; // Deselect if already selected
    } else {
      currentSelections[optionId] = 1; // Select with default quantity 1
    }
    updateAnswer("roomImprovementSelections", currentSelections);
  };

  const handleQuantityChange = (optionId: string, newQuantity: number) => {
    if (newQuantity >= 1) { // Minimum quantity is 1
      const currentSelections: RoomImprovementSelection = { ...answers.roomImprovementSelections };
      currentSelections[optionId] = newQuantity;
      updateAnswer("roomImprovementSelections", currentSelections);
    }
    // If newQuantity < 1, do nothing, maintaining minimum 1.
    // Deselection is handled by handleSelectRoom.
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-5 gap-y-8 md:gap-y-10">
        {quizData.step3.options.map((option: IconTextOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          const isSelected = !!answers.roomImprovementSelections[option.id];
          const quantity = answers.roomImprovementSelections[option.id] || 0;
          
          return (
            <div key={option.id} className="flex flex-col items-center">
              <div
                onClick={() => handleSelectRoom(option.id)}
                className={cn(
                  "circular-option group w-full h-auto min-h-[100px] md:min-h-[130px] p-3 relative",
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
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-accent text-accent-foreground rounded-full p-0.5 w-5 h-5 flex items-center justify-center shadow">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
              {isSelected && (
                <div className="mt-3 flex items-center justify-center space-x-2.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleQuantityChange(option.id, quantity - 1); }}
                    disabled={quantity <= 1}
                    className="p-1.5 bg-card border border-border rounded-full disabled:opacity-50 hover:bg-muted transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
                    aria-label={`Decrease quantity for ${option.name}`}
                  >
                    <Minus className="w-4 h-4 text-foreground/70" />
                  </button>
                  <span className="text-sm font-medium text-foreground w-4 text-center tabular-nums">{quantity}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleQuantityChange(option.id, quantity + 1); }}
                    // Example: disabled={quantity >= 10} for a max limit
                    className="p-1.5 bg-card border border-border rounded-full hover:bg-muted transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
                    aria-label={`Increase quantity for ${option.name}`}
                  >
                    <Plus className="w-4 h-4 text-foreground/70" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
