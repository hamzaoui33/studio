
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
const FALLBACK_REDIRECT_URL = "/quiz"; // Redirect to quiz start within the app if something goes wrong

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
      // Redirect to quiz start or a generic error page
      // For internal fallback, router.push is okay. For WordPress, use window.top.location.href
      router.push(FALLBACK_REDIRECT_URL);
      return;
    }

    try {
      const result: GenerateStyleGuideOutput = JSON.parse(storedResultString);
      const { styleGuide, styleCategory } = result;

      if (!styleCategory || !styleGuide) {
        throw new Error("Incomplete data in localStorage (missing styleCategory or styleGuide).");
      }

      let targetUrl = styleCategoryToUrlMap[styleCategory.toLowerCase()];

      if (!targetUrl) {
        console.warn(`ResultsPage: Style category "${styleCategory}" not found in map. Using fallback URL.`);
        // Fallback to a generic results page on WordPress or quiz start
        // For this example, let's make the fallback a specific WordPress page if available, or app's quiz start
        targetUrl = "https://aveladecor.com/quiz-error/"; // Example generic error/fallback on WordPress
      }

      // Append styleGuide as a query parameter
      const finalUrl = new URL(targetUrl);
      finalUrl.searchParams.append('guide', encodeURIComponent(styleGuide)); // Ensure guide is URL encoded

      setMessage(`Redirecting to your ${styleCategory} style page...`);
      
      // Redirect the top-level window to the WordPress page
      if (window.top) {
        window.top.location.href = finalUrl.toString();
      } else {
        // Fallback if not in an iframe (should not happen in your setup)
        window.location.href = finalUrl.toString();
      }
      // No need to setIsLoading(false) as the page will navigate away

    } catch (error) {
      console.error("ResultsPage: Error processing quiz result from localStorage:", error);
      setMessage("There was an error processing your results. Redirecting...");
      // Redirect to an error page or quiz start
      if (window.top) {
         window.top.location.href = "https://aveladecor.com/quiz-error/"; // Example WordPress error page
      } else {
        router.push(FALLBACK_REDIRECT_URL);
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]); // router is a dependency of useEffect

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-xl text-muted-foreground">{message}</p>
    </div>
  );
}

