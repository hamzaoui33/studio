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
                "selectable-card p-4 md:p-5 flex flex-col md:flex-row items-stretch gap-3 md:gap-4", // items-stretch for equal height columns on md+
                isSelected && "selected"
              )}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(option.id); }}
            >
              {/* Left Column: Icon, Name, Keywords, Palette */}
              <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col items-center md:items-start justify-between pr-0 md:pr-3 text-center md:text-left">
                <div className="flex flex-col items-center md:items-start w-full">
                  {IconComponent && (
                    <div className="mb-2.5">
                      <IconComponent className={cn("h-8 w-8 md:h-10 md:w-10", isSelected ? "text-accent" : "text-foreground/60 group-hover:text-accent")} />
                    </div>
                  )}
                  <div className="mb-3">
                    <h4 className={cn("font-medium text-base md:text-lg", isSelected ? "text-accent font-semibold" : "text-foreground/80")}>{option.name}</h4>
                    {option.description && ( // Keywords
                      <p className={cn("text-xs text-muted-foreground", isSelected && "text-accent/70")}>{option.description}</p>
                    )}
                  </div>
                </div>
                {option.colorPalette && (
                  <div className="flex space-x-1.5 mt-auto pt-3 md:pt-2 justify-center md:justify-start w-full">
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

              {/* Separator */}
              <hr className="md:hidden w-full border-border my-3" /> {/* Mobile Separator */}
              <div className="hidden md:block w-px bg-border mx-2 md:mx-3 self-stretch"></div> {/* Desktop Separator */}

              {/* Right Column: Long Description */}
              {option.longDescription && (
                <div className="w-full md:w-3/5 lg:w-2/3 flex-grow pl-0 md:pl-3 flex flex-col justify-center">
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
