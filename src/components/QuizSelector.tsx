import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Quiz, QuizQuestion, QuizDifficulty } from "./Quiz";
import { Star, Trophy } from "lucide-react";

interface QuizSelectorProps {
  easyQuiz: QuizQuestion[];
  mediumQuiz: QuizQuestion[];
  hardQuiz: QuizQuestion[];
  sectionId: string;
  title: string;
  description: string;
}

export const QuizSelector = ({
  easyQuiz,
  mediumQuiz,
  hardQuiz,
  sectionId,
  title,
  description,
}: QuizSelectorProps) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuizDifficulty | null>(null);
  const [easyScore, setEasyScore] = useState<number | null>(null);
  const [mediumScore, setMediumScore] = useState<number | null>(null);
  const [hardScore, setHardScore] = useState<number | null>(null);

  const handleComplete = (difficulty: QuizDifficulty, score: number) => {
    if (difficulty === "easy") setEasyScore(score);
    else if (difficulty === "medium") setMediumScore(score);
    else if (difficulty === "hard") setHardScore(score);
    setSelectedDifficulty(null);
  };

  const getDifficultyColor = (difficulty: QuizDifficulty) => {
    switch (difficulty) {
      case "easy": return "border-secondary hover:bg-secondary/10";
      case "medium": return "border-primary hover:bg-primary/10";
      case "hard": return "border-destructive hover:bg-destructive/10";
    }
  };

  const getScore = (difficulty: QuizDifficulty) => {
    switch (difficulty) {
      case "easy": return easyScore;
      case "medium": return mediumScore;
      case "hard": return hardScore;
    }
  };

  if (selectedDifficulty) {
    const questions = selectedDifficulty === "easy" ? easyQuiz : selectedDifficulty === "medium" ? mediumQuiz : hardQuiz;
    return (
      <div>
        <Button
          onClick={() => setSelectedDifficulty(null)}
          variant="ghost"
          className="mb-4"
        >
          ← Back to difficulty selection
        </Button>
        <Quiz
          questions={questions}
          sectionId={`${sectionId}-${selectedDifficulty}`}
          difficulty={selectedDifficulty}
          onComplete={(score) => handleComplete(selectedDifficulty, score)}
        />
      </div>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Trophy className="w-6 h-6 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {[
          { difficulty: "easy" as QuizDifficulty, label: "Easy", questions: easyQuiz.length, stars: 1 },
          { difficulty: "medium" as QuizDifficulty, label: "Medium", questions: mediumQuiz.length, stars: 2 },
          { difficulty: "hard" as QuizDifficulty, label: "Hard", questions: hardQuiz.length, stars: 3 },
        ].map(({ difficulty, label, questions, stars }) => {
          const score = getScore(difficulty);
          const percentage = score !== null ? Math.round((score / questions) * 100) : null;

          return (
            <Button
              key={difficulty}
              onClick={() => setSelectedDifficulty(difficulty)}
              variant="outline"
              className={`h-auto p-4 justify-between ${getDifficultyColor(difficulty)}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-left">
                  <div className="font-semibold">{label}</div>
                  <div className="text-xs text-muted-foreground">{questions} questions</div>
                </div>
              </div>
              {percentage !== null && (
                <div className="text-sm font-mono">
                  {percentage >= 80 ? "✅" : percentage >= 60 ? "⭐" : "📝"} {percentage}%
                </div>
              )}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};
