
"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { IconTextOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function Step4MaterialDetail() {
  const { answers, updateAnswer } = useQuiz();
  const stepData = quizData.step4;
  const { toast } = useToast();

  if (!stepData || !stepData.options) {
    return <p className="text-center text-destructive">Step 4 data not configured.</p>;
  }

  const handleSelect = (optionId: string) => {
    const currentSelection = answers.materialDetailSelections;
    const maxSelections = stepData.maxSelections || 2; // Default to 2 if not specified

    if (currentSelection.includes(optionId)) {
      // Deselect
      updateAnswer("materialDetailSelections", currentSelection.filter(id => id !== optionId));
    } else {
      // Select
      if (currentSelection.length < maxSelections) {
        updateAnswer("materialDetailSelections", [...currentSelection, optionId]);
      } else {
        toast({
          title: "Maximum Selections Reached",
          description: `You can select up to ${maxSelections} options for materials and details.`,
          variant: "default",
        });
      }
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {stepData.options.map((option: IconTextOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          const isSelected = answers.materialDetailSelections.includes(option.id);

          return (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={cn(
                "selectable-card p-4 md:p-5 flex flex-col items-center justify-center text-center min-h-[120px] md:min-h-[140px]",
                isSelected && "selected"
              )}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(option.id); }}
            >
              {IconComponent && (
                <div className="mb-2 md:mb-3">
                  <IconComponent className={cn("h-8 w-8 md:h-10 md:w-10", isSelected ? "text-accent" : "text-foreground/60 group-hover:text-accent")} />
                </div>
              )}
              <h4 className={cn("font-medium text-sm md:text-base mb-1", isSelected ? "text-accent font-semibold" : "text-foreground/80")}>{option.name}</h4>
              {option.description && (
                <p className={cn("text-xs text-muted-foreground", isSelected && "text-accent/70")}>{option.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
