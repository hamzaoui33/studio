"use client";

import Image from "next/image";
import { useQuiz } from "@/context/QuizContext";
import { quizData } from "@/lib/quiz-data";
import type { ImageOption } from "@/types/quiz";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Step1SwoonWorthy() {
  const { answers, updateAnswer } = useQuiz();
  const stepData = quizData.step1;

  const handleSelectImage = (optionId: string) => {
    const currentSelection = answers.swoonWorthyRooms;
    const newSelection = currentSelection.includes(optionId)
      ? currentSelection.filter((id) => id !== optionId)
      : [...currentSelection, optionId];
    updateAnswer("swoonWorthyRooms", newSelection);
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="question-heading">{stepData.question}</h2>
      <p className="instruction-text">{stepData.instruction}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {stepData.options.map((option: ImageOption) => (
          <div
            key={option.id}
            onClick={() => handleSelectImage(option.id)}
            className={cn(
              "image-selection-card group aspect-[4/3]", // Added 'group'
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
              height={400}
              className="group-hover:scale-105" // Added className for group-hover effect
              data-ai-hint={option.hint}
              priority={stepData.options.indexOf(option) < 4} // Prioritize loading for first few images
            />
            <div className="overlay group-hover:opacity-100"> {/* Added group-hover:opacity-100 */}
              {answers.swoonWorthyRooms.includes(option.id) && (
                <CheckCircle className="h-12 w-12 text-primary-foreground" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
