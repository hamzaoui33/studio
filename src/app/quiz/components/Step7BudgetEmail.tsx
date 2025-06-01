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
  const stepData = quizData.step7;

  const handleSelectBudget = (optionId: string) => {
    updateAnswer("budgetRangeSelection", optionId);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAnswer("email", e.target.value);
  };

  return (
    <div className="animate-fadeIn max-w-xl mx-auto">
      <h2 className="question-heading">{stepData.question}</h2>
      <p className="instruction-text">{stepData.instruction}</p>
      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
        {stepData.options.map((option: BudgetOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          const isSelected = answers.budgetRangeSelection === option.id;
          
          return (
            <div
              key={option.id}
              onClick={() => handleSelectBudget(option.id)}
               className={cn(
                "selectable-card p-4 text-center",
                isSelected && "selected"
              )}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectBudget(option.id); }}
            >
              {IconComponent && (
                <div className="flex justify-center mb-2">
                  <IconComponent className={cn("h-8 w-8", isSelected ? "text-primary" : "text-muted-foreground group-hover:text-accent" )} />
                </div>
              )}
              <h3 className={cn("font-medium", isSelected ? "text-primary" : "text-foreground")}>{option.name}</h3>
            </div>
          );
        })}
      </div>

      <div>
        <Label htmlFor="email" className="block text-lg font-medium text-foreground mb-2">{stepData.emailPrompt}</Label>
        <Input
          type="email"
          id="email"
          placeholder={stepData.emailPlaceholder}
          value={answers.email}
          onChange={handleEmailChange}
          className="text-base p-3"
          required
        />
      </div>
    </div>
  );
}
