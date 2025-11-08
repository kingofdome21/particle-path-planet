import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Zap, Thermometer } from "lucide-react";

interface Atom {
  x: number;
  y: number;
  element: "C" | "O" | "H" | "N";
  radius: number;
  color: string;
}

interface Molecule {
  id: string;
  type: "CO2" | "CH4" | "N2O" | "H2O";
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  vibrationPhase: number;
  atoms: Atom[];
  bonds: [number, number][];
  absorbed: boolean;
  absorptionTime: number;
}

const atomConfig = {
  C: { radius: 12, color: "hsl(0, 0%, 30%)" },
  O: { radius: 10, color: "hsl(0, 85%, 55%)" },
  H: { radius: 6, color: "hsl(0, 0%, 95%)" },
  N: { radius: 11, color: "hsl(220, 85%, 60%)" },
};

const createMolecule = (type: "CO2" | "CH4" | "N2O" | "H2O", x: number, y: number): Molecule => {
  let atoms: Atom[] = [];
  let bonds: [number, number][] = [];

  switch (type) {
    case "CO2": // O=C=O (linear)
      atoms = [
        { x: -20, y: 0, element: "O", ...atomConfig.O },
        { x: 0, y: 0, element: "C", ...atomConfig.C },
        { x: 20, y: 0, element: "O", ...atomConfig.O },
      ];
      bonds = [[0, 1], [1, 2]];
      break;
    case "CH4": // Tetrahedral
      atoms = [
        { x: 0, y: 0, element: "C", ...atomConfig.C },
        { x: 0, y: -18, element: "H", ...atomConfig.H },
        { x: 18, y: 8, element: "H", ...atomConfig.H },
        { x: -18, y: 8, element: "H", ...atomConfig.H },
        { x: 0, y: 12, element: "H", ...atomConfig.H },
      ];
      bonds = [[0, 1], [0, 2], [0, 3], [0, 4]];
      break;
    case "N2O": // N=N=O (linear)
      atoms = [
        { x: -20, y: 0, element: "N", ...atomConfig.N },
        { x: 0, y: 0, element: "N", ...atomConfig.N },
        { x: 20, y: 0, element: "O", ...atomConfig.O },
      ];
      bonds = [[0, 1], [1, 2]];
      break;
    case "H2O": // Bent
      atoms = [
        { x: 0, y: 0, element: "O", ...atomConfig.O },
        { x: -15, y: -12, element: "H", ...atomConfig.H },
        { x: 15, y: -12, element: "H", ...atomConfig.H },
      ];
      bonds = [[0, 1], [0, 2]];
      break;
  }

  return {
    id: Math.random().toString(36),
    type,
    x,
    y,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.02,
    vibrationPhase: Math.random() * Math.PI * 2,
    atoms,
    bonds,
    absorbed: false,
    absorptionTime: 0,
  };
};

export const GreenhouseGasVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const moleculesRef = useRef<Molecule[]>([]);
  const animationRef = useRef<number>();
  const infraredRaysRef = useRef<{ x: number; y: number; active: boolean }[]>([]);
  const [temperature, setTemperature] = useState(15);
  const [showInfrared, setShowInfrared] = useState(false);
  const [moleculeCounts, setMoleculeCounts] = useState({
    CO2: 3,
    CH4: 2,
    N2O: 2,
    H2O: 3,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Initialize molecules
    moleculesRef.current = [];
    Object.entries(moleculeCounts).forEach(([type, count]) => {
      for (let i = 0; i < count; i++) {
        moleculesRef.current.push(
          createMolecule(
            type as "CO2" | "CH4" | "N2O" | "H2O",
            Math.random() * (canvas.width - 100) + 50,
            Math.random() * (canvas.height - 100) + 50
          )
        );
      }
    });

    // Initialize infrared rays
    infraredRaysRef.current = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height,
      active: false,
    }));

    let frameCount = 0;
    let absorbedCount = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      // Draw infrared rays
      if (showInfrared && frameCount % 60 === 0) {
        const ray = infraredRaysRef.current.find(r => !r.active);
        if (ray) {
          ray.x = Math.random() * canvas.width;
          ray.y = canvas.height;
          ray.active = true;
        }
      }

      infraredRaysRef.current.forEach(ray => {
        if (!ray.active) return;
        
        ray.y -= 3;

        // Check collision with molecules
        moleculesRef.current.forEach(molecule => {
          const dx = molecule.x - ray.x;
          const dy = molecule.y - ray.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 30 && !molecule.absorbed && ray.active) {
            molecule.absorbed = true;
            molecule.absorptionTime = frameCount;
            ray.active = false;
            absorbedCount++;
            setTemperature(prev => Math.min(35, prev + 0.5));
          }
        });

        if (ray.y < 0) ray.active = false;

        // Draw ray
        if (ray.active) {
          ctx.save();
          ctx.globalAlpha = 0.6;
          ctx.strokeStyle = "hsl(25, 100%, 50%)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(ray.x, ray.y);
          ctx.lineTo(ray.x, ray.y + 40);
          ctx.stroke();
          
          // Ray glow
          ctx.shadowBlur = 15;
          ctx.shadowColor = "hsl(25, 100%, 50%)";
          ctx.strokeStyle = "hsl(25, 100%, 60%)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }
      });

      // Update and draw molecules
      moleculesRef.current.forEach(molecule => {
        // Update position
        molecule.x += molecule.vx;
        molecule.y += molecule.vy;

        // Bounce off walls
        if (molecule.x < 50 || molecule.x > canvas.width - 50) {
          molecule.vx *= -1;
          molecule.x = Math.max(50, Math.min(canvas.width - 50, molecule.x));
        }
        if (molecule.y < 50 || molecule.y > canvas.height - 50) {
          molecule.vy *= -1;
          molecule.y = Math.max(50, Math.min(canvas.height - 50, molecule.y));
        }

        // Update rotation and vibration
        molecule.rotation += molecule.rotationSpeed;
        molecule.vibrationPhase += 0.1;

        // Absorption effect
        if (molecule.absorbed && frameCount - molecule.absorptionTime < 120) {
          const age = frameCount - molecule.absorptionTime;
          const vibrationIntensity = Math.sin(age * 0.3) * (1 - age / 120) * 3;
          molecule.rotationSpeed += vibrationIntensity * 0.01;
        } else if (molecule.absorbed) {
          molecule.absorbed = false;
        }

        ctx.save();
        ctx.translate(molecule.x, molecule.y);
        ctx.rotate(molecule.rotation);

        // Draw bonds
        molecule.bonds.forEach(([i, j]) => {
          const atom1 = molecule.atoms[i];
          const atom2 = molecule.atoms[j];
          
          ctx.beginPath();
          ctx.moveTo(atom1.x, atom1.y);
          ctx.lineTo(atom2.x, atom2.y);
          ctx.strokeStyle = molecule.absorbed ? "hsl(25, 100%, 60%)" : "hsl(var(--muted-foreground))";
          ctx.lineWidth = molecule.absorbed ? 3 : 2;
          ctx.stroke();
        });

        // Draw atoms with vibration
        molecule.atoms.forEach((atom, i) => {
          const vibration = i > 0 ? Math.sin(molecule.vibrationPhase + i) * 2 : 0;
          
          ctx.beginPath();
          ctx.arc(atom.x, atom.y + vibration, atom.radius, 0, Math.PI * 2);
          
          if (molecule.absorbed) {
            ctx.fillStyle = atom.color;
            ctx.shadowBlur = 20;
            ctx.shadowColor = "hsl(25, 100%, 50%)";
          } else {
            ctx.fillStyle = atom.color;
            ctx.shadowBlur = 5;
            ctx.shadowColor = atom.color;
          }
          
          ctx.fill();
          
          // Atom label
          ctx.shadowBlur = 0;
          ctx.fillStyle = atom.element === "H" || atom.element === "N" ? "hsl(var(--foreground))" : "hsl(var(--background))";
          ctx.font = "bold 10px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(atom.element, atom.x, atom.y + vibration);
        });

        // Draw molecule label
        ctx.restore();
        ctx.fillStyle = "hsl(var(--foreground))";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(molecule.type, molecule.x, molecule.y - 40);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showInfrared, moleculeCounts]);

  const addMolecule = (type: "CO2" | "CH4" | "N2O" | "H2O") => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    moleculesRef.current.push(
      createMolecule(
        type,
        Math.random() * (canvas.width - 100) + 50,
        Math.random() * (canvas.height - 100) + 50
      )
    );
    setMoleculeCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const clearAllMolecules = () => {
    moleculesRef.current = [];
    setMoleculeCounts({ CO2: 0, CH4: 0, N2O: 0, H2O: 0 });
    setTemperature(15);
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border overflow-hidden">
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2 text-foreground">Greenhouse Gas Molecular Simulator</h3>
        <p className="text-sm text-muted-foreground">
          Watch how greenhouse gas molecules absorb infrared radiation and trap heat. Each molecule has a unique structure that determines how it interacts with infrared light.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button onClick={() => addMolecule("CO2")} size="sm" variant="outline" className="gap-2">
          Add CO₂ <Badge variant="secondary">{moleculeCounts.CO2}</Badge>
        </Button>
        <Button onClick={() => addMolecule("CH4")} size="sm" variant="outline" className="gap-2">
          Add CH₄ <Badge variant="secondary">{moleculeCounts.CH4}</Badge>
        </Button>
        <Button onClick={() => addMolecule("N2O")} size="sm" variant="outline" className="gap-2">
          Add N₂O <Badge variant="secondary">{moleculeCounts.N2O}</Badge>
        </Button>
        <Button onClick={() => addMolecule("H2O")} size="sm" variant="outline" className="gap-2">
          Add H₂O <Badge variant="secondary">{moleculeCounts.H2O}</Badge>
        </Button>
        <div className="flex-grow" />
        <Button
          onClick={clearAllMolecules}
          size="sm"
          variant="destructive"
          disabled={moleculesRef.current.length === 0}
        >
          Clear All
        </Button>
        <Button
          onClick={() => setShowInfrared(!showInfrared)}
          size="sm"
          variant={showInfrared ? "default" : "outline"}
          className="gap-2"
        >
          <Zap className="w-4 h-4" />
          {showInfrared ? "Stop" : "Start"} Infrared
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-greenhouse" />
          <span className="text-sm font-medium">Temperature:</span>
          <span className="text-lg font-bold text-greenhouse">{temperature.toFixed(1)}°C</span>
        </div>
        <Badge variant={temperature > 25 ? "destructive" : temperature > 20 ? "default" : "secondary"}>
          {temperature > 25 ? "Warming!" : temperature > 20 ? "Increased" : "Normal"}
        </Badge>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-96 rounded-lg bg-gradient-to-b from-background/80 to-background/50 border border-border"
        />
        <div className="absolute bottom-2 left-2 text-xs text-muted-foreground bg-background/80 backdrop-blur px-2 py-1 rounded">
          <span className="text-greenhouse">●</span> Infrared radiation from Earth's surface
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Orange rays represent infrared radiation. Watch molecules vibrate and rotate when they absorb energy! 
        <span className="text-foreground font-medium">Try clearing all molecules and adding only one type to observe its specific behavior.</span>
      </p>
    </Card>
  );
};