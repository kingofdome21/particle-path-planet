import { useState, useEffect } from "react";

export interface Progress {
  sectionsCompleted: string[];
  quizScores: Record<string, number>;
  totalScore: number;
  currentSection: string;
  lastVisited: string;
}

const STORAGE_KEY = "particle-explorer-progress";

const defaultProgress: Progress = {
  sectionsCompleted: [],
  quizScores: {},
  totalScore: 0,
  currentSection: "home",
  lastVisited: new Date().toISOString(),
};

export const useProgress = () => {
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeSection = (section: string) => {
    setProgress((prev) => ({
      ...prev,
      sectionsCompleted: prev.sectionsCompleted.includes(section)
        ? prev.sectionsCompleted
        : [...prev.sectionsCompleted, section],
      currentSection: section,
      lastVisited: new Date().toISOString(),
    }));
  };

  const saveQuizScore = (section: string, score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: { ...prev.quizScores, [section]: score },
      totalScore: Object.values({ ...prev.quizScores, [section]: score }).reduce(
        (a, b) => a + b,
        0
      ),
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getCompletionPercentage = () => {
    const totalSections = 4; // quantum, protons-neutrons, atoms, greenhouse
    return Math.round((progress.sectionsCompleted.length / totalSections) * 100);
  };

  return {
    progress,
    completeSection,
    saveQuizScore,
    resetProgress,
    getCompletionPercentage,
  };
};
