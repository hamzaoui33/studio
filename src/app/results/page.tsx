"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2, ArrowLeft, Sparkles, Home } from "lucide-react";
import { useQuiz } from '@/context/QuizContext'; // Import useQuiz to reset

export default function ResultsPage() {
  const [styleGuide, setStyleGuide] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { resetQuiz } = useQuiz(); // Get resetQuiz from context

  useEffect(() => {
    const storedGuide = localStorage.getItem('styleGuideResult');
    if (storedGuide) {
      setStyleGuide(storedGuide);
    }
    setIsLoading(false);
  }, []);

  const handleStartOver = () => {
    resetQuiz(); // Reset quiz state
    router.push('/quiz');
  };
  
  const handleGoHome = () => {
    resetQuiz();
    router.push('/');
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl text-muted-foreground">Loading your style guide...</p>
      </div>
    );
  }

  if (!styleGuide) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <Card className="max-w-md w-full shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-destructive">No Style Guide Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              We couldn't find your personalized style guide. This might happen if you navigated here directly or if there was an issue.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleStartOver} variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" /> Start Quiz Again
            </Button>
             <Button onClick={handleGoHome} className="w-full">
              <Home className="mr-2 h-4 w-4" /> Go to Homepage
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 py-8 md:py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-2xl rounded-xl overflow-hidden">
          <CardHeader className="bg-primary text-primary-foreground p-6 md:p-8 text-center">
            <div className="flex justify-center mb-3">
              <Sparkles className="h-12 w-12" />
            </div>
            <CardTitle className="font-headline text-3xl md:text-4xl">Your Personalized Style Guide</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-lg mt-1">
              Here's what we've curated just for you!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 prose prose-lg max-w-none prose-headings:font-headline prose-headings:text-primary prose-p:text-foreground prose-strong:text-foreground">
            {/* Render markdown-like text. For actual markdown, a library would be needed. */}
            {styleGuide.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('- ')) {
                return <li key={index} className="ml-4 my-1">{paragraph.substring(2)}</li>;
              }
              if (paragraph.startsWith('### ')) {
                 return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 font-headline text-primary">{paragraph.substring(4)}</h3>;
              }
              if (paragraph.startsWith('## ')) {
                 return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 font-headline text-primary">{paragraph.substring(3)}</h2>;
              }
               if (paragraph.startsWith('# ')) {
                 return <h1 key={index} className="text-3xl font-extrabold mt-8 mb-4 font-headline text-primary">{paragraph.substring(2)}</h1>;
              }
              return <p key={index} className="my-3 leading-relaxed">{paragraph}</p>;
            })}
          </CardContent>
          <CardFooter className="p-6 md:p-8 bg-muted/50 border-t flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleStartOver} variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" /> Start Over
            </Button>
            <Button onClick={handleGoHome} size="lg">
              <Home className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </CardFooter>
        </Card>
         <footer className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DecorStyle Discovery.
          </p>
      </footer>
      </div>
    </div>
  );
}
