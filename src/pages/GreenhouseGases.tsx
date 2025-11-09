import { useState } from "react";
import { SectionLayout } from "@/components/SectionLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GreenhouseGasVisualizer } from "@/components/GreenhouseGasVisualizer";
import { QuizSelector } from "@/components/QuizSelector";
import { CompleteSectionButton } from "@/components/CompleteSectionButton";
import { Link } from "react-router-dom";
import { ArrowLeft, Flame, CloudRain, Wind, BookOpen, Trophy, TrendingUp, Factory, Leaf, AlertTriangle, Globe, Thermometer } from "lucide-react";
import { greenhouseQuizEasy, greenhouseQuizMedium, greenhouseQuizHard } from "@/data/quizData";
import { useProgress } from "@/hooks/useProgress";

const GreenhouseGases = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const { progress, getCompletionPercentage } = useProgress();
  const gases = [
    {
      name: "Carbon Dioxide",
      formula: "CO₂",
      atoms: "1 Carbon + 2 Oxygen",
      icon: Flame,
      impact: "Accounts for ~75% of greenhouse gas emissions. Released by burning fossil fuels.",
      lifetime: "Hundreds to thousands of years in atmosphere",
      concentration: "421 ppm (2023)",
      preindustrial: "280 ppm",
      sources: "Fossil fuel combustion, deforestation, cement production",
    },
    {
      name: "Methane",
      formula: "CH₄",
      atoms: "1 Carbon + 4 Hydrogen",
      icon: CloudRain,
      impact: "28x more potent than CO₂ over 100 years. From agriculture and natural gas.",
      lifetime: "~12 years in atmosphere",
      concentration: "1,923 ppb (2023)",
      preindustrial: "722 ppb",
      sources: "Agriculture (livestock), natural gas leaks, wetlands, landfills",
    },
    {
      name: "Nitrous Oxide",
      formula: "N₂O",
      atoms: "2 Nitrogen + 1 Oxygen",
      icon: Wind,
      impact: "265x more potent than CO₂. From agricultural fertilizers and industry.",
      lifetime: "~114 years in atmosphere",
      concentration: "336 ppb (2023)",
      preindustrial: "270 ppb",
      sources: "Agricultural fertilizers, industrial processes, combustion",
    },
    {
      name: "Water Vapor",
      formula: "H₂O",
      atoms: "2 Hydrogen + 1 Oxygen",
      icon: CloudRain,
      impact: "Most abundant greenhouse gas. Amplifies warming from other gases.",
      lifetime: "~9 days in atmosphere",
      concentration: "Variable (0.4-4%)",
      preindustrial: "Natural cycle",
      sources: "Evaporation from oceans, lakes, rivers; plant transpiration",
    },
  ];

  return (
    <SectionLayout>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Greenhouse Gases & Climate Change
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            How molecular structure determines Earth's temperature and drives our climate crisis
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center mt-6">
            <div className="flex items-center gap-2 bg-destructive/10 px-4 py-2 rounded-lg border border-destructive/30">
              <TrendingUp className="w-5 h-5 text-destructive" />
              <span className="text-sm font-medium">+1.1°C since 1850</span>
            </div>
            <div className="flex items-center gap-2 bg-greenhouse/10 px-4 py-2 rounded-lg border border-greenhouse/30">
              <Globe className="w-5 h-5 text-greenhouse" />
              <span className="text-sm font-medium">421 ppm CO₂ in 2023</span>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg border border-primary/30">
              <Thermometer className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Warmest decade on record</span>
            </div>
          </div>
        </div>

        <Card className="p-8 bg-gradient-to-br from-greenhouse/20 to-card/50 backdrop-blur border-greenhouse/30 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground text-center">
            The Science of Heat Trapping
          </h2>
          <div className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Molecular Vibrations & Infrared Absorption</h3>
              <p className="mb-3">
                The greenhouse effect is fundamentally about{" "}
                <strong className="text-foreground">quantum mechanics at the molecular level</strong>. 
                When infrared radiation from Earth's surface encounters greenhouse gas molecules, 
                it transfers energy that causes specific vibrational and rotational modes in the molecule.
              </p>
              <p className="mb-3">
                Not all molecules trap heat equally. The key is{" "}
                <strong className="text-foreground">molecular structure and dipole moments</strong>:
              </p>
              
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/30 mb-3">
                <h4 className="font-semibold text-foreground mb-2">What is a Dipole Moment?</h4>
                <p className="text-sm mb-2">
                  A <strong className="text-foreground">dipole moment</strong> occurs when a molecule has an uneven distribution of electrical charge. 
                  Think of it as one end of the molecule being slightly positive (δ+) and the other slightly negative (δ-).
                </p>
                <p className="text-sm mb-2">
                  This happens because atoms have different <strong className="text-foreground">electronegativities</strong>—their ability to attract electrons. 
                  For example, in H₂O, oxygen is much more electronegative than hydrogen, pulling electrons toward itself and creating a dipole.
                </p>
                <p className="text-sm">
                  <strong className="text-foreground">Why it matters:</strong> When a molecule with a dipole moment vibrates or rotates, 
                  it can interact with the oscillating electric field of infrared radiation. This allows it to absorb that energy—trapping heat. 
                  Symmetric molecules like N₂ and O₂ have no net dipole moment, so they can't absorb infrared radiation effectively.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-background/50 p-4 rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-red-500">✗</span> Non-Greenhouse Gases
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>N₂ (78% of atmosphere):</strong> Symmetric, no dipole moment</li>
                  <li><strong>O₂ (21% of atmosphere):</strong> Symmetric diatomic molecule</li>
                  <li><strong>Ar (0.9% of atmosphere):</strong> Monatomic, no vibrations</li>
                </ul>
                <p className="mt-3 text-xs">These molecules cannot absorb infrared radiation effectively due to their symmetry.</p>
              </div>

              <div className="bg-background/50 p-4 rounded-lg border border-greenhouse/30">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-green-500">✓</span> Greenhouse Gases
                </h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>CO₂:</strong> Asymmetric stretching, bending modes</li>
                  <li><strong>CH₄:</strong> Multiple asymmetric C-H stretching modes</li>
                  <li><strong>N₂O:</strong> Asymmetric linear molecule</li>
                  <li><strong>H₂O:</strong> Bent structure, strong dipole</li>
                </ul>
                <p className="mt-3 text-xs">These molecules have permanent or induced dipole moments that couple with infrared radiation.</p>
              </div>
            </div>

            <div className="bg-muted/30 p-5 rounded-lg border border-greenhouse/20">
              <h4 className="font-semibold text-foreground mb-3">The Energy Transfer Process</h4>
              <ol className="space-y-2 text-sm list-decimal list-inside">
                <li><strong>Solar radiation</strong> (mostly visible light) passes through the atmosphere and warms Earth's surface</li>
                <li><strong>Earth re-radiates</strong> this energy as infrared radiation (heat)</li>
                <li><strong>Greenhouse gas molecules absorb</strong> specific wavelengths of infrared radiation</li>
                <li><strong>Molecules vibrate and rotate</strong> with increased energy</li>
                <li><strong>Energy is re-emitted</strong> in all directions, including back toward Earth</li>
                <li><strong>Net result:</strong> Heat is trapped in the lower atmosphere, warming the planet</li>
              </ol>
            </div>

            <div className="bg-destructive/10 p-5 rounded-lg border border-destructive/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">The Enhanced Greenhouse Effect</h4>
                  <p className="text-sm">
                    The natural greenhouse effect is essential for life—without it, Earth would be about 33°C colder. 
                    However, human activities have increased atmospheric CO₂ by <strong className="text-foreground">50%</strong> since pre-industrial times, 
                    enhancing the greenhouse effect beyond natural levels and causing rapid global warming.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                    <strong className="text-foreground">Current:</strong> {gas.concentration}
                  </p>
                  <p>
                    <strong className="text-foreground">Pre-1750:</strong> {gas.preindustrial}
                  </p>
                  <p>
                    <strong className="text-foreground">Impact:</strong> {gas.impact}
                  </p>
                  <p>
                    <strong className="text-foreground">Lifetime:</strong> {gas.lifetime}
                  </p>
                  <p className="text-xs pt-2 border-t border-border">
                    <strong className="text-foreground">Sources:</strong> {gas.sources}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <GreenhouseGasVisualizer />

        <div className="grid md:grid-cols-2 gap-6 my-12">
          <Card className="p-6 bg-gradient-to-br from-destructive/10 to-card/50 backdrop-blur border-destructive/30">
            <div className="flex items-center gap-3 mb-4">
              <Factory className="w-8 h-8 text-destructive" />
              <h2 className="text-xl font-bold text-foreground">Human Impact</h2>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="bg-background/50 p-3 rounded">
                <p className="font-semibold text-foreground mb-1">CO₂ Emissions</p>
                <p>37 billion tons annually from fossil fuels (2022)</p>
              </div>
              <div className="bg-background/50 p-3 rounded">
                <p className="font-semibold text-foreground mb-1">Deforestation</p>
                <p>10 million hectares of forest lost per year</p>
              </div>
              <div className="bg-background/50 p-3 rounded">
                <p className="font-semibold text-foreground mb-1">Methane Leaks</p>
                <p>Agriculture and fossil fuel extraction release 570 Mt/year</p>
              </div>
              <div className="bg-background/50 p-3 rounded">
                <p className="font-semibold text-foreground mb-1">Industrial Processes</p>
                <p>Cement, steel, and chemical production add billions of tons</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-card/50 backdrop-blur border-primary/30">
            <div className="flex items-center gap-3 mb-4">
              <Thermometer className="w-8 h-8 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Climate Consequences</h2>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="bg-background/50 p-3 rounded">
                <p className="font-semibold text-foreground mb-1">Temperature Rise</p>
                <p>+1.1°C since 1850; projected +1.5°C by 2030s</p>
              </div>
              <div className="bg-background/50 p-3 rounded">
                <p className="font-semibold text-foreground mb-1">Sea Level Rise</p>
                <p>20cm since 1900; accelerating at 3.7mm/year</p>
              </div>
              <div className="bg-background/50 p-3 rounded">
                <p className="font-semibold text-foreground mb-1">Extreme Weather</p>
                <p>Increased frequency and intensity of heatwaves, droughts, floods</p>
              </div>
              <div className="bg-background/50 p-3 rounded">
                <p className="font-semibold text-foreground mb-1">Ocean Acidification</p>
                <p>30% increase in acidity; threatening marine ecosystems</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-gradient-to-br from-greenhouse/10 to-card/50 backdrop-blur border-greenhouse/30 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Leaf className="w-8 h-8 text-greenhouse" />
            <h2 className="text-2xl font-bold text-foreground">Solutions & Mitigation</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Energy Transition</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Renewable energy (solar, wind, hydro)</li>
                <li>Nuclear power expansion</li>
                <li>Energy efficiency improvements</li>
                <li>Electrification of transport</li>
                <li>Green hydrogen development</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Carbon Capture</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Direct air capture technology</li>
                <li>Carbon capture at source</li>
                <li>Enhanced weathering</li>
                <li>Ocean alkalinity enhancement</li>
                <li>Biochar and soil carbon</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Natural Solutions</h3>
              <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                <li>Reforestation and afforestation</li>
                <li>Wetland restoration</li>
                <li>Sustainable agriculture</li>
                <li>Peatland protection</li>
                <li>Blue carbon (coastal ecosystems)</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-5 bg-background/50 rounded-lg border border-greenhouse/30">
            <h3 className="font-semibold text-foreground mb-3">The Path Forward</h3>
            <p className="text-muted-foreground mb-3">
              Limiting global warming to 1.5°C requires cutting greenhouse gas emissions by <strong className="text-foreground">45% by 2030</strong> and 
              reaching <strong className="text-foreground">net-zero by 2050</strong>. This demands unprecedented global cooperation and rapid deployment of clean technologies.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-muted/30 p-3 rounded">
                <p className="font-semibold text-foreground text-xs mb-1">Individual Actions</p>
                <p className="text-xs text-muted-foreground">Reduce energy use, sustainable transport, plant-based diet, support climate policies</p>
              </div>
              <div className="bg-muted/30 p-3 rounded">
                <p className="font-semibold text-foreground text-xs mb-1">Systemic Change</p>
                <p className="text-xs text-muted-foreground">Policy reform, green investment, technology R&D, international cooperation</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-card/50 backdrop-blur border-border mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            From Quantum Particles to Global Climate
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Our journey through particle physics reveals how the fundamental structure of matter determines Earth's climate:
            </p>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                <strong className="text-foreground">Quarks</strong> combine via the strong force to form protons and neutrons
              </li>
              <li>
                <strong className="text-foreground">Nucleons</strong> cluster in nuclei, with electrons forming atoms via electromagnetic force
              </li>
              <li>
                <strong className="text-foreground">Atoms</strong> bond through electron sharing/transfer to create molecules
              </li>
              <li>
                <strong className="text-foreground">Molecular geometry</strong> determines which wavelengths of infrared radiation can be absorbed
              </li>
              <li>
                <strong className="text-foreground">Asymmetric molecules</strong> (CO₂, CH₄, N₂O) trap heat through quantum mechanical vibrational modes
              </li>
              <li>
                <strong className="text-foreground">Increased concentrations</strong> from human activity enhance heat trapping
              </li>
              <li>
                <strong className="text-foreground">The result</strong>: rapid global warming, climate disruption, and ecological crisis
              </li>
            </ol>
            <div className="mt-6 p-5 bg-gradient-to-br from-greenhouse/20 to-primary/10 rounded-lg border border-greenhouse/30">
              <div className="flex items-start gap-3">
                <Globe className="w-6 h-6 text-greenhouse flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-foreground mb-2">The Fundamental Connection</p>
                  <p className="text-sm">
                    Understanding particles isn't just abstract physics—it reveals the precise mechanisms driving climate change. 
                    The quantum mechanical properties of greenhouse gas molecules, determined by the arrangement of quarks in their atomic nuclei, 
                    dictate how Earth's energy balance is disrupted. This knowledge is essential for developing effective mitigation strategies and 
                    understanding our planet's future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-center mb-8">
          <CompleteSectionButton sectionId="greenhouse" sectionName="Greenhouse Gases" />
        </div>

        {!showQuiz ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/atoms">
                <ArrowLeft className="w-5 h-5" /> Back: Atoms
              </Link>
            </Button>
            <Button onClick={() => setShowQuiz(true)} size="lg" className="gap-2">
              <BookOpen className="w-5 h-5" />
              Complete Final Quiz
            </Button>
          </div>
        ) : (
          <>
        <QuizSelector
          easyQuiz={greenhouseQuizEasy}
          mediumQuiz={greenhouseQuizMedium}
          hardQuiz={greenhouseQuizHard}
          sectionId="greenhouse"
          title="Test Your Knowledge"
          description="Choose your difficulty level and master climate science!"
        />
            
            {progress.sectionsCompleted.length === 4 && (
              <Card className="p-8 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur border-primary/30 mt-8 text-center">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse-slow" />
                <h3 className="text-3xl font-bold mb-2 text-foreground">
                  Congratulations! 🎉
                </h3>
                <p className="text-xl text-muted-foreground mb-4">
                  You've completed the entire Particle Explorer journey!
                </p>
                <div className="flex flex-col items-center gap-2 mb-6">
                  <div className="text-4xl font-bold text-primary">
                    {getCompletionPercentage()}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Score: {progress.totalScore} points
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  You now understand the journey from quantum particles to climate science.
                  This knowledge empowers you to make informed decisions about our planet's future!
                </p>
                <Button asChild size="lg">
                  <Link to="/">Return to Home</Link>
                </Button>
              </Card>
            )}

            <div className="flex justify-between mt-8">
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/atoms">
                  <ArrowLeft className="w-5 h-5" /> Back: Atoms
                </Link>
              </Button>
              <Button asChild size="lg" className="gap-2">
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          </>
        )}
          </div>

          {/* Sidebar - Sources & References */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <Card className="p-6 bg-card/50 backdrop-blur border-border">
                <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Sources
                </h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="bg-background/50 p-4 rounded-lg border border-border">
                    <p className="font-semibold text-foreground mb-2">MIT Climate Portal</p>
                    <p className="mb-2 text-xs">
                      Comprehensive explanations of the molecular mechanisms behind the greenhouse effect.
                    </p>
                    <a 
                      href="https://climate.mit.edu/ask-mit/how-do-greenhouse-gases-trap-heat-atmosphere" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-xs break-words"
                    >
                      climate.mit.edu →
                    </a>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg border border-border">
                    <p className="font-semibold text-foreground mb-3">Additional Sources</p>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>IPCC Sixth Assessment Report</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>NOAA Global Monitoring Lab</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>NASA Earth Observatory</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </SectionLayout>
  );
};

export default GreenhouseGases;
