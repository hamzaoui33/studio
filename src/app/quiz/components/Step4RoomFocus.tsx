
"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { IconTextOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Target } from "lucide-react";
import type { LucideIcon } from 'lucide-react';


export function Step4RoomFocus() {
  const { answers, updateAnswer, getRoomOptionsForFocusStep } = useQuiz();
  // const stepData = quizData.step4; // Handled by parent
  const focusRoomOptions = getRoomOptionsForFocusStep();

  const handleSelectFocusRoom = (optionId: string) => {
    updateAnswer("roomFocusSelection", optionId);
  };

  if (focusRoomOptions.length === 0) {
    return (
      <div>
        {/* Question and instruction removed */}
        <Alert variant="default" className="bg-card border-border">
          <Target className="h-4 w-4 text-accent" />
          <AlertTitle className="text-foreground">No Rooms Selected</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Please go back to Step 3 and select at least one room you'd like to improve.
            This will help us determine which room to focus on.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div>
      {/* Question and instruction removed */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {focusRoomOptions.map((option: IconTextOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          const isSelected = answers.roomFocusSelection === option.id;
          
          return (
             <div
              key={option.id}
              onClick={() => handleSelectFocusRoom(option.id)}
              className={cn(
                "circular-option group w-full h-auto min-h-[100px] md:min-h-[130px] p-3",
                isSelected && "circular-option-selected"
              )}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectFocusRoom(option.id); }}
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
