
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
  
  const allStep3OptionsFiltered = quizData.step3.options.filter(
    option => option.id !== 'other' && option.id !== 'not_sure_yet'
  );
  const initiallySelectedOptions = getRoomOptionsForFocusStep(); // This already filters out "other" and "not_sure_yet"

  const [showAllRooms, setShowAllRooms] = useState(initiallySelectedOptions.length === 0 && allStep3OptionsFiltered.length > 0);

  const handleSelectFocusRoom = (optionId: string) => {
    updateAnswer("roomFocusSelection", optionId);
  };

  // Ensure optionsToDisplay only contains valid rooms for focus
  let optionsToDisplay = showAllRooms ? allStep3OptionsFiltered : initiallySelectedOptions;
  optionsToDisplay = optionsToDisplay.filter(option => option.id !== 'other' && option.id !== 'not_sure_yet');


  const showToggleButton = initiallySelectedOptions.length > 0 && initiallySelectedOptions.length < allStep3OptionsFiltered.length;

  // If there are no valid options to display (e.g., only "other" or "not_sure_yet" was selected, and skip logic didn't fire)
  // this step might appear empty or with just the toggle button if conditions are met.
  // The skip logic in QuizContext should prevent reaching this step if only "other" / "not_sure_yet" is chosen.
  if (optionsToDisplay.length === 0 && !showToggleButton) {
     // This case should ideally be prevented by the skip logic in QuizContext.
     // If it's reached, it implies an issue or an edge case not covered.
     // For safety, we can render nothing or a message, though the skip should handle it.
     // console.warn("Step4RoomFocus: No valid options to display. This might indicate an issue with skip logic.");
     return (
        <div className="text-center text-muted-foreground">
            <p>Please select a room in the previous step to focus on.</p>
            <p>(If you selected "Other" or "Not Sure Yet", you might be skipped to the next relevant step automatically.)</p>
        </div>
     );
  }


  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row flex-wrap justify-center items-start gap-x-4 md:gap-x-5 gap-y-8 md:gap-y-10">
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
                  <IconComponent className="h-[34px] w-[34px] md:h-10 md:w-10" />
                </div>
              )}
              <span className="circular-option-text">{option.name}</span>
            </div>
          );
        })}
      </div>

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
