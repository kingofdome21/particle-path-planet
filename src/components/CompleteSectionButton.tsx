import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CompleteSectionButtonProps {
  sectionId: string;
  sectionName: string;
}

export const CompleteSectionButton = ({ sectionId, sectionName }: CompleteSectionButtonProps) => {
  const { progress, completeSection } = useProgress();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsCompleted(progress.sectionsCompleted.includes(sectionId));
  }, [progress.sectionsCompleted, sectionId]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleComplete = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to save your progress");
      return;
    }

    setIsLoading(true);
    await completeSection(sectionId);
    setIsLoading(false);
    toast.success(`${sectionName} section completed! 🎉`);
  };

  if (isCompleted) {
    return (
      <Button disabled className="gap-2 bg-secondary/20 hover:bg-secondary/20">
        <CheckCircle2 className="w-5 h-5" />
        Section Completed
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleComplete} 
      disabled={isLoading}
      size="lg"
      className="gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Completing...
        </>
      ) : (
        <>
          <CheckCircle2 className="w-5 h-5" />
          Complete {sectionName} Section
        </>
      )}
    </Button>
  );
};
