
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react";
import type { GenerateStyleGuideOutput } from '@/ai/flows/generate-style-guide';

const QUIZ_RESULT_STORAGE_KEY = 'decorStyleQuizResult';

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

// Fallback URL if category not found or other issues
const FALLBACK_REDIRECT_URL = "https://aveladecor.com/quiz-error/"; // Or your main quiz page

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
      // Redirect to quiz start or a generic error page on WordPress
      window.top.location.href = "/quiz"; // Or a WordPress error page
      return;
    }

    try {
      const result: GenerateStyleGuideOutput = JSON.parse(storedResultString);
      const { styleGuide, styleCategory } = result;

      if (!styleCategory || !styleGuide) {
        throw new Error("Incomplete data in localStorage.");
      }

      let targetUrl = styleCategoryToUrlMap[styleCategory.toLowerCase()];

      if (!targetUrl) {
        console.warn(`ResultsPage: Style category "${styleCategory}" not found in map. Using fallback URL.`);
        targetUrl = FALLBACK_REDIRECT_URL;
      }

      // Append styleGuide as a query parameter
      const finalUrl = new URL(targetUrl);
      finalUrl.searchParams.append('guide', styleGuide);

      setMessage(`Redirecting to your ${styleCategory} style page...`);
      
      // Redirect the top-level window
      window.top.location.href = finalUrl.toString();
      // No need to setIsLoading(false) as the page will navigate away

    } catch (error) {
      console.error("ResultsPage: Error processing quiz result from localStorage:", error);
      setMessage("There was an error processing your results. Redirecting...");
      // Redirect to an error page or quiz start
      window.top.location.href = FALLBACK_REDIRECT_URL;
    }

  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-xl text-muted-foreground">{message}</p>
    </div>
  );
}
