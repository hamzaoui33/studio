
"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
// import type { BudgetOption } from "@/types/quiz"; // BudgetOption might be removed if types are cleaned up
import type { IconTextOption } from "@/types/quiz"; // Using IconTextOption as a fallback
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-react';

export function Step10Budget() {
  const { answers, updateAnswer } = useQuiz();
  // This component is currently not used in the 8-step quiz flow.
  // If re-introduced, ensure `stepData` points to the correct step in `quizData`.
  // For example, if it became step 11: const stepData = quizData.step11;
  const stepData = (quizData as any).step11; // Placeholder, adjust if re-enabled

  // If stepData or stepData.options is undefined, return null or some fallback UI.
  if (!stepData || !stepData.options) {
    // console.warn("Step data for Budget is not configured correctly.");
    return <p className="text-center text-destructive">Step not configured.</p>;
  }

  const handleSelectBudget = (optionId: string) => {
    // Ensure 'budgetRangeSelection' is a valid key if re-enabling.
    // updateAnswer("budgetRangeSelection" as any, optionId);
  };

  return (
    <div className="max-w-lg mx-auto_ md:max-w-none">
      <div className="grid grid-cols-2 gap-4 md:gap-5">
        {stepData.options.map((option: IconTextOption) => { // Changed BudgetOption to IconTextOption
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          // const isSelected = (answers as any).budgetRangeSelection === option.id;
          const isSelected = false; // Placeholder
          
          return (
            <div
              key={option.id}
              onClick={() => handleSelectBudget(option.id)}
               className={cn(
                "selectable-card p-4 text-center flex flex-col items-center justify-center min-h-[100px]",
                isSelected && "selected"
              )}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectBudget(option.id); }}
            >
              {IconComponent && (
                <div className="mb-2">
                  <IconComponent className={cn("h-7 w-7", isSelected ? "text-accent" : "text-foreground/60 group-hover:text-accent" )} />
                </div>
              )}
              <h4 className={cn("font-medium text-sm", isSelected ? "text-accent font-semibold" : "text-foreground/80")}>{option.name}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
