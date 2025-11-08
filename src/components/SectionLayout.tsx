import { ReactNode } from "react";
import { ParticleBackground } from "./ParticleBackground";
import { NavigationBar } from "./NavigationBar";

interface SectionLayoutProps {
  children: ReactNode;
}

export const SectionLayout = ({ children }: SectionLayoutProps) => {
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <NavigationBar />
      <main className="pt-20 pb-12">
        {children}
      </main>
    </div>
  );
};
