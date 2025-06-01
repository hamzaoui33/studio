
"use client";

import { useEffect } from 'react';
import { useQuiz } from "@/context/QuizContext";

const GuaranteeBadge = () => (
  <div className="relative w-36 h-36 md:w-44 md:h-44 border-2 border-muted rounded-full flex items-center justify-center text-center p-2 bg-card shadow-md">
    {/* Using a simpler approach for the text circle for better cross-browser rendering and easier maintenance */}
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
          <path
            id="circlePathBadge"
            d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" 
            fill="none"
          />
        </defs>
        <text dy="4" className="text-[7px] md:text-[7.5px] font-medium tracking-tighter fill-foreground/70">
          <textPath href="#circlePathBadge" startOffset="0%" >
            A DESIGN YOU LOVE • OR YOUR MONEY BACK • A DESIGN YOU LOVE • OR YOUR MONEY BACK •
          </textPath>
        </text>
      </svg>
    </div>
    {/* Optional: Add a small icon or logo in the center of the badge */}
    {/* <Sparkles className="w-8 h-8 text-primary" /> */}
  </div>
);


export function Step8Loading() {
  const { nextStep } = useQuiz();

  useEffect(() => {
    const timer = setTimeout(() => {
      nextStep();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [nextStep]);

  return (
    <div className="flex flex-col items-center justify-center text-center h-full animate-fadeIn space-y-12 md:space-y-20 py-10">
      {/* Top section: Calculating results */}
      <div className="flex flex-col items-center space-y-3.5">
        <p className="text-base text-muted-foreground tracking-wide">
          Calculating your results...
        </p>
        <div className="flex space-x-2.5">
          <span className="pulsating-dot animation-delay-0"></span>
          <span className="pulsating-dot animation-delay-200"></span>
          <span className="pulsating-dot animation-delay-400"></span>
          <span className="pulsating-dot animation-delay-600"></span>
        </div>
      </div>

      {/* Bottom section: Did you know */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
        <div className="text-center md:text-left max-w-xs">
          <p className="text-xs font-semibold uppercase text-muted-foreground mb-1.5 tracking-wider">
            DID YOU KNOW?
          </p>
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 font-headline">
            Havenly Happiness Guarantee
          </h3>
          <p className="text-sm text-muted-foreground">
            Love it or it's free.
          </p>
        </div>
        <GuaranteeBadge />
      </div>
    </div>
  );
}
