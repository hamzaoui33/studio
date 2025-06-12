
"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizData, iconMap } from "@/lib/quiz-data";
import type { IconTextOption } from "@/types/quiz";
import { cn } from "@/lib/utils";
import type { LucideIcon } from 'lucide-react';

export function Step3ColorMood() {
  const { answers, updateAnswer } = useQuiz();
  const stepData = quizData.step3;

  if (!stepData || !stepData.options) {
    return <p className="text-center text-destructive">Step 3 data not configured.</p>;
  }

  const handleSelect = (optionId: string) => {
    updateAnswer("colorMoodSelection", optionId);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 md:gap-5">
        {stepData.options.map((option: IconTextOption) => {
          const IconComponent = typeof option.icon === 'string' ? iconMap[option.icon] || iconMap.default : option.icon as LucideIcon | undefined;
          const isSelected = answers.colorMoodSelection === option.id;

          return (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={cn(
                "selectable-card p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6",
                isSelected && "selected"
              )}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(option.id); }}
            >
              {/* Left Section */}
              <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-center md:items-start text-center md:text-left">
                {IconComponent && (
                  <div className="mb-2">
                    <IconComponent className={cn("h-8 w-8 md:h-10 md:w-10", isSelected ? "text-accent" : "text-foreground/60 group-hover:text-accent")} />
                  </div>
                )}
                <h4 className={cn("font-medium text-base md:text-lg mb-1", isSelected ? "text-accent font-semibold" : "text-foreground/80")}>{option.name}</h4>
                {option.description && ( // Keywords
                  <p className={cn("text-xs text-muted-foreground mb-3", isSelected && "text-accent/70")}>{option.description}</p>
                )}
                {option.colorPalette && (
                  <div className="flex space-x-1.5 mb-3 md:mb-0">
                    {option.colorPalette.map((color, index) => (
                      <div
                        key={index}
                        className="h-5 w-5 md:h-6 md:w-6 rounded-full border border-black/10"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Optional: Vertical Divider for medium screens and up */}
              <div className="hidden md:block h-auto w-px bg-border self-stretch mx-2"></div>
              <hr className="md:hidden w-full border-border my-2" />


              {/* Right Section */}
              {option.longDescription && (
                <div className="flex-grow">
                  <p className={cn("text-sm text-muted-foreground", isSelected && "text-accent/80")}>{option.longDescription}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
