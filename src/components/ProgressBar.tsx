import { useProgress } from "@/hooks/useProgress";
import { Card } from "./ui/card";
import { Trophy, Target } from "lucide-react";

export const ProgressBar = () => {
  const { progress, getCompletionPercentage } = useProgress();
  const percentage = getCompletionPercentage();

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Your Progress</h3>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <span className="text-sm font-mono text-muted-foreground">
            {progress.totalScore} points
          </span>
        </div>
      </div>

      <div className="w-full bg-muted h-3 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {progress.sectionsCompleted.length} of 4 sections completed
        </span>
        <span className="font-bold text-primary">{percentage}%</span>
      </div>
    </Card>
  );
};
