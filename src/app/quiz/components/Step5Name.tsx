
"use client";

import { useQuiz } from "@/context/QuizContext";
import { Input } from "@/components/ui/input";
import { quizData } from "@/lib/quiz-data";

export function Step5Name() {
  const { answers, updateAnswer } = useQuiz();
  const stepData = quizData.step5; // Corresponds to the new name step

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAnswer("userName", e.target.value);
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <div className="quiz-input-panel w-full">
        <Input
          type="text"
          id="userName"
          placeholder={stepData.placeholder || "Type your name here"}
          value={answers.userName}
          onChange={handleNameChange}
          className="text-2xl md:text-3xl text-center p-4 h-auto bg-transparent border-none focus:ring-0 focus:border-none shadow-none placeholder:text-muted-foreground/70"
          autoFocus
        />
      </div>
    </div>
  );
}
