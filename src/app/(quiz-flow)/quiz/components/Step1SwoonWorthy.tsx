
"use client";

import Image from "next/image";
import { useQuiz } from "@/context/QuizContext";
import { quizData } from "@/lib/quiz-data";
import type { ImageOption } from "@/types/quiz";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; 

export function Step1SwoonWorthy() {
  const { answers, updateAnswer, triggerNextStepFlow } = useQuiz(); 

  const handleSelectImage = (optionId: string) => {
    const currentSelection = answers.swoonWorthyRooms;
    const newSelection = currentSelection.includes(optionId)
      ? currentSelection.filter((id) => id !== optionId)
      : [...currentSelection, optionId];
    updateAnswer("swoonWorthyRooms", newSelection);
  };

  const handleSkipStep1 = async () => {
    // Even when skipping, we don't strictly need to validate,
    // but triggerNextStepFlow will internally try to validate (which passes for skip) and then advances.
    // Or, we could directly call internalNextStep if skip doesn't need validation.
    // For consistency, using triggerNextStepFlow which now handles advancement.
    await triggerNextStepFlow(); 
  };

  return (
    <div className="w-full">
      <div className="overflow-y-auto md:max-h-[calc(100vh-18rem)] pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {quizData.step1.options.map((option: ImageOption, index: number) => (
            <div
              key={option.id}
              onClick={() => handleSelectImage(option.id)}
              className={cn(
                "image-selection-card group aspect-[3/4]",
                answers.swoonWorthyRooms.includes(option.id) && "selected"
              )}
              role="checkbox"
              aria-checked={answers.swoonWorthyRooms.includes(option.id)}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectImage(option.id); }}
            >
              <Image
                src={option.imageUrl}
                alt={option.alt}
                width={600}
                height={800}
                data-ai-hint={option.hint}
                priority={index < 4}
              />
              <div className="overlay">
                {answers.swoonWorthyRooms.includes(option.id) && (
                  <CheckCircle className="h-10 w-10 md:h-12 md:w-12" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {answers.swoonWorthyRooms.length === 0 && (
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={handleSkipStep1}
            className="bg-transparent hover:bg-transparent text-sm text-muted-foreground hover:text-accent transition-colors"
            aria-label="Skip this step"
          >
            I don&apos;t like these. Skip.
          </Button>
        </div>
      )}
    </div>
  );
}
