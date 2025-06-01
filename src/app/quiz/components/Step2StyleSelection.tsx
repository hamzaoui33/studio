
"use client";

import Image from "next/image";
import { useQuiz } from "@/context/QuizContext";
import { quizData } from "@/lib/quiz-data";
import type { StyleOption } from "@/types/quiz";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Card is used here for options
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
    <div>
      {/* Question and instruction removed, handled by parent QuizPage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6"> {/* Adjusted to 2 cols for better fit */}
        {stepData.options.map((option: StyleOption) => (
          <div // Changed Card to div and applied selectable-card class
            key={option.id}
            onClick={() => handleSelectStyle(option.id)}
            className={cn(
              "selectable-card overflow-hidden flex flex-col", // Added flex flex-col
              answers.styleSelections.includes(option.id) && "selected"
            )}
            role="checkbox"
            aria-checked={answers.styleSelections.includes(option.id)}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectStyle(option.id); }}
          >
            {option.imageUrl && (
              <div className="aspect-[16/10] relative w-full rounded-t-md overflow-hidden"> {/* Ensure image covers */}
                <Image
                  src={option.imageUrl}
                  alt={option.name}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={option.hint}
                />
              </div>
            )}
            <div className="p-4 flex-grow"> {/* Replaced CardHeader and CardContent */}
              <h3 className={cn("font-headline text-lg md:text-xl mb-1", answers.styleSelections.includes(option.id) ? "text-accent font-semibold" : "text-foreground")}>{option.name}</h3>
              <p className={cn("text-sm", answers.styleSelections.includes(option.id) ? "text-accent/80" : "text-muted-foreground")}>{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

