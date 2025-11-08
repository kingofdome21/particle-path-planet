import { useState } from "react";
import { SectionLayout } from "@/components/SectionLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuantumSimulator } from "@/components/QuantumSimulator";
import { QuizSelector } from "@/components/QuizSelector";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Atom, Waves, Zap } from "lucide-react";
import { quantumQuizEasy, quantumQuizMedium, quantumQuizHard } from "@/data/quizData";

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

        <QuantumSimulator />

        <Card className="p-8 bg-card/50 backdrop-blur border-border mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Waves className="w-8 h-8 text-quantum" />
            <h2 className="text-2xl font-bold text-foreground">
              The Quantum World
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              At the quantum level, particles exhibit strange behaviors that completely defy our everyday
              experience. The rules that govern atoms and subatomic particles are fundamentally different
              from the classical physics we observe in our daily lives.
            </p>
            <p>
              <strong className="text-foreground">Quarks</strong> are the fundamental building blocks of
              matter. They come in six "flavors" (up, down, strange, charm, top, bottom) and three
              "colors" (red, green, blue—though these aren't actual colors!). Due to a phenomenon called
              <strong className="text-foreground"> color confinement</strong>, quarks never exist alone.
              They are always bound together in groups of two (mesons) or three (baryons) by gluons,
              which carry the strong force.
            </p>
            <p>
              <strong className="text-foreground">Electrons</strong> belong to a family called leptons—particles
              that don't experience the strong nuclear force. While quarks are trapped inside protons and neutrons,
              electrons orbit freely around atomic nuclei. Their precise arrangement in these "shells" determines
              all of chemistry and makes life possible.
            </p>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-card/50 backdrop-blur border-border">
            <div className="flex items-center gap-2 mb-3">
              <Atom className="w-6 h-6 text-electron" />
              <h3 className="text-xl font-bold text-foreground">Superposition</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Unlike classical objects that have definite properties, quantum particles exist in multiple
              states simultaneously until measured. An electron can be in multiple positions at once,
              only "choosing" a specific location when observed.
            </p>
            <p className="text-sm text-muted-foreground">
              This is famously illustrated by Schrödinger's cat thought experiment, where a cat in a box
              is simultaneously alive and dead until you open the box and observe it.
            </p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-border">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-6 h-6 text-quantum" />
              <h3 className="text-xl font-bold text-foreground">Quantum Entanglement</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              When particles become entangled, measuring one instantly affects the other, no matter how
              far apart they are. Einstein called this "spooky action at a distance" because it seemed
              to violate the speed of light limit.
            </p>
            <p className="text-sm text-muted-foreground">
              This isn't just theory—quantum entanglement is being used today in quantum computing and
              quantum cryptography to process information in revolutionary new ways.
            </p>
          </Card>
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur border-border mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Wave-Particle Duality
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              One of the most mind-bending discoveries in physics is that all quantum particles exhibit
              both wave and particle properties. An electron isn't just a tiny ball orbiting a nucleus—it's
              also a wave spread out in space.
            </p>
            <p>
              The famous <strong className="text-foreground">double-slit experiment</strong> demonstrates
              this perfectly: when you shoot electrons through two slits, they create an interference
              pattern on a screen (like waves), even if you send them one at a time. But the moment you
              try to detect which slit the electron went through, the interference pattern disappears and
              they behave like particles again.
            </p>
            <p>
              This duality isn't limited to electrons. Light, which we often think of as a wave, also
              comes in discrete packets called photons. Everything at the quantum scale is both wave and
              particle—the universe at its smallest scales is fundamentally probabilistic and strange.
            </p>
          </div>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-card/80 to-quantum/10 backdrop-blur border-border mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            The Standard Model
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              All the particles we've discussed are part of the <strong className="text-foreground">Standard
              Model of Particle Physics</strong>—our current best theory of how the universe works at its
              most fundamental level. The Standard Model describes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-foreground">6 quarks</strong> (up, down, strange, charm, top, bottom)</li>
              <li><strong className="text-foreground">6 leptons</strong> (electron, muon, tau, and their neutrinos)</li>
              <li><strong className="text-foreground">4 force carriers</strong> (photon, gluon, W/Z bosons)</li>
              <li><strong className="text-foreground">The Higgs boson</strong>, which gives particles mass</li>
            </ul>
            <p>
              Every experiment ever conducted confirms the Standard Model's predictions with incredible
              precision. The discovery of the Higgs boson at CERN in 2012 was the final piece of the puzzle,
              completing the model after decades of searching.
            </p>
            <p className="text-sm italic">
              Yet the Standard Model isn't complete—it doesn't explain gravity, dark matter, or dark energy.
              Physicists are searching for new physics beyond the Standard Model to answer these mysteries.
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
        <QuizSelector
          easyQuiz={quantumQuizEasy}
          mediumQuiz={quantumQuizMedium}
          hardQuiz={quantumQuizHard}
          sectionId="quantum"
          title="Test Your Knowledge"
          description="Choose your difficulty level and master the quantum realm!"
        />
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
