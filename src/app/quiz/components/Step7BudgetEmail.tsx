
"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { BudgetOption } from "@/types/quiz";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-react';

export function Step7BudgetEmail() {
  const { answers, updateAnswer } = useQuiz();
  const stepData = quizData.step9; // Updated from step7 to step9

  const handleSelectBudget = (optionId: string) => {
    updateAnswer("budgetRangeSelection", optionId);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAnswer("email", e.target.value);
  };

  return (
    <div className="max-w-lg mx-auto_ md:max-w-none"> {/* Allow full width in its column */}
      {/* Question and instruction for budget options are part of stepDetails in QuizPage.
          However, this component has its own sub-heading for budget and email.
          We can keep them if they are specific to this part.
          For now, let's assume the main Q&I are from QuizPage.
      */}
      
      <h3 className="text-xl font-semibold text-foreground mb-3">Budget Range</h3>
      <div className="grid grid-cols-2 gap-4 md:gap-5 mb-8">
        {stepData.options.map((option: BudgetOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          const isSelected = answers.budgetRangeSelection === option.id;
          
          return (
            <div // Using selectable-card style for budget options
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
                <div className="mb-2"> {/* Removed circular-option-icon styling */}
                  <IconComponent className={cn("h-7 w-7", isSelected ? "text-accent" : "text-foreground/60 group-hover:text-accent" )} />
                </div>
              )}
              <h4 className={cn("font-medium text-sm", isSelected ? "text-accent font-semibold" : "text-foreground/80")}>{option.name}</h4>
            </div>
          );
        })}
      </div>

      <div className="quiz-input-panel w-full"> {/* Added w-full here */}
        <div className="w-full max-w-md text-center">
            <Label htmlFor="email" className="block text-lg font-semibold text-foreground mb-3">{stepData.emailPrompt}</Label>
            <Input
              type="email"
              id="email"
              placeholder={stepData.emailPlaceholder}
              value={answers.email}
              onChange={handleEmailChange}
              className="text-base p-3 h-12 bg-background border-border focus:border-accent focus:ring-accent"
              required
            />
        </div>
      </div>
    </div>
  );
}
