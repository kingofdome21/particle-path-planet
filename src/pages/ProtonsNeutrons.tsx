import { useState } from "react";
import { SectionLayout } from "@/components/SectionLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InteractiveParticle } from "@/components/InteractiveParticle";
import { Quiz } from "@/components/Quiz";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import { protonsNeutronsQuiz } from "@/data/quizData";

const ProtonsNeutrons = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <SectionLayout>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Protons & Neutrons
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            How quarks combine to form the nucleons that make up atomic nuclei
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6 bg-card/50 backdrop-blur border-border">
            <div className="mb-6 flex justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-proton particle-glow animate-pulse-slow" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center text-foreground">Proton</h3>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">Composition:</strong> 2 Up quarks + 1 Down quark
              </p>
              <p>
                <strong className="text-foreground">Charge:</strong> +1 (positive)
              </p>
              <p>
                <strong className="text-foreground">Mass:</strong> 938.3 MeV/c²
              </p>
              <p className="text-sm">
                Protons define the atomic number of an element. More protons mean a different
                element entirely.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-border">
            <div className="mb-6 flex justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-neutron particle-glow animate-pulse-slow" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center text-foreground">Neutron</h3>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <strong className="text-foreground">Composition:</strong> 1 Up quark + 2 Down quarks
              </p>
              <p>
                <strong className="text-foreground">Charge:</strong> 0 (neutral)
              </p>
              <p>
                <strong className="text-foreground">Mass:</strong> 939.6 MeV/c²
              </p>
              <p className="text-sm">
                Neutrons stabilize the nucleus. Different neutron numbers create isotopes of the
                same element.
              </p>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur border-border mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">The Strong Force</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Quarks are held together by the <strong className="text-foreground">strong nuclear
              force</strong>, one of the four fundamental forces of nature. This force is carried
              by particles called gluons.
            </p>
            <p>
              The strong force is incredibly powerful but has an extremely short range—only about
              the diameter of a proton or neutron (10⁻¹⁵ meters). This is why quarks can never be
              isolated; they're permanently "confined" within nucleons.
            </p>
            <p>
              Interestingly, the strong force becomes <em>stronger</em> as quarks move apart,
              like a rubber band being stretched. This property is called "asymptotic freedom"
              and won the 2004 Nobel Prize in Physics.
            </p>
          </div>
        </Card>

        <InteractiveParticle
          title="Nucleon Interaction Simulation"
          description="See how protons and neutrons behave in the nucleus! The particles represent nucleons held together by the strong force."
          particleCount={15}
          particleColor="hsl(10, 90%, 60%)"
        />

        <Card className="p-8 bg-gradient-to-r from-card/50 to-muted/30 backdrop-blur border-border my-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Building the Nucleus</h2>
          <p className="text-muted-foreground mb-4">
            Protons and neutrons cluster together in the atomic nucleus, held by the residual
            strong force (also called the nuclear force). The balance between:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>The strong force (attractive, holds nucleus together)</li>
            <li>Electromagnetic repulsion (protons repel each other)</li>
          </ul>
          <p className="text-muted-foreground mt-4">
            ...determines nuclear stability. Too many or too few neutrons make the nucleus unstable,
            leading to radioactive decay.
          </p>
        </Card>

        {!showQuiz ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/quantum">
                <ArrowLeft className="w-5 h-5" /> Back: Quantum Particles
              </Link>
            </Button>
            <Button onClick={() => setShowQuiz(true)} size="lg" className="gap-2">
              <BookOpen className="w-5 h-5" />
              Take the Quiz
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/atoms">
                Skip to Next: Atoms <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <Quiz questions={protonsNeutronsQuiz} sectionId="protons-neutrons" />
            <div className="flex justify-between mt-8">
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/quantum">
                  <ArrowLeft className="w-5 h-5" /> Back: Quantum Particles
                </Link>
              </Button>
              <Button asChild size="lg" className="gap-2">
                <Link to="/atoms">
                  Next: Atoms <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </SectionLayout>
  );
};

export default ProtonsNeutrons;
