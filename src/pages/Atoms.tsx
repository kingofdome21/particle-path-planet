import { useState } from "react";
import { SectionLayout } from "@/components/SectionLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AtomBuilder } from "@/components/AtomBuilder";
import { QuizSelector } from "@/components/QuizSelector";
import { CompleteSectionButton } from "@/components/CompleteSectionButton";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import { atomsQuizEasy, atomsQuizMedium, atomsQuizHard } from "@/data/quizData";

const Atoms = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const elements = [
    {
      name: "Hydrogen",
      symbol: "H",
      protons: 1,
      neutrons: 0,
      electrons: 1,
      description: "The simplest and most abundant element in the universe",
    },
    {
      name: "Carbon",
      symbol: "C",
      protons: 6,
      neutrons: 6,
      electrons: 6,
      description: "The foundation of organic chemistry and all life on Earth",
    },
    {
      name: "Oxygen",
      symbol: "O",
      protons: 8,
      neutrons: 8,
      electrons: 8,
      description: "Essential for respiration and most combustion reactions",
    },
  ];

  return (
    <SectionLayout>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Atoms</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Combining protons, neutrons, and electrons to create the elements
          </p>
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur border-border mb-12">
          <h2 className="text-2xl font-bold mb-4 text-foreground text-center">
            Atomic Structure
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 text-muted-foreground">
              <p>
                An atom consists of a dense <strong className="text-foreground">nucleus</strong>{" "}
                containing protons and neutrons, surrounded by a cloud of{" "}
                <strong className="text-foreground">electrons</strong>.
              </p>
              <p>
                The number of protons determines the element's identity. Add or remove a proton,
                and you have a completely different element!
              </p>
              <p>
                Electrons orbit the nucleus in shells or energy levels. The arrangement of
                electrons determines how atoms bond and interact chemically.
              </p>
            </div>
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-proton particle-glow animate-pulse-slow" />
              </div>
              <div className="absolute inset-0 border-2 border-electron rounded-full opacity-30 animate-spin" style={{ animationDuration: "3s" }} />
              <div className="absolute inset-8 border-2 border-electron rounded-full opacity-30 animate-spin" style={{ animationDuration: "5s", animationDirection: "reverse" }} />
              <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-electron particle-glow animate-float" />
              <div className="absolute bottom-8 right-8 w-3 h-3 rounded-full bg-electron particle-glow animate-float" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {elements.map((element) => (
            <Card
              key={element.symbol}
              className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all"
            >
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-primary mb-2">{element.symbol}</div>
                <div className="text-xl font-semibold text-foreground">{element.name}</div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Protons:</span>
                  <span className="font-mono text-proton">{element.protons}</span>
                </div>
                <div className="flex justify-between">
                  <span>Neutrons:</span>
                  <span className="font-mono text-neutron">{element.neutrons}</span>
                </div>
                <div className="flex justify-between">
                  <span>Electrons:</span>
                  <span className="font-mono text-electron">{element.electrons}</span>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{element.description}</p>
            </Card>
          ))}
        </div>

        <div className="mb-8">
          <AtomBuilder />
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur border-border mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">The Periodic Table</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The periodic table organizes all known elements by their atomic number (number of
              protons). As of now, we've discovered or created 118 elements!
            </p>
            <p>
              Elements in the same column share similar chemical properties because they have the
              same number of electrons in their outermost shell. This pattern led Dmitri Mendeleev
              to create the periodic table in 1869.
            </p>
            <p>
              Everything you see around you—water, air, rocks, plants, your own body—is made up of
              combinations of these elements. Chemistry is the study of how atoms interact and bond
              to form molecules and compounds.
            </p>
            <p>
              <strong className="text-foreground">Chemical Bonds:</strong> Atoms form bonds by
              sharing or transferring electrons. Covalent bonds involve sharing electrons (like in
              H₂O), while ionic bonds involve transferring electrons (like in NaCl, table salt).
            </p>
          </div>
        </Card>

        <div className="flex justify-center mb-8">
          <CompleteSectionButton sectionId="atoms" sectionName="Atoms" />
        </div>

        {!showQuiz ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/protons-neutrons">
                <ArrowLeft className="w-5 h-5" /> Back: Protons & Neutrons
              </Link>
            </Button>
            <Button onClick={() => setShowQuiz(true)} size="lg" className="gap-2">
              <BookOpen className="w-5 h-5" />
              Take the Quiz
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link to="/greenhouse">
                Skip to Next: Greenhouse Effect <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
        <QuizSelector
          easyQuiz={atomsQuizEasy}
          mediumQuiz={atomsQuizMedium}
          hardQuiz={atomsQuizHard}
          sectionId="atoms"
          title="Test Your Knowledge"
          description="Choose your difficulty level and master atomic structure!"
        />
            <div className="flex justify-between mt-8">
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/protons-neutrons">
                  <ArrowLeft className="w-5 h-5" /> Back: Protons & Neutrons
                </Link>
              </Button>
              <Button asChild size="lg" className="gap-2">
                <Link to="/greenhouse">
                  Next: Greenhouse Effect <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </SectionLayout>
  );
};

export default Atoms;
