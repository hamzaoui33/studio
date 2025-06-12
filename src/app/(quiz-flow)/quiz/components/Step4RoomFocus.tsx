
"use client";

import { useState, useEffect } from 'react';
import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { IconTextOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { LucideIcon } from 'lucide-react';

export function Step4RoomFocus() { // File name remains, but it's used as Step 6
  const { answers, updateAnswer, getRoomOptionsForFocusStep } = useQuiz();
  
  // Get all *standard* room options from Step 5 (Room Improvement)
  const allStep5StandardOptions = (quizData.step5?.options || []).filter(
    option => option.id !== 'other' && option.id !== 'not_sure_yet'
  );

  // Get the rooms *actually selected* by the user in Step 5 (excluding 'other', 'not_sure_yet')
  const roomsSelectedInStep5 = getRoomOptionsForFocusStep();

  const [showAllRooms, setShowAllRooms] = useState(false); 

  useEffect(() => {
    // If no specific rooms were selected in Step 5, default to showing all options.
    // Otherwise, default to showing only the specifically selected rooms.
    setShowAllRooms(roomsSelectedInStep5.length === 0);
  }, [roomsSelectedInStep5.length]);


  const handleSelectFocusRoom = (optionId: string) => {
    updateAnswer("roomFocusSelection", optionId);
  };

  const optionsToDisplay = showAllRooms ? allStep5StandardOptions : roomsSelectedInStep5;

  const showToggleButton = roomsSelectedInStep5.length > 0 && roomsSelectedInStep5.length < allStep5StandardOptions.length;

  if (!quizData.step5 || !quizData.step5.options) {
      return <p className="text-center text-destructive">Step 5 data not configured for focus options.</p>;
  }
  
  if (optionsToDisplay.length === 0 && !showAllRooms) {
     // This state can happen if only "other" or "not_sure_yet" was selected in Step 5,
     // and the skip logic in QuizContext should handle this by not showing this step.
     // However, as a fallback UI if this step is somehow reached:
     return (
        <div className="text-center text-muted-foreground py-8">
            <p>Please select specific rooms in the previous step to choose a focus, or view all options.</p>
             {allStep5StandardOptions.length > 0 && (
                 <button
                    onClick={() => setShowAllRooms(true)}
                    className="mt-4 flex items-center justify-center gap-1 px-4 py-2 text-sm font-medium rounded-md text-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                    aria-expanded={showAllRooms}
                >
                    Show all {allStep5StandardOptions.length} room options
                    <ChevronDown className="w-4 h-4" />
                </button>
             )}
        </div>
     );
  }
   if (optionsToDisplay.length === 0 && showAllRooms) {
    return <p className="text-center text-muted-foreground py-8">No standard room options available from the previous step.</p>;
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
          {showAllRooms ? "Show less" : `Show all ${allStep5StandardOptions.length} room options`}
          {showAllRooms ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}
