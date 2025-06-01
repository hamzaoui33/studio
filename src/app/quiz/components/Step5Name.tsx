
"use client";

import { useQuiz } from "@/context/QuizContext";
import { Input } from "@/components/ui/input";
import { quizData } from "@/lib/quiz-data";

export function Step5Name() {
  const { answers, updateAnswer } = useQuiz();
  const stepData = quizData.step5; 

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAnswer("userName", e.target.value);
  };

  return (
    // The parent column in QuizPage.tsx handles the panel background and centering.
    // This component just provides the styled input.
    <Input
      type="text"
      id="userName"
      placeholder={stepData.placeholder || "Type your name here"}
      value={answers.userName}
      onChange={handleNameChange}
      className="text-3xl md:text-4xl text-center p-4 h-auto bg-transparent border-none focus:ring-0 focus:border-none shadow-none placeholder:text-muted-foreground/70 w-full max-w-md"
      autoFocus
    />
  );
}
