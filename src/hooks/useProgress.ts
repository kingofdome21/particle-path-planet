import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Progress {
  sectionsCompleted: string[];
  quizScores: Record<string, number>;
  totalScore: number;
  currentSection: string;
  lastVisited: string;
}

const defaultProgress: Progress = {
  sectionsCompleted: [],
  quizScores: {},
  totalScore: 0,
  currentSection: "home",
  lastVisited: new Date().toISOString(),
};

export const useProgress = () => {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [loading, setLoading] = useState(true);

  // Load progress from database
  useEffect(() => {
    const loadProgress = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error loading progress:", error);
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        const sectionsCompleted = data
          .filter(p => p.completed)
          .map(p => p.section_id);

        const quizScores: Record<string, number> = {};
        data.forEach(p => {
          if (p.quiz_score > 0) {
            quizScores[p.section_id] = p.quiz_score;
          }
        });

        const totalScore = Object.values(quizScores).reduce((a, b) => a + b, 0);

        setProgress({
          sectionsCompleted,
          quizScores,
          totalScore,
          currentSection: data[data.length - 1]?.section_id || "home",
          lastVisited: new Date().toISOString(),
        });
      }

      setLoading(false);
    };

    loadProgress();
  }, []);

  const completeSection = async (section: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast.error("Please sign in to save your progress");
      return;
    }

    const { error } = await supabase
      .from("user_progress")
      .upsert({
        user_id: session.user.id,
        section_id: section,
        completed: true,
        completed_at: new Date().toISOString(),
      }, {
        onConflict: "user_id,section_id"
      });

    if (error) {
      console.error("Error saving progress:", error);
      toast.error("Failed to save progress");
      return;
    }

    setProgress((prev) => ({
      ...prev,
      sectionsCompleted: prev.sectionsCompleted.includes(section)
        ? prev.sectionsCompleted
        : [...prev.sectionsCompleted, section],
      currentSection: section,
      lastVisited: new Date().toISOString(),
    }));
  };

  const saveQuizScore = async (section: string, score: number) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast.error("Please sign in to save your quiz score");
      return;
    }

    const { error } = await supabase
      .from("user_progress")
      .upsert({
        user_id: session.user.id,
        section_id: section,
        quiz_score: score,
      }, {
        onConflict: "user_id,section_id"
      });

    if (error) {
      console.error("Error saving quiz score:", error);
      toast.error("Failed to save quiz score");
      return;
    }

    setProgress((prev) => ({
      ...prev,
      quizScores: { ...prev.quizScores, [section]: score },
      totalScore: Object.values({ ...prev.quizScores, [section]: score }).reduce(
        (a, b) => a + b,
        0
      ),
    }));
  };

  const resetProgress = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast.error("Please sign in to reset your progress");
      return;
    }

    const { error } = await supabase
      .from("user_progress")
      .delete()
      .eq("user_id", session.user.id);

    if (error) {
      console.error("Error resetting progress:", error);
      toast.error("Failed to reset progress");
      return;
    }

    setProgress(defaultProgress);
    toast.success("Progress reset successfully");
  };

  const getCompletionPercentage = () => {
    const totalSections = 4; // quantum, protons-neutrons, atoms, greenhouse
    return Math.round((progress.sectionsCompleted.length / totalSections) * 100);
  };

  return {
    progress,
    loading,
    completeSection,
    saveQuizScore,
    resetProgress,
    getCompletionPercentage,
  };
};
