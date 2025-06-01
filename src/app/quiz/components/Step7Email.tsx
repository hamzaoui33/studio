
"use client";

import { useQuiz } from "@/context/QuizContext";
import { Input } from "@/components/ui/input";
import { quizData } from "@/lib/quiz-data";
import { cn } from "@/lib/utils";

export function Step7Email() {
  const { answers, updateAnswer } = useQuiz();
  const stepData = quizData.step7; 

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAnswer("email", e.target.value);
  };

  return (
    <Input
      type="email"
      id="email"
      placeholder={stepData.placeholder || "Type your email here"}
      value={answers.email}
      onChange={handleEmailChange}
      className={cn(
        "text-3xl md:text-4xl text-center p-4 h-auto w-full max-w-md",
        "bg-zinc-800 border border-zinc-700 text-primary-foreground placeholder:text-zinc-400",
        "rounded-lg",
        "focus-visible:ring-1 focus-visible:ring-accent focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-offset-0"
      )}
      autoFocus
    />
  );
}
