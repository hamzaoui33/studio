
"use client";

import { useQuiz } from "@/context/QuizContext";
import { Input } from "@/components/ui/input";
import { quizData } from "@/lib/quiz-data";

export function Step7Email() {
  const { answers, updateAnswer } = useQuiz();
  // Step 7 is now the email collection step.
  // We assume quizData.step7 is structured for this, specifically having a placeholder.
  const stepData = quizData.step7; 

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAnswer("email", e.target.value);
  };

  return (
    <div className="quiz-input-panel w-full max-w-xl"> 
      <Input
        type="email"
        id="email"
        placeholder={stepData.placeholder || "Type your email here"}
        value={answers.email}
        onChange={handleEmailChange}
        className="text-2xl md:text-3xl text-center p-4 h-auto bg-transparent border-none focus:ring-0 focus:border-none shadow-none placeholder:text-muted-foreground/70 w-full"
        autoFocus
      />
    </div>
  );
}
