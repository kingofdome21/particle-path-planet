import { SectionLayout } from "@/components/SectionLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Flame, CloudRain, Wind } from "lucide-react";

const GreenhouseGases = () => {
  const gases = [
    {
      name: "Carbon Dioxide",
      formula: "CO₂",
      atoms: "1 Carbon + 2 Oxygen",
      icon: Flame,
      impact: "Accounts for ~75% of greenhouse gas emissions. Released by burning fossil fuels.",
      lifetime: "Hundreds to thousands of years in atmosphere",
    },
    {
      name: "Methane",
      formula: "CH₄",
      atoms: "1 Carbon + 4 Hydrogen",
      icon: CloudRain,
      impact: "28x more potent than CO₂ over 100 years. From agriculture and natural gas.",
      lifetime: "~12 years in atmosphere",
    },
    {
      name: "Nitrous Oxide",
      formula: "N₂O",
      atoms: "2 Nitrogen + 1 Oxygen",
      icon: Wind,
      impact: "265x more potent than CO₂. From agricultural fertilizers and industry.",
      lifetime: "~114 years in atmosphere",
    },
  ];

  return (
    <SectionLayout>
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            The Greenhouse Effect
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            How specific molecules trap heat and drive climate change
          </p>
        </div>

        <Card className="p-8 bg-gradient-to-br from-greenhouse/20 to-card/50 backdrop-blur border-greenhouse/30 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-foreground text-center">
            How It Works
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              The greenhouse effect is fundamentally about{" "}
              <strong className="text-foreground">molecular vibrations</strong>. When infrared
              radiation (heat) from Earth's surface encounters certain molecules in the atmosphere,
              it makes them vibrate, rotate, and stretch.
            </p>
            <p>
              Not all molecules trap heat equally. The key is{" "}
              <strong className="text-foreground">molecular structure</strong>:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Molecules like N₂ and O₂ (diatomic) are symmetric and don't absorb infrared well
              </li>
              <li>
                Molecules like CO₂, CH₄, and N₂O have asymmetric structures that efficiently
                absorb and re-emit infrared radiation
              </li>
            </ul>
            <p>
              When these molecules absorb infrared radiation, they increase the atmosphere's
              temperature, trapping heat that would otherwise escape to space.
            </p>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {gases.map((gas) => {
            const Icon = gas.icon;
            return (
              <Card
                key={gas.formula}
                className="p-6 bg-card/50 backdrop-blur border-border hover:border-greenhouse/50 transition-all"
              >
                <div className="flex items-center justify-center mb-4">
                  <Icon className="w-12 h-12 text-greenhouse" />
                </div>
                <h3 className="text-2xl font-bold text-center mb-2 text-foreground">
                  {gas.formula}
                </h3>
                <p className="text-center text-sm text-muted-foreground mb-4">{gas.name}</p>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Atoms:</strong> {gas.atoms}
                  </p>
                  <p>
                    <strong className="text-foreground">Impact:</strong> {gas.impact}
                  </p>
                  <p>
                    <strong className="text-foreground">Lifetime:</strong> {gas.lifetime}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur border-border mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            From Particles to Climate Crisis
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Our journey from quantum particles to climate change shows how the smallest building
              blocks of matter create global consequences:
            </p>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                <strong className="text-foreground">Quarks</strong> combine to form protons and
                neutrons
              </li>
              <li>
                <strong className="text-foreground">Nucleons</strong> cluster with electrons to
                create atoms
              </li>
              <li>
                <strong className="text-foreground">Atoms</strong> bond to form molecules like
                CO₂, CH₄, and N₂O
              </li>
              <li>
                <strong className="text-foreground">These molecules</strong>' unique structures
                allow them to trap infrared radiation
              </li>
              <li>
                <strong className="text-foreground">Human activities</strong> release massive
                amounts of these molecules
              </li>
              <li>
                <strong className="text-foreground">The result</strong>: global warming and
                climate change
              </li>
            </ol>
            <p className="mt-6 p-4 bg-muted/30 rounded-lg border border-greenhouse/30">
              <strong className="text-foreground">The bottom line:</strong> Understanding particles
              isn't just abstract physics—it's essential for comprehending and addressing the
              greatest environmental challenge of our time.
            </p>
          </div>
        </Card>

        <div className="flex justify-between">
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/atoms">
              <ArrowLeft className="w-5 h-5" /> Back: Atoms
            </Link>
          </Button>
          <Button asChild size="lg" className="gap-2">
            <Link to="/">Start Over</Link>
          </Button>
        </div>
      </div>
    </SectionLayout>
  );
};

export default GreenhouseGases;
