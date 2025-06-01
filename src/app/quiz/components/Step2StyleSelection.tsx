"use client";

import Image from "next/image";
import { useQuiz } from "@/context/QuizContext";
import { quizData } from "@/lib/quiz-data";
import type { StyleOption } from "@/types/quiz";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

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
    <div className="animate-fadeIn">
      <h2 className="question-heading">{stepData.question}</h2>
      <p className="instruction-text">{stepData.instruction}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stepData.options.map((option: StyleOption) => (
          <Card
            key={option.id}
            onClick={() => handleSelectStyle(option.id)}
            className={cn(
              "selectable-card overflow-hidden",
              answers.styleSelections.includes(option.id) && "selected"
            )}
            role="checkbox"
            aria-checked={answers.styleSelections.includes(option.id)}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectStyle(option.id); }}
          >
            {option.imageUrl && (
              <div className="aspect-[3/2] relative">
                <Image
                  src={option.imageUrl}
                  alt={option.name}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={option.hint}
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className={cn("font-headline text-xl", answers.styleSelections.includes(option.id) && "text-primary")}>{option.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className={cn(answers.styleSelections.includes(option.id) && "text-primary/80")}>{option.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
