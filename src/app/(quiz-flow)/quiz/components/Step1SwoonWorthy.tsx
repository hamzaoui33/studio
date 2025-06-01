
"use client";

import Image from "next/image";
import { useQuiz } from "@/context/QuizContext";
import { quizData } from "@/lib/quiz-data";
import type { ImageOption } from "@/types/quiz";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Step1SwoonWorthy() {
  const { answers, updateAnswer } = useQuiz();

  const handleSelectImage = (optionId: string) => {
    const currentSelection = answers.swoonWorthyRooms;
    const newSelection = currentSelection.includes(optionId)
      ? currentSelection.filter((id) => id !== optionId)
      : [...currentSelection, optionId];
    updateAnswer("swoonWorthyRooms", newSelection);
  };

  return (
    <div className="w-full">
      {/* Removed overflow-y-auto, md:max-h-..., and pr-1 from this div */}
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
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
    </div>
  );
}
