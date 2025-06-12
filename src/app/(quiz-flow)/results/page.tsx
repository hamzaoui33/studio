
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react";
import type { GenerateStyleGuideOutput } from '@/ai/flows/generate-style-guide';

const QUIZ_RESULT_STORAGE_KEY = 'decorStyleQuizResult';

// Define the structure for what's expected from localStorage
interface StoredQuizData {
  aiOutput: GenerateStyleGuideOutput;
  userSelections: {
    colorMoodSelection?: string;
    materialDetailSelections?: string[];
    roomFocusSelection?: string;
  };
}

const styleCategoryToUrlMap: Record<string, string> = {
  "midcentury-modern": "https://aveladecor.com/styles-result/midcentury-modern/",
  "bohemian": "https://aveladecor.com/styles-result/bohemian/",
  "coastal": "https://aveladecor.com/styles-result/coastal/",
  "modern": "https://aveladecor.com/styles-result/modern/",
  "rustic": "https://aveladecor.com/styles-result/rustic/",
  "traditional": "https://aveladecor.com/styles-result/traditional/",
  "scandinavian": "https://aveladecor.com/styles-result/scandinavian/",
  "glam": "https://aveladecor.com/styles-result/glam/",
  "industrial": "https://aveladecor.com/styles-result/industrial/",
  "eclectic": "https://aveladecor.com/styles-result/eclectic/",
  "farmhouse": "https://aveladecor.com/styles-result/farmhouse/",
  "japandi": "https://aveladecor.com/styles-result/japandi/",
  "transitional": "https://aveladecor.com/styles-result/transitional/",
  "minimalist": "https://aveladecor.com/styles-result/minimalist/",
};

const FALLBACK_REDIRECT_URL = "/quiz"; 

export default function ResultsPageRedirector() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("Processing your results and redirecting...");
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedResultString = localStorage.getItem(QUIZ_RESULT_STORAGE_KEY);

    if (!storedResultString) {
      setMessage("No quiz result found. Redirecting to start the quiz...");
      console.warn("ResultsPage: No data found in localStorage. Redirecting to /quiz.");
      router.push(FALLBACK_REDIRECT_URL);
      return;
    }

    try {
      const storedData: StoredQuizData = JSON.parse(storedResultString);
      
      if (!storedData.aiOutput || !storedData.userSelections) {
        throw new Error("Incomplete data structure in localStorage.");
      }

      const { styleGuide, styleCategory } = storedData.aiOutput;
      const { colorMoodSelection, materialDetailSelections, roomFocusSelection } = storedData.userSelections;

      if (!styleCategory || typeof styleGuide !== 'string') {
        throw new Error("Missing styleCategory or styleGuide from AI output in localStorage.");
      }

      let targetUrl = styleCategoryToUrlMap[styleCategory.toLowerCase()];

      if (!targetUrl) {
        console.warn(`ResultsPage: Style category "${styleCategory}" not found in map. Using fallback URL.`);
        targetUrl = "https://aveladecor.com/quiz-error/"; 
      }

      // Manually construct query parameters using encodeURIComponent
      const queryParams = [];
      queryParams.push(`guide=${encodeURIComponent(styleGuide)}`);

      if (colorMoodSelection) {
        queryParams.push(`color=${encodeURIComponent(colorMoodSelection)}`);
      }
      if (materialDetailSelections && materialDetailSelections.length > 0) {
        queryParams.push(`_materials=${encodeURIComponent(materialDetailSelections[0])}`);
      }
      if (roomFocusSelection) {
        queryParams.push(`_focusroom=${encodeURIComponent(roomFocusSelection)}`);
      }

      const queryString = queryParams.join('&');
      const finalUrlString = `${targetUrl}?${queryString}`;


      setMessage(`Redirecting to your ${styleCategory} style page...`);
      
      if (window.top) {
        window.top.location.href = finalUrlString;
      } else {
        window.location.href = finalUrlString;
      }

    } catch (error) {
      console.error("ResultsPage: Error processing quiz result from localStorage:", error);
      setMessage("There was an error processing your results. Redirecting...");
      if (window.top) {
         window.top.location.href = "https://aveladecor.com/quiz-error/"; 
      } else {
        router.push(FALLBACK_REDIRECT_URL);
      }
    }
  }, [router]); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-xl text-muted-foreground">{message}</p>
    </div>
  );
}
