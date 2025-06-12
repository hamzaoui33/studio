
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
                "selectable-card p-4 md:p-5 flex flex-row items-stretch gap-3 md:gap-4", // Always flex-row, items-stretch for equal height columns
                isSelected && "selected"
              )}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(option.id); }}
            >
              {/* Left Column: Icon, Name, Keywords, Palette */}
              <div className="w-2/5 lg:w-1/3 flex flex-col justify-between py-1"> {/* py-1 for a bit of vertical padding */}
                {/* Top part of left column: Icon, Name, Keywords */}
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="flex flex-col items-center md:flex-row md:items-center md:gap-3 w-full mb-3">
                    {IconComponent && (
                      <div className="mb-2 md:mb-0"> {/* Wrapper for icon */}
                        <IconComponent className={cn("h-8 w-8 md:h-10 md:w-10", isSelected ? "text-accent" : "text-foreground/60 group-hover:text-accent")} />
                      </div>
                    )}
                    <div> {/* Name and Keywords */}
                      <h4 className={cn("font-medium text-base md:text-lg", isSelected ? "text-accent font-semibold" : "text-foreground/80")}>{option.name}</h4>
                      {option.description && ( // Keywords
                        <p className={cn("text-xs text-muted-foreground", isSelected && "text-accent/70")}>{option.description}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom part of left column (Palette) */}
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

              {/* Separator - Always visible */}
              <div className="w-px bg-border mx-1 self-stretch"></div>

              {/* Right Column: Long Description */}
              {option.longDescription && (
                <div className="w-3/5 lg:w-2/3 flex-grow flex flex-col justify-center text-center md:text-left pl-1 md:pl-2">
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
