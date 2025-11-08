import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Minus, Atom } from "lucide-react";
import { toast } from "sonner";

const elements = [
  { name: "Hydrogen", symbol: "H", protons: 1, neutrons: 0 },
  { name: "Helium", symbol: "He", protons: 2, neutrons: 2 },
  { name: "Carbon", symbol: "C", protons: 6, neutrons: 6 },
  { name: "Nitrogen", symbol: "N", protons: 7, neutrons: 7 },
  { name: "Oxygen", symbol: "O", protons: 8, neutrons: 8 },
  { name: "Neon", symbol: "Ne", protons: 10, neutrons: 10 },
];

export const AtomBuilder = () => {
  const [protons, setProtons] = useState(1);
  const [neutrons, setNeutrons] = useState(0);

  const electrons = protons; // Neutral atom
  const massNumber = protons + neutrons;

  const identifyElement = () => {
    const element = elements.find((e) => e.protons === protons);
    return element;
  };

  const element = identifyElement();

  const handleCheck = () => {
    if (element) {
      if (neutrons === element.neutrons) {
        toast.success(`Perfect! You've built ${element.name}!`, {
          description: `${element.symbol} with mass number ${massNumber}`,
        });
      } else {
        toast.info(`This is ${element.name}-${massNumber}`, {
          description: `An isotope of ${element.name} with ${neutrons} neutrons`,
        });
      }
    } else {
      toast.error("Unknown element!", {
        description: "Try using 1-10 protons to build common elements",
      });
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border">
      <h3 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
        <Atom className="w-6 h-6 text-primary" />
        Interactive Atom Builder
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Build your own atom by adding protons and neutrons. Can you identify which element you've created?
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">Protons</label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setProtons(Math.max(1, protons - 1))}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <div className="flex-1 text-center">
              <div className="text-3xl font-bold text-proton">{protons}</div>
              <div className="text-xs text-muted-foreground">Atomic Number</div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setProtons(Math.min(20, protons + 1))}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">Neutrons</label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setNeutrons(Math.max(0, neutrons - 1))}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <div className="flex-1 text-center">
              <div className="text-3xl font-bold text-neutron">{neutrons}</div>
              <div className="text-xs text-muted-foreground">Neutron Count</div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setNeutrons(Math.min(30, neutrons + 1))}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">Electrons</label>
          <div className="flex-1 text-center">
            <div className="text-3xl font-bold text-electron">{electrons}</div>
            <div className="text-xs text-muted-foreground">In neutral atom</div>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Mass Number:</span>
            <span className="ml-2 font-bold text-foreground">{massNumber}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Charge:</span>
            <span className="ml-2 font-bold text-foreground">0 (neutral)</span>
          </div>
        </div>
      </div>

      {element && (
        <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/30 animate-fade-in">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">{element.symbol}</div>
            <div className="text-xl font-semibold text-foreground">{element.name}</div>
            <div className="text-sm text-muted-foreground mt-2">
              {neutrons === element.neutrons
                ? "Standard isotope"
                : `Isotope: ${element.name}-${massNumber}`}
            </div>
          </div>
        </div>
      )}

      <Button onClick={handleCheck} className="w-full gap-2">
        <Atom className="w-4 h-4" />
        Identify Element
      </Button>
    </Card>
  );
};
