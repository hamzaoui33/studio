
"use client";

import { useQuiz } from "@/context/QuizContext";
import { Input } from "@/components/ui/input";
import { quizData } from "@/lib/quiz-data";

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
      className="text-3xl md:text-4xl text-center p-4 h-auto w-full max-w-md"
      autoFocus
    />
  );
}

