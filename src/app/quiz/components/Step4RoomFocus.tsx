
"use client";

import { useState } from 'react';
import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { IconTextOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { LucideIcon } from 'lucide-react';

export function Step4RoomFocus() {
  const { answers, updateAnswer, getRoomOptionsForFocusStep } = useQuiz();
  
  const allStep3Options = quizData.step3.options;
  const initiallySelectedOptions = getRoomOptionsForFocusStep();

  // Default to showing all rooms if no rooms were selected in Step 3, otherwise show selected.
  const [showAllRooms, setShowAllRooms] = useState(initiallySelectedOptions.length === 0);

  const handleSelectFocusRoom = (optionId: string) => {
    updateAnswer("roomFocusSelection", optionId);
  };

  // Determine which options to display based on the toggle state
  const optionsToDisplay = showAllRooms ? allStep3Options : initiallySelectedOptions;

  // Show toggle button only if there's a distinction between initially selected and all options
  const showToggleButton = initiallySelectedOptions.length > 0 && initiallySelectedOptions.length < allStep3Options.length;

  // Determine if only a single option will be rendered in the main area for better centering
  const shouldRenderSingleCentredOption = optionsToDisplay.length === 1;

  return (
    <div className="flex flex-col items-center w-full">
      {shouldRenderSingleCentredOption ? (
        // Render single option directly if it's the only one to display.
        // It will be centered by the parent's `items-center`.
        optionsToDisplay.map((option: IconTextOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          const isSelected = answers.roomFocusSelection === option.id;
          
          return (
             <div
              key={option.id}
              onClick={() => handleSelectFocusRoom(option.id)}
              className={cn(
                "circular-option group relative",
                isSelected && "circular-option-selected"
                // Vertical spacing will be handled by the toggle button's `my-6` if present,
                // or natural flow if not.
              )}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectFocusRoom(option.id); }}
            >
              {IconComponent && (
                <div className="circular-option-icon mb-2">
                  <IconComponent className="h-8 w-8 md:h-10 md:w-10" />
                </div>
              )}
              <span className="circular-option-text">{option.name}</span>
            </div>
          );
        })
      ) : (
        // Render grid for multiple items
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-5 gap-y-8 md:gap-y-10">
          {optionsToDisplay.map((option: IconTextOption) => {
            const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
            const isSelected = answers.roomFocusSelection === option.id;
            
            return (
               <div
                key={option.id}
                onClick={() => handleSelectFocusRoom(option.id)}
                className={cn(
                  "circular-option group relative",
                  isSelected && "circular-option-selected"
                )}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectFocusRoom(option.id); }}
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
      )}

      {showToggleButton && (
        <button
          onClick={() => setShowAllRooms(!showAllRooms)}
          className="flex items-center justify-center gap-1 px-4 py-2 my-6 text-sm font-medium rounded-md text-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
          aria-expanded={showAllRooms}
        >
          {showAllRooms ? "Show less" : "View all options"}
          {showAllRooms ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}
