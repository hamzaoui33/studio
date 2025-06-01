
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
  const focusRoomOptions = getRoomOptionsForFocusStep();

  const handleSelectFocusRoom = (optionId: string) => {
    updateAnswer("roomFocusSelection", optionId);
  };

  if (focusRoomOptions.length === 0) {
    return (
      <div>
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"> {/* Adjusted md:grid-cols for new column layout */}
        {focusRoomOptions.map((option: IconTextOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          const isSelected = answers.roomFocusSelection === option.id;
          
          return (
             <div
              key={option.id}
              onClick={() => handleSelectFocusRoom(option.id)}
              className={cn(
                "circular-option group relative", // Simplified classes
                isSelected && "circular-option-selected"
              )}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectFocusRoom(option.id); }}
            >
              {IconComponent && (
                <div className="circular-option-icon mb-1.5">
                  <IconComponent className="h-8 w-8 md:h-10 md:w-10" /> {/* Standardized icon size */}
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
