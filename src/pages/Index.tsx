import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionLayout } from "@/components/SectionLayout";
import { ProgressBar } from "@/components/ProgressBar";
import { ArrowRight, Atom, FlaskConical, Globe, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-particles.jpg";

const Index = () => {
  const sections = [
    {
      title: "Quantum Particles",
      description: "Discover the fundamental building blocks of matter: quarks, electrons, and gluons.",
      icon: Sparkles,
      color: "text-quantum",
      path: "/quantum",
    },
    {
      title: "Protons & Neutrons",
      description: "Learn how quarks combine to form protons and neutrons through the strong force.",
      icon: FlaskConical,
      color: "text-proton",
      path: "/protons-neutrons",
    },
    {
      title: "Atoms",
      description: "Explore how protons, neutrons, and electrons create the elements of nature.",
      icon: Atom,
      color: "text-electron",
      path: "/atoms",
    },
    {
      title: "Greenhouse Effect",
      description: "Understand the particles that cause climate change and the greenhouse effect.",
      icon: Globe,
      color: "text-greenhouse",
      path: "/greenhouse",
    },
  ];

  return (
    <SectionLayout>
      <div className="container mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar />
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl mb-12">
          <img
            src={heroImage}
            alt="Quantum particles in space"
            className="w-full h-[400px] object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center p-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
                EcoPhysics
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                From quantum mechanics to climate science—explore the particles that shape our universe
              </p>
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.path}
                className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <Icon className={`w-6 h-6 ${section.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-mono text-muted-foreground">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {section.description}
                    </p>
                    <Button asChild className="gap-2">
                      <Link to={section.path}>
                        Explore <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </SectionLayout>
  );
};

export default Index;
