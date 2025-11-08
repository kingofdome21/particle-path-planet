import { useState } from "react";
import { SectionLayout } from "@/components/SectionLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InteractiveParticle } from "@/components/InteractiveParticle";
import { Quiz } from "@/components/Quiz";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { quantumQuiz } from "@/data/quizData";

const QuantumParticles = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const particles = [
    {
      name: "Quarks",
      types: ["Up", "Down", "Strange", "Charm", "Top", "Bottom"],
      description: "The fundamental constituents of matter. They combine to form protons and neutrons.",
      color: "bg-quantum",
    },
    {
      name: "Electrons",
      types: ["Electron", "Muon", "Tau"],
      description: "Negatively charged particles that orbit atomic nuclei and enable chemical bonds.",
      color: "bg-electron",
    },
    {
      name: "Gluons",
      types: ["8 Types"],
      description: "Force carriers that bind quarks together through the strong nuclear force.",
      color: "bg-secondary",
    },
  ];

  return (
    <SectionLayout>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Quantum Particles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The smallest building blocks of our universe—particles that make up everything we see
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {particles.map((particle) => (
            <Card
              key={particle.name}
              className="p-6 bg-card/50 backdrop-blur border-border hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`w-16 h-16 rounded-full ${particle.color} particle-glow mb-4 animate-pulse-slow mx-auto`}
              />
              <h3 className="text-2xl font-bold mb-2 text-center text-foreground">
                {particle.name}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {particle.types.map((type) => (
                  <span
                    key={type}
                    className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                  >
                    {type}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {particle.description}
              </p>
            </Card>
          ))}
        </div>

        <InteractiveParticle
          title="Quantum Particle Simulation"
          description="Watch quarks and leptons interact! Move your mouse to influence the particles and see them form connections through force carriers."
          particleCount={25}
          particleColor="hsl(180, 100%, 50%)"
        />

        <Card className="p-8 bg-card/50 backdrop-blur border-border my-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            The Quantum World
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              At the quantum level, particles exhibit strange behaviors that defy our everyday
              experience. They can exist in multiple states simultaneously (superposition) and
              influence each other instantly across vast distances (entanglement).
            </p>
            <p>
              <strong className="text-foreground">Quarks</strong> come in six "flavors" and three
              "colors." They never exist alone but always combine in groups through the strong
              force carried by gluons.
            </p>
            <p>
              <strong className="text-foreground">Electrons</strong> are leptons—particles that
              don't experience the strong force. Their movement in atoms creates the chemistry that
              makes life possible.
            </p>
            <p>
              <strong className="text-foreground">Wave-Particle Duality:</strong> All quantum
              particles exhibit both wave and particle properties. An electron can behave like a
              particle when detected, but shows wave interference patterns in double-slit experiments.
            </p>
          </div>
        </Card>

        {!showQuiz ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setShowQuiz(true)} size="lg" className="gap-2">
              <BookOpen className="w-5 h-5" />
              Take the Quiz
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/protons-neutrons">
                Skip to Next: Protons & Neutrons <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <Quiz questions={quantumQuiz} sectionId="quantum" />
            <div className="flex justify-center mt-8">
              <Button asChild size="lg" className="gap-2">
                <Link to="/protons-neutrons">
                  Next: Protons & Neutrons <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </SectionLayout>
  );
};

export default QuantumParticles;
