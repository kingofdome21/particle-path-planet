import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { toast } from "sonner";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  sectionId: string;
  onComplete?: (score: number) => void;
}

export const Quiz = ({ questions, sectionId, onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { saveQuizScore, completeSection } = useProgress();

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const percentage = Math.round((score / questions.length) * 100);

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    if (index === question.correctAnswer) {
      setScore(score + 1);
      toast.success("Correct! Well done!");
    } else {
      toast.error("Not quite right. Check the explanation!");
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      saveQuizScore(sectionId, score + (isCorrect ? 1 : 0));
      completeSection(sectionId);
      onComplete?.(score + (isCorrect ? 1 : 0));
      toast.success("Quiz completed!", {
        description: `You scored ${score + (isCorrect ? 1 : 0)}/${questions.length}!`,
      });
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <Card className="p-8 bg-card/50 backdrop-blur border-border text-center">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h3 className="text-3xl font-bold mb-2 text-foreground">Quiz Complete!</h3>
        <p className="text-xl text-muted-foreground mb-6">
          Your Score: {score} / {questions.length} ({percentage}%)
        </p>
        {percentage >= 80 ? (
          <p className="text-lg text-secondary mb-6">
            Excellent work! You've mastered this section! 🎉
          </p>
        ) : percentage >= 60 ? (
          <p className="text-lg text-muted-foreground mb-6">
            Good job! Consider reviewing the material to improve your score.
          </p>
        ) : (
          <p className="text-lg text-muted-foreground mb-6">
            Keep learning! Review the content and try again.
          </p>
        )}
        <Button onClick={handleRetry} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Retry Quiz
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-card/50 backdrop-blur border-border">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-mono text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-mono text-primary">
            Score: {score}/{questions.length}
          </span>
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-6 text-foreground">{question.question}</h3>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctAnswer;
          
          let className = "w-full text-left p-4 rounded-lg border-2 transition-all ";
          
          if (!showExplanation) {
            className += "border-border hover:border-primary hover:bg-muted";
          } else if (isSelected) {
            className += isCorrect
              ? "border-secondary bg-secondary/10"
              : "border-destructive bg-destructive/10";
          } else if (isCorrectOption && showExplanation) {
            className += "border-secondary bg-secondary/10";
          } else {
            className += "border-border opacity-50";
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
              className={className}
            >
              <div className="flex items-center justify-between">
                <span className="text-foreground">{option}</span>
                {showExplanation && isSelected && (
                  isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )
                )}
                {showExplanation && isCorrectOption && !isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border animate-fade-in">
          <p className="text-sm font-semibold text-foreground mb-2">Explanation:</p>
          <p className="text-sm text-muted-foreground">{question.explanation}</p>
        </div>
      )}

      {showExplanation && (
        <Button onClick={handleNext} className="w-full">
          {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Quiz"}
        </Button>
      )}
    </Card>
  );
};
