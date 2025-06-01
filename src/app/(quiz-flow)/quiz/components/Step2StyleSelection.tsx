
"use client";

import Image from "next/image";
import { useQuiz } from "@/context/QuizContext";
import { quizData } from "@/lib/quiz-data";
import type { StyleOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function Step2StyleSelection() {
  const { answers, updateAnswer } = useQuiz();
  const stepData = quizData.step2;
  const { toast } = useToast();

  const handleSelectStyle = (optionId: string) => {
    const currentSelection = answers.styleSelections;
    if (currentSelection.includes(optionId)) {
      const newSelection = currentSelection.filter((id) => id !== optionId);
      updateAnswer("styleSelections", newSelection);
    } else {
      if (stepData.maxSelections && currentSelection.length >= stepData.maxSelections) {
        toast({
          title: "Maximum Selections Reached",
          description: `You can select up to ${stepData.maxSelections} styles.`,
          variant: "default",
        });
        return;
      }
      const newSelection = [...currentSelection, optionId];
      updateAnswer("styleSelections", newSelection);
    }
  };

  return (
    <div className="md:max-h-[calc(100vh-8.5rem)]">
      <div className="flex flex-col gap-4 md:gap-6">
        {stepData.options.map((option: StyleOption) => (
          <div
            key={option.id}
            onClick={() => handleSelectStyle(option.id)}
            className={cn(
              "selectable-card flex flex-row items-stretch overflow-hidden", 
              answers.styleSelections.includes(option.id) && "selected"
            )}
            role="checkbox"
            aria-checked={answers.styleSelections.includes(option.id)}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectStyle(option.id); }}
          >
            {option.imageUrl && (
              <div className="relative w-2/5 sm:w-1/3 shrink-0 aspect-square">
                <Image
                  src={option.imageUrl}
                  alt={option.name}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={option.hint}
                />
              </div>
            )}
            <div className="p-4 flex-grow flex flex-col justify-center">
              <h3 className={cn("font-headline text-base md:text-lg mb-1", answers.styleSelections.includes(option.id) ? "text-accent font-semibold" : "text-foreground")}>{option.name}</h3>
              <p className={cn("text-sm", answers.styleSelections.includes(option.id) ? "text-accent/80" : "text-muted-foreground")}>{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
