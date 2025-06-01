
"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { BudgetOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-react';

export function Step10Budget() {
  const { answers, updateAnswer } = useQuiz();
  // This component now handles Step 10 data, which is for budget selection only.
  const stepData = quizData.step10; 

  const handleSelectBudget = (optionId: string) => {
    updateAnswer("budgetRangeSelection", optionId);
  };

  return (
    <div className="max-w-lg mx-auto_ md:max-w-none">
      {/* Budget options rendering */}
      <div className="grid grid-cols-2 gap-4 md:gap-5">
        {stepData.options.map((option: BudgetOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          const isSelected = answers.budgetRangeSelection === option.id;
          
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
      {/* Email input is removed from this component */}
    </div>
  );
}
